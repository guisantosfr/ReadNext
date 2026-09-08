import { BookOpen, Plus, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SearchInput from "@/components/search-input"
import SearchResult from '@/components/search-result';
import { GoogleBook } from "@/types/GoogleBook"
import { ProcessedBook } from "@/types/ProcessedBook"

interface SearchParams {
  search?: string;
}

function processBooks(googleBooksResponse: { items?: GoogleBook[] }): ProcessedBook[] {
  if (!googleBooksResponse.items) return [];
  
  return googleBooksResponse.items.map((book) => ({
    id: book.id,
    title: book.volumeInfo.title || 'Título não disponível',
    author: book.volumeInfo.authors?.join(', ') || 'Autor desconhecido',
    description: book.volumeInfo.description || 'Sinopse não disponível',
    cover: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    genre: book.volumeInfo.categories?.[0] || 'Sem categoria',
    pages: book.volumeInfo.pageCount || 0
  }));
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams>}) {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();
  const { search } = resolvedSearchParams;

  let books: ProcessedBook[] = [];
  let hasSearched = false;
  let error: string | null = null;
  let loading = false;
  
  if (search && search.trim()) {
    params.set('search', search);

    hasSearched = true;
    loading = true;

    try {
      const encodedSearch = encodeURIComponent(search.trim());
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_ENDPOINT}?q=${encodedSearch}&maxResults=40&printType=books`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      books = processBooks(data);
      loading = false;
    } catch (err) {
      console.error('Error fetching books:', err);
      error = 'Erro ao buscar livros. Tente novamente.';
      loading = false;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8" />
          ReadNext
        </h1>
        <p className="text-muted-foreground text-lg">Descubra sua próxima leitura favorita</p>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchInput />

        <Link href="/library">
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Minha Biblioteca
          </Button>
        </Link>

        <Link href="/recommendations">
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Recomendações Salvas
          </Button>
        </Link>
      </div>

      <SearchResult hasSearched={hasSearched} loading={loading} error={error} books={books}/>
    </div>
  )
}
