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
            TO_READ: { variant: "outline" as const, label: "Para ler" },
            READING: { variant: "default" as const, label: "Lendo" },
            READ: { variant: "secondary" as const, label: "Lido" },
            DROPPED: { variant: "destructive" as const, label: "Descartado" },
        }
        return variants[status] || variants.READING
    }

    const updateBookStatus = async (bookId: string, status: BookStatus) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}/status?status=${status}`, {
            method: "PATCH",
        })

        if (!response.ok) {
            throw new Error("Failed to update book status")
        }

        onBookUpdate?.(bookId, status)
    }

    const removeBook = async (bookId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Failed to remove book")
        }

        toast.success('Livro removido com sucesso da biblioteca')
        onBookRemove?.(bookId)
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
                                        <SelectItem value="TO_READ">Para ler</SelectItem>
                                        <SelectItem value="READING">Em andamento</SelectItem>
                                        <SelectItem value="READ">Lido</SelectItem>
                                        <SelectItem value="DROPPED">Descartado</SelectItem>
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
