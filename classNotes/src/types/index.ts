export interface ClassNote {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  speaker: string;
  location: string;
  createdAt: number;
  updatedAt: number;
}

export interface SearchFilters {
  query: string;
  category: string;
  speaker: string;
  location: string;
  dateFrom: string;
  dateTo: string;
}
