"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ProcessedBook } from "@/types/ProcessedBook"
import BookGrid from "@/components/book-grid"
import { BookStatus } from "@/types/BookStatus"

export default function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [books, setBooks] = useState<ProcessedBook[]>([])

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/books`)

      const books = await response.json()

      setBooks(books);
    }

    getBooks()
  }, [])

  const getBooksByStatus = (status: BookStatus) => books.filter((book) => book.status === status)

  const handleBookUpdate = (bookId: string, newStatus: BookStatus) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId
          ? { ...book, status: newStatus }
          : book
      )
    )
  }

  const handleBookRemove = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Minha Biblioteca</h1>
          <p className="text-muted-foreground">Gerencie seus livros lidos, em andamento e descartados</p>
        </div>
        <Link href="/">
          <Button variant="outline">Voltar à Pesquisa</Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos ({books.length})</TabsTrigger>
          <TabsTrigger value="to_read">Para ler ({getBooksByStatus("to_read").length})</TabsTrigger>
          <TabsTrigger value="reading">Em andamento ({getBooksByStatus("reading").length})</TabsTrigger>
          <TabsTrigger value="read">Lidos ({getBooksByStatus("read").length})</TabsTrigger>
          <TabsTrigger value="dropped">Descartados ({getBooksByStatus("dropped").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <BookGrid
            books={books}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="to_read" className="mt-6">
          <BookGrid
            books={getBooksByStatus("to_read")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="reading" className="mt-6">
          <BookGrid
            books={getBooksByStatus("reading")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          <BookGrid
            books={getBooksByStatus("read")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="dropped" className="mt-6">
          <BookGrid
            books={getBooksByStatus("dropped")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
