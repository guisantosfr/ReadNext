import { ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default async function LibraryBookDetailPage({ params }: { params: Promise<{ id: string }>  }) {
  const { id } = await params;

  const bookData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)

  const book = bookData.ok ? await bookData.json() : null

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalhes do livro */}
        <div className="lg:col-span-1">
          <Card className="p-0">
            <CardContent className="p-6">
              <div className="aspect-[4/5] mb-6 overflow-hidden rounded-lg">
                {
                  book.cover ?
                    <img
                      src={book.cover}
                      alt={`Capa do livro ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                    :
                    <div className="w-full h-full object-cover">
                      Capa não encontrada
                    </div>
                }
              </div>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                  <p className="text-lg text-muted-foreground">{book.author}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge>{book.genre}</Badge>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Páginas:</span>
                    <span>{book.pages}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Descrição e recomendações */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o livro</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="book-description leading-relaxed"
                dangerouslySetInnerHTML={{ __html: book.description ?? "" }}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
              <Link href={`${book.id}/recommendations`}>
                <Button size="lg" className="w-full md:w-auto">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ver Recomendações
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  )
}
