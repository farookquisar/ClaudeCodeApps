export const Footer = () => {
  return (
    <footer className="mt-8 md:mt-12 text-center fade-in-up animate-delay-300 relative z-10">
      <div className="glass-card rounded-2xl p-6 md:p-8 inline-block relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm text-dark-300">
              Powered by{' '}
              <span className="text-neon-blue font-semibold">Monaco Editor</span>
            </p>
          </div>
          <span className="text-dark-400 hidden md:inline">•</span>
          <p className="text-sm text-dark-300">
            Made with <span className="text-neon-pink animate-pulse inline-block">❤️</span> for developers
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="cyber-badge">React 18</span>
          <span className="cyber-badge">TypeScript</span>
          <span className="cyber-badge">TailwindCSS</span>
        </div>
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
      </div>
    </footer>
  );
};
