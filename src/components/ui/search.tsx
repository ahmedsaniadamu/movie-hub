import React, { useEffect, useState } from 'react'
import { Input } from './input'
import { Search, X } from 'lucide-react'

const SearchInput: React.FC<{
    placeHolder?: string,
    setSearch: (value: string) => void
}> = ({ placeHolder, setSearch }) => {

    const [searchInit, setSearchInit] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInit);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInit, setSearch]);

    return (
        <div className="relative w-full rounded-xl group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
            <Input
                value={searchInit}
                className="w-full pl-10 pr-10 h-11 bg-muted/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-brand transition-all"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchInit(e.target.value)
                }}
                type="search"
                placeholder={placeHolder}
            />
            {searchInit && (
                <button
                    onClick={() => setSearchInit('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    )
}

export default SearchInput
