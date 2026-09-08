import { ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import AddToLibraryCard from "@/components/add-to-library-card"

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const bookData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)

  const book = bookData.ok ? await bookData.json() : null

  let isInLibrary = false;
  try {
    const isInLibraryData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/is-in-library/${id}`)
    if (isInLibraryData.ok) {
      isInLibrary = await isInLibraryData.json()
    }
  } catch (e) {
    isInLibrary = false;
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Detalhes do livro */}
        <div className="lg:col-span-1">
          <Card className="p-0">
            <CardContent className="p-6">
              <div className="aspect-[4/5] mb-6 overflow-hidden rounded-lg max-w-xs mx-auto md:max-w-none">
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

          {
            isInLibrary ? (
              <Card>
                <CardContent className="p-3 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Este livro já está na sua biblioteca. <br/>Você pode ver lá suas recomendações personalizadas baseadas nele.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <AddToLibraryCard book={book} />
            )
          }

        </div>
      </div>
    </div>
  )
}
