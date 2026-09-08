'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { ProcessedBook } from "@/types/ProcessedBook"
import { addBookToLibrary } from "@/lib/add-book-to-library"

export default function BookCard(book: ProcessedBook) {

    return (
        <Card key={book.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
                <div className="aspect-[4/5] mb-4 overflow-hidden rounded-md bg-gray-100">
                    {
                        book.cover ?
                            <img
                                src={book.cover}
                                alt={`Capa do livro ${book.title}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            :
                            <div className="w-full h-full object-cover">
                                Capa não encontrada
                            </div>
                    }
                </div>
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="line-clamp-1">{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Link href={`/book/${book.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                            Ver Detalhes
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => addBookToLibrary(book)}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}