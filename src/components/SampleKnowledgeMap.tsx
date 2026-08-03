import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph3D, { type ForceGraphMethods } from "react-force-graph-3d";
import { Object3D } from "three";
import SpriteText from "three-spritetext";
import { Eye, EyeOff, RotateCcw } from "lucide-react";

type Kind = "project" | "decision" | "document" | "specialist" | "report";
type Relation = "contains" | "cites" | "evaluates" | "derives" | "related";

type GraphNode = {
  id: string;
  label: string;
  kind: Kind;
  detail: string;
  weight: number;
  x?: number;
  y?: number;
  z?: number;
};

type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
  relation: Relation;
};

const KIND_META: Record<Kind, { label: string; color: string }> = {
  project: { label: "Projects", color: "#34d399" },
  decision: { label: "Decisions", color: "#38bdf8" },
  document: { label: "Documents", color: "#fbbf24" },
  specialist: { label: "Specialists", color: "#d8b4fe" },
  report: { label: "Reports", color: "#fb7185" },
};

const KIND_ORDER: Kind[] = ["project", "decision", "document", "specialist", "report"];

const RELATION_LABELS: Record<Relation, string> = {
  contains: "contains",
  evaluates: "evaluated by",
  cites: "cites",
  derives: "derived into",
  related: "related",
};

const DOUBLE_CLICK_MS = 400;
const CANVAS_BG = "#f1efe9";
const MUTED = "rgba(90,98,120,0.18)";
const LABEL_COLOR = "rgba(24,24,27,0.86)";
const LINK_DEFAULT = "rgba(40,52,90,0.22)";
const LINK_DIMMED = "rgba(80,88,110,0.06)";
const ASK_DELAY_MS = 720;

type SampleDocHit = { id: string; label: string };

type SampleAskResult = {
  answer: string;
  bullets: string[];
  focus_ids: string[];
  documents: SampleDocHit[];
  confidence?: string;
};

type SampleAskPrompt = {
  text: string;
  result: SampleAskResult;
};

type StoredAnswer = SampleAskResult & { id: string; query: string };

