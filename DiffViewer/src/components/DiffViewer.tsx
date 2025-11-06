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
    <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold gradient-text">
          🔍 Code Comparison
        </h3>
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
          Powered by Monaco Editor
        </span>
      </div>

      <div className="monaco-container relative" style={{ height: '500px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm z-10 rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <div className="loading"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Loading editor...
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
