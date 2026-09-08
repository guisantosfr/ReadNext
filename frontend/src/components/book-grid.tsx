import { BookOpen, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Button } from "./ui/button"
import { ProcessedBook } from "@/types/ProcessedBook"
import { BookStatus } from "@/types/BookStatus"
import { toast } from "sonner"

interface BookGridProps {
  books: ProcessedBook[]
  onBookUpdate?: (bookId: string, newStatus: BookStatus) => void
  onBookRemove?: (bookId: string) => void
}

export default function BookGrid({books, onBookUpdate, onBookRemove}: BookGridProps) {
    const getStatusBadge = (status: BookStatus) => {
        const variants = {
            to_read: { variant: "outline" as const, label: "Para ler" },
            reading: { variant: "default" as const, label: "Lendo" },
            read: { variant: "secondary" as const, label: "Lido" },
            dropped: { variant: "destructive" as const, label: "Descartado" },
        }
        return variants[status as keyof typeof variants] || variants.reading
    }

    const updateBookStatus = async (bookId: string, status: BookStatus) => {
        const body = {
            id: bookId,
            status: status,
        } 

        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/books`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error("Failed to update book status")
        }

        if(response.status === 200){
            onBookUpdate?.(bookId, status)
        }
    }

    const removeBook = async (bookId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/books/${bookId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Failed to remove book")
        }

        if(response.status === 200){
            toast.success('Livro removido com sucesso da biblioteca')
            onBookRemove?.(bookId)
        }
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum livro encontrado</h3>
                <p className="text-muted-foreground">Adicione alguns livros à sua biblioteca</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book: any) => {
                const statusInfo = getStatusBadge(book.status)
                return (
                    <Card key={book.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="aspect-[4/5] mb-4 overflow-hidden rounded-md">
                                <img
                                    src={book.cover || "/placeholder.svg"}
                                    alt={`Capa do livro ${book.title}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                            <CardDescription>{book.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-3">
                                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                                <Badge variant="outline">{book.genre}</Badge>
                            </div>

                            <div className="mb-4">
                                <Select value={book.status} onValueChange={(value) => updateBookStatus(book.id, value as BookStatus)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="to_read">Para ler</SelectItem>
                                        <SelectItem value="reading">Em andamento</SelectItem>
                                        <SelectItem value="read">Lido</SelectItem>
                                        <SelectItem value="dropped">Descartado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Link href={`library/book/${book.id}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ver
                                    </Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={() => removeBook(book.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
