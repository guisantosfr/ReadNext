'use client'

import { ProcessedBook } from "@/types/ProcessedBook";
import { Card, CardContent } from "./ui/card";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { addBookToLibrary } from "@/lib/add-book-to-library";
import { useRouter } from "next/navigation";

export default function AddToLibraryCard({book}: {book: ProcessedBook}) {
  const router = useRouter();

  const handleAddToLibrary = async () => {
    await addBookToLibrary(book);

    //redirect to previous page
    router.back();
  }


  return (
    <Card>
      <CardContent className="p-3 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Para ver recomendações personalizadas baseadas neste livro, adicione-o à sua biblioteca primeiro.
        </p>
        <Button onClick={handleAddToLibrary}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar à Biblioteca
        </Button>
      </CardContent>
    </Card>
  )
}