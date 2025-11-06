export type Theme = 'light' | 'dark';

export type ViewType = 'inline' | 'side-by-side';

export type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'java'
  | 'cpp'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'sql';

export interface CodeSample {
  old: string;
  new: string;
}

export interface SampleData {
  [key: string]: CodeSample;
}

export interface MonacoEditorOptions {
  renderSideBySide: boolean;
  readOnly: boolean;
  fontSize: number;
  minimap: { enabled: boolean };
  lineNumbers: 'on' | 'off' | 'relative' | 'interval';
  scrollBeyondLastLine: boolean;
  automaticLayout: boolean;
  wordWrap: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  renderWhitespace: 'none' | 'boundary' | 'selection' | 'trailing' | 'all';
  scrollbar: {
    vertical: string;
    horizontal: string;
    useShadows: boolean;
    verticalScrollbarSize: number;
    horizontalScrollbarSize: number;
  };
}
