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
    <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 fade-in-up animate-delay-100 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Language Selector */}
        <div className="slide-in-left">
          <label
            htmlFor="language-select"
            className="cyber-label"
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
        <div className="slide-in-left animate-delay-100">
          <label
            htmlFor="view-type-select"
            className="cyber-label"
          >
            View Mode
          </label>
          <select
            id="view-type-select"
            value={viewType}
            onChange={(e) => onViewTypeChange(e.target.value as ViewType)}
            className="input-field"
          >
            <option value="inline">Inline View</option>
            <option value="side-by-side">Side-by-Side</option>
          </select>
        </div>

        {/* Quick Actions */}
        <div className="sm:col-span-2 lg:col-span-2 slide-in-right">
          <label className="cyber-label">
            Quick Actions
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSwap}
              className="btn-swap flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-white text-sm transition-all"
              title="Swap original and modified code"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Swap
              </span>
            </button>
            <button
              onClick={onClear}
              className="btn-clear flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-white text-sm transition-all"
              title="Clear all code"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear
              </span>
            </button>
            <button
              onClick={onLoadSample}
              className="btn-sample flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-white text-sm transition-all"
              title="Load sample code"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Sample
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
