'use client'

import { useEffect, useState, useRef } from "react"
import { Recommendation } from "@/types/Recommendation"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface RecommendationsContainerProps {
    bookId: string
    bookTitle: string
    bookAuthor: string
}

export default function RecommendationsList({ 
    bookId,
    bookTitle, 
    bookAuthor 
}: RecommendationsContainerProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
    const fetchedKeyRef = useRef<string>("")

    useEffect(() => {
        const key = `${bookTitle}-${bookAuthor}`
        if (fetchedKeyRef.current === key) {
            return
        }
        fetchedKeyRef.current = key

        async function fetchRecommendations() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommendations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: bookTitle,
                        author: bookAuthor,
                        summary: `${bookTitle} de ${bookAuthor}`
                    }),
                })

                if (!response.ok) {
                    throw new Error('Erro ao buscar recomendações')
                }

                const data = await response.json()
                const list = data.recommendations || data.data || (Array.isArray(data) ? data : [])
                
                const parsedRecommendations: Recommendation[] = list.map((item: any) => ({
                    ...item,
                    description: Array.isArray(item.description)
                        ? item.description
                        : [item.summary || item.description || '', item.reason || '']
                }))

                setRecommendations(parsedRecommendations)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido')
            } finally {
                setLoading(false)
            }
        }

        fetchRecommendations()
    }, [bookTitle, bookAuthor])

    const toggleExpanded = (index: number) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev)
            if (newSet.has(index)) {
                newSet.delete(index)
            } else {
                newSet.add(index)
            }
            return newSet
        })
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Gerando recomendações personalizadas...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive mb-4">Erro ao carregar recomendações</p>
                <p className="text-muted-foreground text-sm">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    Tentar novamente
                </button>
            </div>
        )
    }

    const saveRecommendation = async (rec: Recommendation) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: rec.title,
                    author: rec.author,
                    description: Array.isArray(rec.description) ? rec.description.join(' ') : (rec.summary || rec.description || ''),
                    genre: rec.genre || 'Sem categoria',
                    status: 'TO_READ',
                    recommendedFromId: bookId
                }),
            })

            if (response.ok) {
                const data = await response.json().catch(() => ({}))
                toast.success(data.message || 'Recomendação salva com sucesso!')
            } else {
                toast.error('Erro ao adicionar recomendação. Tente novamente mais tarde.')
                throw new Error('Erro ao adicionar recomendação')
            }
        } catch (error: any) {
            console.error('Erro ao adicionar recomendação:', error.message)
            toast.error('Erro ao adicionar recomendação. Tente novamente mais tarde.')
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl line-clamp-2">{rec.title}</CardTitle>
                            <CardDescription className="text-base">{rec.author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-md text-muted-foreground space-y-2">
                                        <p>{Array.isArray(rec.description) ? rec.description[0] : (rec.summary || rec.description)}</p>
                                        
                                        {/* Segundo parágrafo - só mostra se expandido */}
                                        {expandedCards.has(index) && Array.isArray(rec.description) && rec.description[1] && (
                                            <p className="animate-in fade-in duration-200">
                                                {rec.description[1]}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* Botão Ver mais/Ver menos - só mostra se tem segundo parágrafo */}
                                    {Array.isArray(rec.description) && rec.description[1] && (
                                        <button
                                            onClick={() => toggleExpanded(index)}
                                            className="text-md text-primary hover:text-primary/80 flex items-center gap-1 mt-3 transition-colors"
                                        >
                                            {expandedCards.has(index) ? (
                                                <>
                                                    Ver menos
                                                    <ChevronUp className="h-4 w-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Ver mais
                                                    <ChevronDown className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button size="sm" variant="outline" onClick={() => saveRecommendation(rec)}>
                                        <Heart className="h-4 w-4 mr-2" />
                                        Salvar Recomendação
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

    )
}