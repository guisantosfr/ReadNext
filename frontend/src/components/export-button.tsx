'use client'

import { Button } from "@/components/ui/button"
import { FileSpreadsheetIcon } from 'lucide-react'

export default function ExportButton() {
    const exportData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export/excel`);
            const blob = await response.blob();

            // Criar URL temporária para download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dados.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Erro ao exportar:', err);
        }

    }

    return (
        <Button onClick={exportData}>
            <FileSpreadsheetIcon className="h-4 w-4 mr-2" />
            Exportar para Excel
        </Button>
    )
} 