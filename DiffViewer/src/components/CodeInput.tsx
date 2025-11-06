import { useClipboard } from '@/hooks/useClipboard';

interface CodeInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: string;
}

export const CodeInput = ({
  title,
  value,
  onChange,
  placeholder,
  icon,
}: CodeInputProps) => {
  const { copyToClipboard, copied } = useClipboard();

  const handleCopy = async () => {
    const success = await copyToClipboard(value);
    if (!success) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 md:p-6 fade-in-up card-hover relative">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30 flex items-center justify-center">
            <span className="text-lg">{icon}</span>
          </div>
          <h3 className="cyber-label mb-0">
            {title}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          className="cyber-btn px-3 md:px-4 py-2 rounded-lg text-dark-50 text-xs md:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neon"
          disabled={!value}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="textarea-field h-40 md:h-64"
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};
