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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)

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
          <TabsTrigger value="TO_READ">Para ler ({getBooksByStatus("TO_READ").length})</TabsTrigger>
          <TabsTrigger value="READING">Em andamento ({getBooksByStatus("READING").length})</TabsTrigger>
          <TabsTrigger value="READ">Lidos ({getBooksByStatus("READ").length})</TabsTrigger>
          <TabsTrigger value="DROPPED">Descartados ({getBooksByStatus("DROPPED").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <BookGrid
            books={books}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="TO_READ" className="mt-6">
          <BookGrid
            books={getBooksByStatus("TO_READ")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="READING" className="mt-6">
          <BookGrid
            books={getBooksByStatus("READING")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="READ" className="mt-6">
          <BookGrid
            books={getBooksByStatus("READ")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>

        <TabsContent value="DROPPED" className="mt-6">
          <BookGrid
            books={getBooksByStatus("DROPPED")}
            onBookUpdate={handleBookUpdate}
            onBookRemove={handleBookRemove}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