/** Hardcoded Ask demos — focus subsets of the hub-and-spoke sample map. */
const SAMPLE_ASKS: Record<string, SampleAskPrompt[]> = {
  "01": [
    {
      text: "What constrains grid connection timing?",
      result: {
        confidence: "high",
        bullets: [
          "DNO offer is contingent into Q3 2027, with reinforcement still open.",
          "Grid impact study flags constraint hours that affect capture price.",
          "Both proceed runs cite the same grid evidence chain.",
        ],
        answer:
          "Grid timing is the binding near-term constraint. The DNO letter and grid impact study are cited heavily from the proceed decisions; until reinforcement clarity improves, capital commitment stays contingent.",
        focus_ids: [
          "dec-proceed-a",
          "dec-proceed-b",
          "doc-dno",
          "doc-grid-study",
          "sp-tech",
          "rep-ppe-2",
          "doc-market",
        ],
        documents: [
          { id: "doc-dno", label: "DNO_Connection_Letter.pdf" },
          { id: "doc-grid-study", label: "Grid_Impact_Study.pdf" },
        ],
      },
    },
    {
      text: "Where does hydrology support the financial model?",
      result: {
        confidence: "medium",
        bullets: [
          "Hydrology v3 is cited into the base financial workbook.",
          "Water rights opinion still needs aligning with generation assumptions.",
          "Finance and technical both weigh hydrology on the proceed call.",
        ],
        answer:
          "Hydrology_Report_v3 bridges into Financial_Model_Base. Sensitivities and the latest PPE still depend on that chain; water rights should close before treating returns as decision-ready.",
        focus_ids: [
          "doc-hydro",
          "doc-fit",
          "doc-water",
          "doc-sens",
          "dec-proceed-a",
          "sp-fin",
          "sp-tech",
          "rep-ppe-1",
        ],
        documents: [
          { id: "doc-hydro", label: "Hydrology_Report_v3.pdf" },
          { id: "doc-fit", label: "Financial_Model_Base.xlsx" },
          { id: "doc-water", label: "Water_Rights_Opinion.pdf" },
        ],
      },
    },
    {
      text: "What land and consent risks remain open?",
      result: {
        confidence: "medium",
        bullets: [
          "Land option and title pack still show completeness gaps.",
          "EIA scoping, ecology and noise sit in the flat evidence cloud.",
          "Legal evaluation ties those cites into both proceed runs.",
        ],
        answer:
          "Land rights and environmental consent remain linked open items cited from the proceed decisions. The option/title chain and EIA package should be read together before locking a recommendation.",
        focus_ids: [
          "dec-proceed-a",
          "dec-proceed-b",
          "doc-lease",
          "doc-title",
          "doc-eia",
          "doc-bird",
          "doc-noise",
          "sp-leg",
          "rep-sda-1",
        ],
        documents: [
          { id: "doc-lease", label: "Land_Option_Agreement.pdf" },
          { id: "doc-eia", label: "EIA_Scoping_Note.pdf" },
          { id: "doc-title", label: "Title_Pack_Index.pdf" },
        ],
      },
    },
  ],
  "02": [
    {
      text: "Is engineering confidence enough to proceed?",
      result: {
        confidence: "medium",
        bullets: [
          "Technical scores viability in the mid-70s on the sample panel.",
          "EPC, geotech and survey packs are dense cite targets.",
          "Site risk reports hang off the proceed decisions via derives.",
        ],
        answer:
          "Technical confidence is not a hard no, but not yet enough to treat proceed as settled. Capex and site evidence still need tighter closure before the single-scheme case is investment-ready.",
        focus_ids: [
          "sp-tech",
          "dec-proceed-a",
          "dec-proceed-b",
          "doc-epc",
          "doc-geo",
          "doc-topo",
          "rep-site-1",
        ],
        documents: [
          { id: "doc-epc", label: "EPC_Indicative_Quote.pdf" },
          { id: "doc-geo", label: "Geotech_Factual.pdf" },
        ],
      },
    },
    {
      text: "Which documents drive the returns case?",
      result: {
        confidence: "high",
        bullets: [
          "EPC quote and O&M assumptions bound the cost envelope.",
          "Base model and sensitivity pack translate capex into returns.",
          "Both proceed runs cite that financial chain heavily.",
        ],
        answer:
          "Returns sit on the EPC quote, O&M build and financial model chain. Warranty coverage is secondary but material if equipment risk shifts contingency needs.",
        focus_ids: [
          "dec-proceed-a",
          "doc-epc",
          "doc-om",
          "doc-fit",
          "doc-sens",
          "doc-warranty",
          "sp-fin",
          "sp-tech",
          "rep-ppe-2",
        ],
        documents: [
          { id: "doc-epc", label: "EPC_Indicative_Quote.pdf" },
          { id: "doc-fit", label: "Financial_Model_Base.xlsx" },
          { id: "doc-om", label: "O&M_Assumptions.xlsx" },
        ],
      },
    },
    {
      text: "Summarise commercial offtake exposure",
      result: {
        confidence: "medium",
        bullets: [
          "Draft PPA and market curve set the pricing frame.",
          "Commercial panel flags offtake as a soft spot.",
          "Cite links pull those files into both proceed decisions.",
        ],
        answer:
          "Offtake exposure concentrates on PPA structure versus merchant capture. Until the term sheet and price curve are reconciled, commercial risk should stay explicit in the proceed recommendation.",
        focus_ids: [
          "doc-ppa",
          "doc-market",
          "sp-com",
          "dec-proceed-a",
          "dec-proceed-b",
          "rep-sda-2",
        ],
        documents: [
          { id: "doc-ppa", label: "Draft_PPA_TermSheet.docx" },
          { id: "doc-market", label: "Market_Price_Curve.xlsx" },
        ],
      },
    },
  ],
  "03": [
    {
      text: "Are IRR and NPV decision-ready from the workbook?",
      result: {
        confidence: "low",
        bullets: [
          "Authoritative workbook is mapped, but validation is still in progress.",
          "Sensitivity pack shows downside cases that move returns materially.",
          "Finance treats the proceed call as still open across both runs.",
        ],
        answer:
          "IRR and NPV should not be treated as decision-ready yet. The financial workbook is the right source of truth, but sensitivities, lender terms and the IC memo still need to converge.",
        focus_ids: [
          "doc-fit",
          "doc-sens",
          "doc-board",
          "dec-proceed-a",
          "dec-proceed-b",
          "sp-fin",
          "rep-ppe-3",
          "doc-lender",
        ],
        documents: [
          { id: "doc-fit", label: "Financial_Model_Base.xlsx" },
          { id: "doc-sens", label: "Sensitivity_Pack.xlsx" },
          { id: "doc-board", label: "IC_Memo_Draft.docx" },
        ],
      },
    },
    {
      text: "What financing and tax structure is in play?",
      result: {
        confidence: "medium",
        bullets: [
          "Lender term sheet sets indicative gearing and covenants.",
          "Tax structure memo outlines SPV and relief pathway.",
          "Finance and tax both evaluate the two proceed runs.",
        ],
        answer:
          "Financing and tax are being read as one structure: indicative lender terms, SPV relief pathway, and debt sizing. Returns validation should keep that package together.",
        focus_ids: [
          "doc-lender",
          "doc-tax",
          "doc-fit",
          "sp-fin",
          "sp-tax",
          "dec-proceed-a",
          "rep-sda-1",
        ],
        documents: [
          { id: "doc-lender", label: "Lender_Term_Sheet.pdf" },
          { id: "doc-tax", label: "Tax_Structure_Memo.pdf" },
        ],
      },
    },
    {
      text: "Where do market prices meet PPA risk?",
      result: {
        confidence: "medium",
        bullets: [
          "Market curve and draft PPA define the merchant vs contracted split.",
          "Commercial evaluation flags offtake structure as a key lever.",
          "Capture-price assumptions feed the returns bridge cited on proceed.",
        ],
        answer:
          "PPA risk and market price assumptions meet in the offtake evidence cited from the proceed decisions. Contracted floor versus merchant upside should be explicit before IRR/NPV are treated as stable.",
        focus_ids: [
          "doc-ppa",
          "doc-market",
          "sp-com",
          "sp-fin",
          "doc-fit",
          "dec-proceed-b",
          "rep-ppe-2",
        ],
        documents: [
          { id: "doc-ppa", label: "Draft_PPA_TermSheet.docx" },
          { id: "doc-market", label: "Market_Price_Curve.xlsx" },
        ],
      },
    },
  ],
};

