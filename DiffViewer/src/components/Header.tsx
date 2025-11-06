import { Theme } from '@/types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="mb-6 md:mb-8 fade-in">
      <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
              Code Compare
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Compare your code with elegance and precision
            </p>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="btn self-start md:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
};
