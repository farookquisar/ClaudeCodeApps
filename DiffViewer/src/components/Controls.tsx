import { Language, ViewType } from '@/types';

interface ControlsProps {
  language: Language;
  viewType: ViewType;
  onLanguageChange: (language: Language) => void;
  onViewTypeChange: (viewType: ViewType) => void;
  onSwap: () => void;
  onClear: () => void;
  onLoadSample: () => void;
}

export const Controls = ({
  language,
  viewType,
  onLanguageChange,
  onViewTypeChange,
  onSwap,
  onClear,
  onLoadSample,
}: ControlsProps) => {
  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Language Selector */}
        <div>
          <label
            htmlFor="language-select"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
          >
            Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="input-field"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="sql">SQL</option>
          </select>
        </div>

        {/* View Type */}
        <div>
          <label
            htmlFor="view-type-select"
            className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
          >
            View Mode
          </label>
          <select
            id="view-type-select"
            value={viewType}
            onChange={(e) => onViewTypeChange(e.target.value as ViewType)}
            className="input-field"
          >
            <option value="inline">Inline</option>
            <option value="side-by-side">Side by Side</option>
          </select>
        </div>

        {/* Quick Actions */}
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Quick Actions
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSwap}
              className="btn flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-secondary-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
              title="Swap original and modified code"
            >
              🔄 Swap
            </button>
            <button
              onClick={onClear}
              className="btn flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
              title="Clear all code"
            >
              🗑️ Clear
            </button>
            <button
              onClick={onLoadSample}
              className="btn flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
              title="Load sample code"
            >
              ✨ Sample
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
