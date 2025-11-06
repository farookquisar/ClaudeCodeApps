import { useState } from 'react';
import {
  Header,
  Controls,
  CodeInput,
  DiffViewer,
  Footer,
  AnimatedBackground,
} from '@/components';
import { useTheme } from '@/hooks/useTheme';
import { Language, ViewType } from '@/types';
import { SAMPLES } from '@/utils/samples';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<Language>('javascript');
  const [viewType, setViewType] = useState<ViewType>('inline');
  const [originalCode, setOriginalCode] = useState<string>(
    SAMPLES.javascript.old
  );
  const [modifiedCode, setModifiedCode] = useState<string>(
    SAMPLES.javascript.new
  );

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleLoadSample = () => {
    const sample = SAMPLES[language];
    if (sample) {
      setOriginalCode(sample.old);
      setModifiedCode(sample.new);
    } else {
      // Fallback to JavaScript if language not found in samples
      setOriginalCode(SAMPLES.javascript.old);
      setModifiedCode(SAMPLES.javascript.new);
    }
  };

  const handleSwap = () => {
    const temp = originalCode;
    setOriginalCode(modifiedCode);
    setModifiedCode(temp);
  };

  const handleClear = () => {
    setOriginalCode('');
    setModifiedCode('');
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header theme={theme} onToggleTheme={toggleTheme} />

          <Controls
            language={language}
            viewType={viewType}
            onLanguageChange={handleLanguageChange}
            onViewTypeChange={setViewType}
            onSwap={handleSwap}
            onClear={handleClear}
            onLoadSample={handleLoadSample}
          />

          {/* Code Input Section - Mobile Stacked */}
          <div className="lg:hidden space-y-4 mb-6">
            <CodeInput
              title="Original Code"
              value={originalCode}
              onChange={setOriginalCode}
              placeholder="Paste your original code here..."
              icon="📄"
            />
            <CodeInput
              title="Modified Code"
              value={modifiedCode}
              onChange={setModifiedCode}
              placeholder="Paste your modified code here..."
              icon="📝"
            />
          </div>

          {/* Code Input Section - Desktop Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-6">
            <CodeInput
              title="Original Code"
              value={originalCode}
              onChange={setOriginalCode}
              placeholder="Paste your original code here..."
              icon="📄"
            />
            <CodeInput
              title="Modified Code"
              value={modifiedCode}
              onChange={setModifiedCode}
              placeholder="Paste your modified code here..."
              icon="📝"
            />
          </div>

          <DiffViewer
            originalCode={originalCode}
            modifiedCode={modifiedCode}
            language={language}
            theme={theme}
            viewType={viewType}
          />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
