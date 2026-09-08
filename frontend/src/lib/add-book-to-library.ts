import { ProcessedBook } from "@/types/ProcessedBook"
import { toast } from "sonner"

export const addBookToLibrary = async (book: ProcessedBook) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...book }),
        })

        if (response.ok) {
            // Success - book added
            const data = await response.json().catch(() => ({}))
            toast.success(data.message || 'Livro adicionado com sucesso')

        } else if (response.status === 409) {

            // Book already exists in library
            const data = await response.json()
            toast.warning(data.message || 'Livro já existe na biblioteca')

        } else {
            // Other error status codes
            toast.error('Erro ao adicionar livro. Tente novamente mais tarde.')
            throw new Error('Erro ao adicionar livro')
        }

    } catch (error: any) {
        console.error('Erro ao adicionar livro:', error.message)
        // Optional: Show error message to user
        // You might want to show a toast notification or alert here
        toast.error('Erro ao adicionar livro. Tente novamente mais tarde.')
    }
}