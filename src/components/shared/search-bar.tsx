"use client"

import * as React from "react"
import { Search, PawPrint } from "lucide-react"
import { useRouter } from "next/navigation"
import { usePetStore } from "@/store/pet-store"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { pets } = usePetStore()
  
  const [selectedPetId, setSelectedPetId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const handleSearch = (query: string) => {
    let url = `/catalog?q=${query}`
    if (selectedPetId) {
       const pet = pets.find(p => p.id === selectedPetId)
       if (pet) {
          // Add pet-specific filters
          if (pet.type === 'dog') url += `&category=Собакам`
          if (pet.type === 'cat') url += `&category=Кошкам`
          // Could add more logic here for age/size recommendations
       }
    }
    router.push(url)
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Поиск товаров...</span>
        <span className="inline-flex lg:hidden">Поиск...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
           <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
           <input
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Поиск товаров..."
              onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                    handleSearch((e.target as HTMLInputElement).value)
                 }
              }}
           />
        </div>
        
        {pets.length > 0 && (
           <div className="flex gap-2 p-2 overflow-x-auto">
              {pets.map(pet => (
                 <Badge 
                   key={pet.id} 
                   variant={selectedPetId === pet.id ? "default" : "outline"}
                   className="cursor-pointer flex items-center gap-1 whitespace-nowrap"
                   onClick={() => setSelectedPetId(selectedPetId === pet.id ? null : pet.id)}
                 >
                    <PawPrint className="h-3 w-3" />
                    {pet.name}
                 </Badge>
              ))}
           </div>
        )}

        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup heading="История поиска">
            <CommandItem onSelect={() => handleSearch("корм")}>
               <span>корм для {selectedPetId ? 'питомца' : 'кошек'}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("игрушки")}>
               <span>игрушки</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Популярное">
            <CommandItem onSelect={() => handleSearch("Royal Canin")}>
              <span>Royal Canin</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSearch("Monge")}>
              <span>Monge</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

