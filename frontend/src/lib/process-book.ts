import { GoogleBook } from "@/types/GoogleBook";
import { ProcessedBook } from "@/types/ProcessedBook";

export default function processBook(googleBooksResponse: GoogleBook): ProcessedBook | null {
  if (!googleBooksResponse || !googleBooksResponse.volumeInfo) return null;

  const book = googleBooksResponse;

  return {
    id: book.id,
    title: book.volumeInfo.title || 'Título não disponível',
    author: book.volumeInfo.authors?.join(', ') || 'Autor desconhecido',
    description: book.volumeInfo.description || 'Descrição não disponível',
    cover: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    genre: book.volumeInfo.categories?.[0] || 'Sem categoria',
    pages: book.volumeInfo.pageCount
  };
}
