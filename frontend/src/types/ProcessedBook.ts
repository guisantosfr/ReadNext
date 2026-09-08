export interface ProcessedBook {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover: string | null;
  genre: string;
  pages?: number;
  status?: "to_read" | "reading" | "read" | "dropped";
}