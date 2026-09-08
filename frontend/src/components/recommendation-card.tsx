'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { BookOpen, Trash2 } from "lucide-react"
import { Recommendation } from "@/types/Recommendation"
import { toast } from "sonner"

interface RecommendationCardProps {
  rec: Recommendation
  onBookRemove?: (bookId: string) => void
}

export default function RecommendationCard({rec, onBookRemove} : RecommendationCardProps){
    
    const removeBook = async (bookId: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommendations/${bookId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            throw new Error("Failed to remove book")
        }

        toast.success('Recomendação removida com sucesso')
        onBookRemove?.(bookId)
    }

    return (
        <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{rec.title}</CardTitle>
                <CardDescription>{rec.author}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Recomendado baseado em:</p>
                    <Badge variant="outline" className="text-xs px-3">
                      {rec.recommendedFromTitle}
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => removeBook(rec.id || "")} >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
    )
}