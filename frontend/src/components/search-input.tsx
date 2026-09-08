'use client'

import { useDebounce } from "@/lib/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input"

export default function SearchInput() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
    }, [debouncedSearch]);

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Pesquisar livros por título ou autor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
            />
        </div>
    )

}