function linkEndId(end: GraphLink["source"] | GraphNode): string {
  return typeof end === "object" ? end.id : String(end);
}

function node(
  id: string,
  label: string,
  kind: Kind,
  detail: string,
  weight: number,
): GraphNode {
  return { id, label, kind, detail, weight };
}

function link(source: string, target: string, relation: Relation): GraphLink {
  return { source, target, relation };
}

/**
 * Hub-and-spoke sample organisation (live-map shape, sample files only):
 * Project → flat documents + 2 proceed decisions
 * Specialists evaluate both decisions
 * Decisions densely cite the evidence cloud
 * Decisions derive a stack of reports
 * No folder / category hubs.
 */
const DOC_COUNTS: Record<string, number> = {
  "01": 500,
  "02": 200,
  "03": 100,
};

const BULK_KINDS = [
  "Annex",
  "Memo",
  "Schedule",
  "Drawing",
  "Email",
  "Photo",
  "Register",
  "Certificate",
  "Correspondence",
  "Model",
  "Survey",
  "Opinion",
  "Permit",
  "Contract",
] as const;

const BULK_EXTS = [".pdf", ".xlsx", ".docx", ".msg", ".dwg", ".jpg", ".pptx"] as const;

const DECISION_IDS = ["dec-proceed-a", "dec-proceed-b"] as const;

const SPECIALIST_IDS = ["sp-leg", "sp-fin", "sp-tech", "sp-com", "sp-tax"] as const;

const NAMED_DOCS: { id: string; label: string; detail: string; weight: number }[] = [
  { id: "doc-hydro", label: "Hydrology_Report_v3.pdf", detail: "Evidence · 48 pages", weight: 10 },
  { id: "doc-fit", label: "Financial_Model_Base.xlsx", detail: "Authoritative workbook", weight: 11 },
  { id: "doc-dno", label: "DNO_Connection_Letter.pdf", detail: "Grid offer correspondence", weight: 9 },
  { id: "doc-topo", label: "Topographic_Survey.dwg", detail: "Site survey package", weight: 8 },
  { id: "doc-geo", label: "Geotech_Factual.pdf", detail: "Borehole & lab results", weight: 8 },
  { id: "doc-eia", label: "EIA_Scoping_Note.pdf", detail: "Consent strategy draft", weight: 9 },
  { id: "doc-ppa", label: "Draft_PPA_TermSheet.docx", detail: "Commercial offtake terms", weight: 9 },
  { id: "doc-lease", label: "Land_Option_Agreement.pdf", detail: "Option period & exclusivity", weight: 8 },
  { id: "doc-title", label: "Title_Pack_Index.pdf", detail: "Charges & easements", weight: 8 },
  { id: "doc-epc", label: "EPC_Indicative_Quote.pdf", detail: "Turnkey cost envelope", weight: 9 },
  { id: "doc-om", label: "O&M_Assumptions.xlsx", detail: "Lifecycle opex build", weight: 7 },
  { id: "doc-ins", label: "Insurance_Summary.pdf", detail: "Broker placement note", weight: 7 },
  { id: "doc-tax", label: "Tax_Structure_Memo.pdf", detail: "SPV & relief pathway", weight: 8 },
  { id: "doc-market", label: "Market_Price_Curve.xlsx", detail: "Capture price scenarios", weight: 8 },
  { id: "doc-grid-study", label: "Grid_Impact_Study.pdf", detail: "Constraint & reinforcement", weight: 9 },
  { id: "doc-hs", label: "H&S_Risk_Register.xlsx", detail: "Construction phase risks", weight: 7 },
  { id: "doc-photo", label: "Site_Photos_Q2.zip", detail: "Access & laydown imagery", weight: 6 },
  { id: "doc-board", label: "IC_Memo_Draft.docx", detail: "Investment committee pack", weight: 10 },
  { id: "doc-sens", label: "Sensitivity_Pack.xlsx", detail: "Tornado & downside cases", weight: 8 },
  { id: "doc-water", label: "Water_Rights_Opinion.pdf", detail: "Abstraction / discharge", weight: 7 },
  { id: "doc-bird", label: "Ecology_Baseline.pdf", detail: "Seasonal survey summary", weight: 7 },
  { id: "doc-noise", label: "Noise_Assessment.pdf", detail: "Receptor modelling", weight: 6 },
  { id: "doc-traffic", label: "CTMP_Outline.pdf", detail: "Construction traffic plan", weight: 6 },
  { id: "doc-lender", label: "Lender_Term_Sheet.pdf", detail: "Indicative debt terms", weight: 9 },
  { id: "doc-esg", label: "ESG_Screening.xlsx", detail: "IFC / EU taxonomy flags", weight: 7 },
  { id: "doc-warranty", label: "Equipment_Warranty.pdf", detail: "OEM coverage limits", weight: 6 },
  { id: "doc-comms", label: "Stakeholder_Log.xlsx", detail: "Local engagement tracker", weight: 6 },
];

