import { BookStatus } from "./BookStatus";

export interface ProcessedBook {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover: string | null;
  genre: string;
  pages?: number;
  status?: BookStatus;
}