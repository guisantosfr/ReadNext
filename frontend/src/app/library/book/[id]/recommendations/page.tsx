import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import processBook from "@/lib/process-book"
import RecommendationsList from "@/components/recommendations-list"

export default async function BookRecommendationsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const bookData = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/books/${id}`)
    const book = await bookData.json()

    const isInLibraryData = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/is-in-library/${id}`)
    const isInLibrary = await isInLibraryData.json()

    if (!book) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
                    <Link href="/">
                        <Button>Voltar à pesquisa</Button>
                    </Link>
                </div>
            </div>
        )
    }

    if (!isInLibrary) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Livro não está na biblioteca</h1>
                    <p className="text-muted-foreground mb-6">
                        Adicione este livro à sua biblioteca para ver recomendações personalizadas.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/">
                            <Button variant="outline">Voltar à pesquisa</Button>
                        </Link>
                        <Link href={`library/book/${id}`}>
                            <Button>Ver detalhes do livro</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header com navegação */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Recomendações</h1>
                    <p className="text-muted-foreground">
                        Baseado em <span className="font-medium">"{book.title}"</span> de {book.author}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <Home className="h-4 w-4 mr-2" />
                            Início
                        </Button>
                    </Link>
                    <Link href={`/library/book/${id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Informações do livro base */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded">
                            <img
                                src={book.cover || "/placeholder.svg"}
                                alt={`Capa do livro ${book.title}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                            <p className="text-muted-foreground mb-2">{book.author}</p>
                            <Badge variant="outline">{book.genre}</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Container de recomendações com loading do lado do cliente */}
            <RecommendationsList
                bookId={id}
                bookTitle={book.title} 
                bookAuthor={book.author} 
            />

            
        </div>
    )
}