/** Sample report stack — PPE / specialist analysis / site risk generations. */
const SAMPLE_REPORTS: { id: string; label: string; detail: string }[] = [
  { id: "rep-ppe-1", label: "PPE · generation 1", detail: "Preliminary Project Evaluation" },
  { id: "rep-ppe-2", label: "PPE · generation 2", detail: "Preliminary Project Evaluation" },
  { id: "rep-ppe-3", label: "PPE · generation 3", detail: "Preliminary Project Evaluation" },
  { id: "rep-ppe-4", label: "PPE · generation 4", detail: "Preliminary Project Evaluation" },
  { id: "rep-sda-1", label: "SDA · generation 1", detail: "Specialist Decision Analysis" },
  { id: "rep-sda-2", label: "SDA · generation 2", detail: "Specialist Decision Analysis" },
  { id: "rep-sda-3", label: "SDA · generation 3", detail: "Specialist Decision Analysis" },
  { id: "rep-sda-4", label: "SDA · generation 4", detail: "Specialist Decision Analysis" },
  { id: "rep-sda-5", label: "SDA · generation 5", detail: "Specialist Decision Analysis" },
  { id: "rep-site-1", label: "Site risk · generation 1", detail: "Desktop Site & Physical Risk" },
  { id: "rep-site-2", label: "Site risk · generation 2", detail: "Desktop Site & Physical Risk" },
  { id: "rep-site-3", label: "Site risk · generation 3", detail: "Desktop Site & Physical Risk" },
  { id: "rep-site-4", label: "Site risk · generation 4", detail: "Desktop Site & Physical Risk" },
];

function buildSampleGraph(
  projectId: string,
  projectName: string,
  capacity: string,
): {
  nodes: GraphNode[];
  links: GraphLink[];
} {
  const targetDocs = DOC_COUNTS[projectId] ?? 100;
  const proceedLabel = `Proceed with ${projectName}?`;

  const nodes: GraphNode[] = [
    node(
      "proj",
      projectName,
      "project",
      `2 decisions · ${targetDocs} documents · ${capacity}`,
      26,
    ),

    // Two capital-commitment runs (same question)
    node("dec-proceed-a", proceedLabel, "decision", "Score ~54 · sample evaluation run", 14),
    node("dec-proceed-b", proceedLabel, "decision", "Score ~60 · sample evaluation run", 14),

    // Specialist ring — not contained by the project
    node("sp-leg", "Legal", "specialist", "Score 74 · contracts & title", 12),
    node("sp-fin", "Finance", "specialist", "Score 81 · returns & DSCR", 12),
    node("sp-tech", "Technical", "specialist", "Score 72 · technical viability", 12),
    node("sp-com", "Business Dev", "specialist", "Score 68 · offtake & market", 11),
    node("sp-tax", "Tax", "specialist", "Score 79 · structure & reliefs", 10),

    // Named evidence leaves (still flat under project)
    ...NAMED_DOCS.map((d) => node(d.id, d.label, "document", d.detail, d.weight)),

    // Derived report stack
    ...SAMPLE_REPORTS.map((r) => node(r.id, r.label, "report", r.detail, 11)),
  ];

  const links: GraphLink[] = [
    // contains — ownership spine: project → decisions + every document
    link("proj", "dec-proceed-a", "contains"),
    link("proj", "dec-proceed-b", "contains"),
    ...NAMED_DOCS.map((d) => link("proj", d.id, "contains")),

    // evaluates — each specialist scores both proceed runs
    ...SPECIALIST_IDS.flatMap((sp) =>
      DECISION_IDS.map((dec) => link(sp, dec, "evaluates")),
    ),

    // cites — named evidence used on both decisions (dense seed)
    ...NAMED_DOCS.flatMap((d) => [
      link("dec-proceed-a", d.id, "cites"),
      link("dec-proceed-b", d.id, "cites"),
    ]),

    // derives — report stack hangs off the decisions
    ...SAMPLE_REPORTS.map((r, i) =>
      link(i % 2 === 0 ? "dec-proceed-a" : "dec-proceed-b", r.id, "derives"),
    ),
  ];

  const namedDocCount = NAMED_DOCS.length;
  const bulkNeeded = Math.max(0, targetDocs - namedDocCount);

  for (let i = 0; i < bulkNeeded; i += 1) {
    const id = `doc-bulk-${String(i + 1).padStart(3, "0")}`;
    const kind = BULK_KINDS[i % BULK_KINDS.length];
    const ext = BULK_EXTS[i % BULK_EXTS.length];
    const label = `${kind}_${String(i + 1).padStart(3, "0")}${ext}`;
    nodes.push(node(id, label, "document", "Sample data-room file", 3.2 + (i % 5) * 0.35));

    // Flat under project (no folder hubs)
    links.push(link("proj", id, "contains"));

    // Dense cite hair: most files cited by at least one proceed run; many by both
    if (i % 2 === 0) links.push(link("dec-proceed-a", id, "cites"));
    if (i % 3 !== 0) links.push(link("dec-proceed-b", id, "cites"));
  }

  return { nodes, links };
}

