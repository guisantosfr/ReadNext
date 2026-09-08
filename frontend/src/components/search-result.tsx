import { BookOpen, Loader2 } from "lucide-react"
import BookCard from './book-card';
import { ProcessedBook } from "@/types/ProcessedBook";

interface Props {
    hasSearched: boolean;
    loading: boolean;
    error: string | null;
    books: ProcessedBook[];
}

export default function SearchResult({ hasSearched, loading, error, books }: Props) {
    return (
        <>
            {!hasSearched && (
                <div className="text-center py-16">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                    <h2 className="text-2xl font-semibold mb-3">Pesquise livros no campo acima</h2>
                    <p className="text-muted-foreground text-lg">
                        Digite o nome de um livro, autor ou gênero para começar sua busca
                    </p>
                </div>
            )}

            {hasSearched && loading && (
                <div className="text-center py-16">
                    <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
                    <h3 className="text-xl font-medium mb-2">Buscando livros...</h3>
                    <p className="text-muted-foreground">
                        Aguarde enquanto pesquisamos os melhores livros para você
                    </p>
                </div>
            )}

            {hasSearched && !loading && error && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-red-600">Erro na pesquisa</h3>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            )}

            {hasSearched && !loading && !error && books.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>
            )}

            {hasSearched && !loading && !error && books.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum livro encontrado</h3>
                    <p className="text-muted-foreground mb-4">
                        Não encontramos livros para esta busca. Tente:
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto">
                        <p>• Verificar a ortografia</p>
                        <p>• Usar palavras-chave diferentes</p>
                        <p>• Buscar por autor ou gênero</p>
                    </div>
                </div>
            )}
        </>
    )
}