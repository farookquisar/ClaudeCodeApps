import { Theme } from '@/types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="mb-6 md:mb-8 fade-in-up relative z-10">
      <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 card-hover">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center shadow-neon">
                <svg
                  className="w-6 h-6 text-neon-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
                  Code Compare
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="cyber-badge text-xs">v2.0</span>
                  <span className="cyber-badge text-xs">
                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full inline-block mr-1.5 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
              Professional code comparison powered by{' '}
              <span className="text-cyan-400 font-semibold">Monaco Editor</span>
              <span className="text-gray-500 mx-2">•</span>
              Compare, analyze, and visualize code differences with precision
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="neon-btn px-5 md:px-6 py-3 rounded-xl text-white font-semibold transition-all group relative overflow-hidden"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {theme === 'light' ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Dark</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Light</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Decorative scan line */}
        <div className="scan-line" style={{ top: '50%' }} />
      </div>
    </header>
  );
};