type SampleKnowledgeMapProps = {
  projectId: string;
  projectName: string;
  capacity: string;
};

const SampleKnowledgeMap = ({
  projectId,
  projectName,
  capacity,
}: SampleKnowledgeMapProps) => {
  const source = useMemo(
    () => buildSampleGraph(projectId, projectName, capacity),
    [projectId, projectName, capacity],
  );

  const prompts = SAMPLE_ASKS[projectId] ?? SAMPLE_ASKS["01"];

  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const nodeCache = useRef(new Map<string, GraphNode>());
  const lastClick = useRef<{ id: string; at: number } | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const askTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [size, setSize] = useState({ width: 640, height: 480 });
  const [hiddenKinds, setHiddenKinds] = useState<Set<Kind>>(new Set());
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Dense sample graph: hubs stay labeled when Labels is off (weight ≥ 12).
  const [showAllLabels, setShowAllLabels] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [openHint, setOpenHint] = useState(false);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [answer, setAnswer] = useState<StoredAnswer | null>(null);
  const [answerExpanded, setAnswerExpanded] = useState(false);
  const [askError, setAskError] = useState<string | null>(null);

  useEffect(() => {
    nodeCache.current.clear();
    setAnswer(null);
    setAnswerExpanded(false);
    setAskError(null);
    setQuestion("");
    setSelectedId(null);
    setAsking(false);
  }, [source, projectId]);

  useEffect(() => {
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
      if (fitTimer.current) clearTimeout(fitTimer.current);
      if (askTimer.current) clearTimeout(askTimer.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setSize({
        width: Math.max(280, Math.floor(rect.width)),
        height: Math.max(280, Math.floor(rect.height)),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const baseData = useMemo(() => {
    const nodes = source.nodes.filter((n) => !hiddenKinds.has(n.kind));
    const visible = new Set(nodes.map((n) => n.id));
    const links = source.links.filter(
      (l) => visible.has(linkEndId(l.source)) && visible.has(linkEndId(l.target)),
    );
    return { nodes, links };
  }, [source, hiddenKinds]);

  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>();
    baseData.links.forEach((l) => {
      const a = linkEndId(l.source);
      const b = linkEndId(l.target);
      if (!map.has(a)) map.set(a, new Set());
      if (!map.has(b)) map.set(b, new Set());
      map.get(a)?.add(b);
      map.get(b)?.add(a);
    });
    return map;
  }, [baseData]);

  const searchFocus = answer?.focus_ids?.length ? answer.focus_ids : null;

  /**
   * Nodes to keep on screen.
   * - Clicked node: that node + immediate neighbours.
   * - Ask answer: strict focus_ids only (no 1-hop expansion).
   */
  const visibleIds = useMemo(() => {
    if (selectedId) {
      const keep = new Set<string>([selectedId]);
      adjacency.get(selectedId)?.forEach((neighbour) => keep.add(neighbour));
      return keep;
    }
    if (searchFocus && searchFocus.length > 0) {
      return new Set(searchFocus);
    }
    return null;
  }, [selectedId, searchFocus, adjacency]);

  const graphData = useMemo(() => {
    const nodes = baseData.nodes
      .filter((n) => !visibleIds || visibleIds.has(n.id))
      .map((n) => {
        const cached = nodeCache.current.get(n.id);
        if (cached) {
          Object.assign(cached, n);
          return cached;
        }
        const fresh: GraphNode = { ...n };
        nodeCache.current.set(n.id, fresh);
        return fresh;
      });
    const shown = new Set(nodes.map((n) => n.id));
    const links = baseData.links
      .filter((l) => shown.has(linkEndId(l.source)) && shown.has(linkEndId(l.target)))
      .map((l) => ({
        source: linkEndId(l.source),
        target: linkEndId(l.target),
        relation: l.relation,
      })) as GraphLink[];
    return { nodes, links };
  }, [baseData, visibleIds]);

  const nodeById = useMemo(
    () => new Map(source.nodes.map((n) => [n.id, n])),
    [source],
  );

  const matchedIds = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return null;
    return new Set(
      graphData.nodes
        .filter((n) => `${n.label} ${n.detail}`.toLowerCase().includes(term))
        .map((n) => n.id),
    );
  }, [filter, graphData]);

  const hoverNeighbourhood = useMemo(() => {
    if (!hoveredId) return null;
    const set = new Set<string>([hoveredId]);
    adjacency.get(hoveredId)?.forEach((id) => set.add(id));
    return set;
  }, [hoveredId, adjacency]);

  const isDimmed = useCallback(
    (id: string) => {
      if (matchedIds && !matchedIds.has(id)) return true;
      if (!visibleIds && hoverNeighbourhood && !hoverNeighbourhood.has(id)) return true;
      return false;
    },
    [matchedIds, hoverNeighbourhood, visibleIds],
  );

  const nodeColor = useCallback(
    (node: GraphNode) => {
      if (!isDimmed(node.id)) return KIND_META[node.kind].color;
      return MUTED;
    },
    [isDimmed],
  );

  const linkColor = useCallback(
    (link: GraphLink) => {
      const a = linkEndId(link.source);
      const b = linkEndId(link.target);
      const active = !isDimmed(a) && !isDimmed(b);
      if (!active) return LINK_DIMMED;
      if (link.relation === "evaluates") return "rgba(192,132,252,0.5)";
      if (link.relation === "derives") return "rgba(251,113,133,0.45)";
      if (link.relation === "cites") return "rgba(245,158,11,0.35)";
      if (link.relation === "related") return "rgba(16,185,129,0.55)";
      return LINK_DEFAULT;
    },
    [isDimmed],
  );

  const nodeThreeObject = useCallback(
    (node: GraphNode) => {
      const weight = node.weight ?? 6;
      if (!showAllLabels && weight < 12) return new Object3D();
      const sprite = new SpriteText(node.label);
      sprite.textHeight = weight >= 16 ? 5 : weight >= 8 ? 3.6 : 2.8;
      sprite.color = LABEL_COLOR;
      sprite.fontWeight = "600";
      (sprite as unknown as Object3D).position.set(0, Math.cbrt(weight) * 3 + 3, 0);
      return sprite;
    },
    [showAllLabels],
  );

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.d3Force("charge")?.strength(-140);
    fg.d3Force("link")?.distance(48);
  }, [size.width, size.height, graphData.nodes.length]);

  useEffect(() => {
    if (!autoRotate) return;
    const fg = fgRef.current;
    if (!fg) return;
    const start = fg.camera().position;
    const radius = Math.hypot(start.x, start.z) || 420;
    const height = start.y;
    let angle = Math.atan2(start.x, start.z);
    let frame = requestAnimationFrame(function tick() {
      angle += 0.0018;
      fgRef.current?.cameraPosition({
        x: radius * Math.sin(angle),
        y: height,
        z: radius * Math.cos(angle),
      });
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [autoRotate]);

  /** Recentre OrbitControls look-at, then frame every visible node. */
  const fitGraph = useCallback((delayMs = 120) => {
    if (fitTimer.current) clearTimeout(fitTimer.current);
    fitTimer.current = setTimeout(() => {
      fitTimer.current = null;
      const fg = fgRef.current;
      if (!fg) return;

      const controls = fg.controls() as {
        target?: { set: (x: number, y: number, z: number) => void };
        update?: () => void;
      } | null;

      const bbox = fg.getGraphBbox?.();
      if (!bbox) {
        controls?.target?.set(0, 0, 0);
        controls?.update?.();
        fg.zoomToFit(700, 110);
        return;
      }

      const cx = (bbox.x[0] + bbox.x[1]) / 2;
      const cy = (bbox.y[0] + bbox.y[1]) / 2;
      const cz = (bbox.z[0] + bbox.z[1]) / 2;
      const span = Math.max(
        bbox.x[1] - bbox.x[0],
        bbox.y[1] - bbox.y[0],
        bbox.z[1] - bbox.z[0],
        80,
      );
      const dist = span * 1.55 + 120;

      // Isolating flies look-at onto a node; retarget to the cloud centre or Reset veers.
      controls?.target?.set(cx, cy, cz);
      controls?.update?.();
      fg.cameraPosition(
        { x: cx, y: cy + span * 0.22, z: cz + dist },
        { x: cx, y: cy, z: cz },
        700,
      );
    }, delayMs);
  }, []);

  useEffect(() => {
    fitGraph(450);
  }, [projectName, fitGraph]);

  const focusOnNode = useCallback((graphNode: GraphNode) => {
    const fg = fgRef.current;
    if (!fg) return;
    const { x = 0, y = 0, z = 0 } = graphNode;
    const length = Math.hypot(x, y, z) || 1;
    const ratio = 1 + 150 / length;
    fg.cameraPosition({ x: x * ratio, y: y * ratio, z: z * ratio }, { x, y, z }, 900);
  }, []);

  const handleNodeClick = useCallback(
    (graphNode: GraphNode) => {
      const now = Date.now();
      const previous = lastClick.current;
      if (previous && previous.id === graphNode.id && now - previous.at < DOUBLE_CLICK_MS) {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
          clickTimer.current = null;
        }
        lastClick.current = null;
        setOpenHint(true);
        setSelectedId(graphNode.id);
        setTimeout(() => setOpenHint(false), 2200);
        return;
      }
      lastClick.current = { id: graphNode.id, at: now };
      setAutoRotate(false);
      setHoveredId(null);
      setOpenHint(false);
      if (clickTimer.current) clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        setSelectedId(graphNode.id);
        focusOnNode(graphNode);
      }, DOUBLE_CLICK_MS);
    },
    [focusOnNode],
  );

  const fitAskCluster = useCallback(() => {
    if (fitTimer.current) clearTimeout(fitTimer.current);
    // Let React commit the strict focus subset, then frame only those nodes.
    fitTimer.current = setTimeout(() => {
      fitTimer.current = null;
      fgRef.current?.zoomToFit(700, 90);
    }, 120);
  }, []);

  const resolvePrompt = useCallback(
    (raw: string) => {
      const q = raw.trim().toLowerCase();
      if (!q) return null;
      return (
        prompts.find((p) => p.text.toLowerCase() === q) ||
        prompts.find((p) => p.text.toLowerCase().includes(q) || q.includes(p.text.toLowerCase().slice(0, 24))) ||
        null
      );
    },
    [prompts],
  );

  const runAsk = useCallback(
    (raw?: string) => {
      const text = (raw ?? question).trim();
      if (!text || asking) return;

      setAsking(true);
      setSelectedId(null);
      setAnswerExpanded(false);
      setAskError(null);
      setOpenHint(false);
      setHoveredId(null);
      setQuestion(text);

      if (askTimer.current) clearTimeout(askTimer.current);
      askTimer.current = setTimeout(() => {
        askTimer.current = null;
        const prompt = resolvePrompt(text);
        setAsking(false);
        if (!prompt) {
          setAnswer(null);
          setAskError("No matching items in this project for that question. Try an example prompt.");
          return;
        }
        setAnswer({
          id: `${projectId}-${Date.now()}`,
          query: prompt.text,
          ...prompt.result,
        });
        setQuestion(prompt.text);
        fitAskCluster();
      }, ASK_DELAY_MS);
    },
    [question, asking, resolvePrompt, projectId, fitAskCluster],
  );

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setOpenHint(false);
    // Keep ask focus; only re-frame the current visible set.
    if (searchFocus) {
      fitAskCluster();
    } else {
      setAutoRotate(false);
      fitGraph(200);
    }
  }, [fitGraph, fitAskCluster, searchFocus]);

  const showEverything = useCallback(() => {
    setSelectedId(null);
    setAnswer(null);
    setAnswerExpanded(false);
    setAskError(null);
    setOpenHint(false);
    setAutoRotate(false);
    fitGraph(200);
  }, [fitGraph]);

  const resetView = () => {
    setSelectedId(null);
    setAnswer(null);
    setAnswerExpanded(false);
    setAskError(null);
    setQuestion("");
    setFilter("");
    setHiddenKinds(new Set());
    setAutoRotate(false);
    setOpenHint(false);
    setShowAllLabels(false);
    setHoveredId(null);
    fitGraph(220);
  };

  const toggleKind = (kind: Kind) => {
    setHiddenKinds((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  };

  const selected = selectedId ? nodeById.get(selectedId) ?? null : null;

  const selectedConnections = useMemo(() => {
    if (!selectedId) return [];
    return source.links
      .filter((l) => linkEndId(l.source) === selectedId || linkEndId(l.target) === selectedId)
      .map((l) => {
        const otherId =
          linkEndId(l.source) === selectedId
            ? linkEndId(l.target)
            : linkEndId(l.source);
        return { relation: l.relation, node: nodeById.get(otherId) };
      })
      .filter((c) => Boolean(c.node))
      .slice(0, 8);
  }, [selectedId, source, nodeById]);

  const isolatedCount = visibleIds ? graphData.nodes.length : null;
  const focusLabel = selected?.label ?? (searchFocus ? "your question" : null);

  return (
    <div ref={containerRef} className="sample-km">
      <ForceGraph3D<GraphNode, GraphLink>
        ref={fgRef}
        graphData={graphData}
        width={size.width}
        height={size.height}
        backgroundColor={CANVAS_BG}
        showNavInfo={false}
        nodeRelSize={2.6}
        nodeVal={(node) => node.weight ?? 6}
        nodeOpacity={0.92}
        nodeResolution={16}
        nodeColor={nodeColor}
        nodeLabel={(node) => `${node.label} · ${KIND_META[node.kind].label}`}
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend
        linkColor={linkColor}
        linkWidth={(link) =>
          link.relation === "related" ? 1.4 : link.relation === "contains" ? 0.7 : 0.4
        }
        linkOpacity={0.5}
        linkDirectionalParticles={(link) =>
          visibleIds &&
          !isDimmed(linkEndId(link.source)) &&
          !isDimmed(linkEndId(link.target))
            ? 2
            : 0
        }
        linkDirectionalParticleWidth={1.2}
        linkDirectionalParticleSpeed={0.006}
        onNodeClick={handleNodeClick}
        onNodeHover={(node) => setHoveredId(node ? node.id : null)}
        onBackgroundClick={clearSelection}
        cooldownTime={6000}
      />

      <div className="sample-km-panel sample-km-tl">
        <div className="sample-km-title-row">
          <div>
            <p className="sample-km-kicker">Knowledge Map</p>
            <p className="sample-km-title">{projectName}</p>
          </div>
          <span className="sample-km-badge">Sample</span>
        </div>

        <div className="sample-km-ask-row">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runAsk();
            }}
            disabled={asking}
            placeholder="Ask about this project…"
            className="sample-km-ask-input"
          />
          <button
            type="button"
            className="sample-km-ask-btn"
            disabled={asking || !question.trim()}
            onClick={() => runAsk()}
          >
            {asking ? "…" : "Ask"}
          </button>
        </div>

        {!answer && !asking && !askError && (
          <div className="sample-km-suggestions">
            <p className="sample-km-kicker">Example prompts</p>
            {prompts.map((item) => (
              <button
                key={item.text}
                type="button"
                className="sample-km-suggestion"
                onClick={() => runAsk(item.text)}
              >
                {item.text}
              </button>
            ))}
          </div>
        )}

        {askError ? <p className="sample-km-ask-error">{askError}</p> : null}

        {answer && (answer.bullets.length > 0 || answer.answer) ? (
          <div className="sample-km-answer">
            <div className="sample-km-answer-head">
              <p className="sample-km-kicker">Answer</p>
              {answer.confidence ? (
                <span className="sample-km-confidence">{answer.confidence} confidence</span>
              ) : null}
            </div>
            <ul className="sample-km-bullets">
              {(answer.bullets.length ? answer.bullets : [answer.answer]).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {answer.answer ? (
              <div className="sample-km-full-answer">
                <button
                  type="button"
                  onClick={() => setAnswerExpanded((v) => !v)}
                >
                  {answerExpanded ? "Hide full answer" : "See full answer"}
                </button>
                {answerExpanded ? <p>{answer.answer}</p> : null}
              </div>
            ) : null}
            {answer.documents.length > 0 ? (
              <div className="sample-km-answer-docs">
                <p className="sample-km-kicker">Open</p>
                <ul>
                  {answer.documents.map((d) => (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setOpenHint(true);
                          setSelectedId(d.id);
                          setTimeout(() => setOpenHint(false), 2200);
                          const cached = nodeCache.current.get(d.id);
                          if (cached) focusOnNode(cached);
                        }}
                      >
                        <span
                          className="sample-km-doc-dot"
                          style={{ background: KIND_META.document.color }}
                        />
                        {d.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <button
              type="button"
              className="sample-km-show-map"
              onClick={showEverything}
            >
              Show whole map
            </button>
          </div>
        ) : null}

        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter visible nodes…"
          className="sample-km-filter"
        />
        {matchedIds ? (
          <p className="sample-km-filter-count">
            {matchedIds.size} match{matchedIds.size === 1 ? "" : "es"}
          </p>
        ) : null}
      </div>

      <div className="sample-km-panel sample-km-tr">
        <p className="sample-km-kicker mb-2">Layers</p>
        <div className="sample-km-layers">
          {KIND_ORDER.map((kind) => {
            const on = !hiddenKinds.has(kind);
            return (
              <button
                key={kind}
                type="button"
                className={`sample-km-layer ${on ? "is-on" : ""}`}
                onClick={() => toggleKind(kind)}
              >
                <span style={{ background: KIND_META[kind].color }} />
                {KIND_META[kind].label}
              </button>
            );
          })}
        </div>
        <div className="sample-km-controls">
          <button type="button" onClick={() => setShowAllLabels((v) => !v)}>
            {showAllLabels ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5" />
            )}
            Labels
          </button>
          <button
            type="button"
            className={autoRotate ? "is-active" : ""}
            onClick={() => setAutoRotate((v) => !v)}
          >
            Orbit
          </button>
          <button type="button" onClick={resetView}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {isolatedCount !== null && focusLabel ? (
        <div className="sample-km-banner">
          <span>
            Showing {isolatedCount} node{isolatedCount === 1 ? "" : "s"}
            {searchFocus && !selectedId ? " for " : " connected to "}
            {focusLabel}
          </span>
          <button type="button" onClick={showEverything}>
            Show all
          </button>
        </div>
      ) : null}

      <div className="sample-km-hint">
        Try an example ask · Drag to rotate · Click to isolate · Empty space clears selection
      </div>

      {selected && (
        <div className="sample-km-panel sample-km-br">
          <div className="sample-km-insp-head">
            <span
              className="sample-km-insp-kind"
              style={{ background: KIND_META[selected.kind].color }}
            />
            <div>
              <p className="sample-km-kicker">
                {KIND_META[selected.kind].label.slice(0, -1)}
              </p>
              <p className="sample-km-insp-name">{selected.label}</p>
              <p className="sample-km-insp-detail">{selected.detail}</p>
            </div>
          </div>
          {selectedConnections.length > 0 && (
            <div className="sample-km-connections">
              <p className="sample-km-kicker mb-1.5">Connections</p>
              {selectedConnections.map(({ relation, node }) => (
                <button
                  key={`${relation}-${node!.id}`}
                  type="button"
                  className="sample-km-connection"
                  onClick={() => {
                    setSelectedId(node!.id);
                    const cached = nodeCache.current.get(node!.id);
                    if (cached) focusOnNode(cached);
                  }}
                >
                  <span>{RELATION_LABELS[relation]}</span>
                  <span>{node!.label}</span>
                </button>
              ))}
            </div>
          )}
          <p className={`sample-km-sample-note ${openHint ? "is-flash" : ""}`}>
            Sample node - nothing to open.
          </p>
        </div>
      )}
    </div>
  );
};

export default SampleKnowledgeMap;
