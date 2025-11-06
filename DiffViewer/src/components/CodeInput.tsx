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
    <div className="glass-card rounded-2xl p-4 md:p-6 fade-in">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          {icon} {title}
        </h3>
        <button
          onClick={handleCopy}
          className="btn px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          disabled={!value}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
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
