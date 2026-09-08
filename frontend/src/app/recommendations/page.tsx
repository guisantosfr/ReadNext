import { ArrowLeft, Heart, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Recommendation } from "@/types/Recommendation"
import SavedRecommendationsList from "@/components/saved-recommendations-list"
import ExportButton from '@/components/export-button';

export default async function RecommendationsPage() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/recommendations`)
  let recommendations: Recommendation[] = await data.json()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8" />
            Recomendações Salvas
          </h1>
          <p className="text-muted-foreground">Livros que você marcou para ler depois</p>
        </div>

        <ExportButton />

        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      <SavedRecommendationsList initialRecommendations={recommendations} />
    </div>
  )
}
