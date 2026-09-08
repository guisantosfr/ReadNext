'use client'

import { useState, useEffect } from "react"
import { Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Recommendation } from "@/types/Recommendation"
import RecommendationCard from "@/components/recommendation-card"

interface SavedRecommendationsListProps {
  initialRecommendations: Recommendation[]
}

export default function SavedRecommendationsList({ initialRecommendations }: SavedRecommendationsListProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations)

  const handleBookRemove = (bookId: string) => {
    setRecommendations(prev => prev.filter(book => book.id !== bookId))
  }

  return (
    <>
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={rec.id || index} rec={rec} onBookRemove={handleBookRemove} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma recomendação salva</h3>
          <p className="text-muted-foreground mb-6">Explore livros e salve recomendações para ler depois</p>
          <Link href="/">
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Explorar Livros
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}