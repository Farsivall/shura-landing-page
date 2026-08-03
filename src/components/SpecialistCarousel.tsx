import {
  Briefcase,
  Calculator,
  Hammer,
  Landmark,
  Scale,
  type LucideIcon,
} from "lucide-react";

const specialists: {
  name: string;
  color: string;
  Icon: LucideIcon;
}[] = [
  { name: "Engineering", color: "#7c3aed", Icon: Hammer },
  { name: "Legal", color: "#2563eb", Icon: Scale },
  { name: "Tax", color: "#0d9488", Icon: Landmark },
  { name: "Finance", color: "#059669", Icon: Calculator },
  { name: "Commercial", color: "#d97706", Icon: Briefcase },
];

const SpecialistItem = ({
  item,
}: {
  item: (typeof specialists)[number];
}) => {
  const { Icon } = item;
  return (
    <li className="specialist-logo">
      <span className="specialist-logo-mark">{item.name}</span>
      <span
        className="specialist-logo-badge"
        style={{ backgroundColor: item.color }}
        aria-hidden
      >
        <Icon className="specialist-logo-icon" strokeWidth={2} />
      </span>
    </li>
  );
};

const SpecialistCarousel = () => {
  const loop = [...specialists, ...specialists, ...specialists];

  return (
    <div className="specialist-logos" aria-label="Specialist disciplines">
      <div className="specialist-logos-viewport">
        <ul className="specialist-logos-track">
          {loop.map((item, i) => (
            <SpecialistItem key={`${item.name}-${i}`} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecialistCarousel;
