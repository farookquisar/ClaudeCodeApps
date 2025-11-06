export const AnimatedBackground = () => {
  return (
    <>
      {/* Cyber Grid Background */}
      <div className="cyber-grid" />

      {/* Animated Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>
    </>
  );
};
