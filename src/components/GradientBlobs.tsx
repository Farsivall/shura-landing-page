/** Static atmosphere — animated blobs were repainting huge blur layers on every frame. */
const GradientBlobs = () => {
  return (
    <div className="gradient-blobs fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[120px]" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute top-[60%] right-[30%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
    </div>
  );
};

export default GradientBlobs;
