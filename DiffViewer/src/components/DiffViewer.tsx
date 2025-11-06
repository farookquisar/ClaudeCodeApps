import { DiffEditor } from '@monaco-editor/react';
import { Language, Theme, ViewType } from '@/types';
import { useState } from 'react';

interface DiffViewerProps {
  originalCode: string;
  modifiedCode: string;
  language: Language;
  theme: Theme;
  viewType: ViewType;
}

export const DiffViewer = ({
  originalCode,
  modifiedCode,
  language,
  theme,
  viewType,
}: DiffViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
  const isSideBySide = viewType === 'side-by-side';

  return (
    <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 fade-in-up animate-delay-200 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 flex items-center justify-center shadow-neon">
            <svg className="w-5 h-5 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold gradient-text">
              Code Comparison
            </h3>
            <p className="text-xs text-dark-400">
              Real-time diff visualization
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="cyber-badge text-xs">
            {language.toUpperCase()}
          </span>
          <span className="cyber-badge text-xs">
            {isSideBySide ? 'Split' : 'Inline'}
          </span>
        </div>
      </div>

      <div className="monaco-container relative" style={{ height: '500px', minHeight: '400px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-900/90 backdrop-blur-md z-10 rounded-xl">
            <div className="flex flex-col items-center gap-4">
              <div className="loading"></div>
              <p className="text-sm text-neon-blue font-medium animate-pulse">
                Initializing Monaco Editor...
              </p>
            </div>
          </div>
        )}
        <DiffEditor
          original={originalCode}
          modified={modifiedCode}
          language={language}
          theme={monacoTheme}
          options={{
            renderSideBySide: isSideBySide,
            readOnly: false,
            fontSize: 14,
            minimap: { enabled: window.innerWidth > 768 },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            renderWhitespace: 'boundary',
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            padding: {
              top: 16,
              bottom: 16,
            },
          }}
          onMount={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};
