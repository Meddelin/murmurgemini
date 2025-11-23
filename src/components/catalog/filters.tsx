"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useDebouncedCallback } from "use-debounce"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

function FilterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 10000
  ])
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  )

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.getAll("brand")
  )

  const [inStock, setInStock] = useState(
    searchParams.get("inStock") === "true"
  )

  const applyFilters = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())
    
    params.delete("category")
    selectedCategories.forEach(c => params.append("category", c))
    
    params.delete("brand")
    selectedBrands.forEach(b => params.append("brand", b))
    
    if (inStock) params.set("inStock", "true")
    else params.delete("inStock")

    router.push(`?${params.toString()}`, { scroll: false })
  }, 500)

  useEffect(() => {
    applyFilters()
  }, [priceRange, selectedCategories, selectedBrands, inStock, applyFilters])

  const handleReset = () => {
    setPriceRange([0, 10000])
    setSelectedCategories([])
    setSelectedBrands([])
    setInStock(false)
    router.push("?")
  }

  const toggleSelection = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item))
    } else {
      setList([...list, item])
    }
  }

  return (
    <div className="space-y-8">
      {/* Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="font-semibold text-sm">Цена</h3>
        </div>
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">от</span>
                <Input 
                    type="number" 
                    min={0} 
                    max={20000} 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} 
                    className="pl-8 h-9 bg-white/50 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
            </div>
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">до</span>
                <Input 
                    type="number" 
                    min={0} 
                    max={20000} 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
                    className="pl-8 h-9 bg-white/50 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
            </div>
        </div>
        <Slider
          defaultValue={[0, 10000]}
          max={20000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-2"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
         <h3 className="font-semibold text-sm">Категория</h3>
         <div className="space-y-2">
            {["Корма", "Лакомства", "Игрушки", "Одежда", "Миски"].map((cat) => (
               <div key={cat} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`cat-${cat}`} 
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleSelection(selectedCategories, setSelectedCategories, cat)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer hover:text-primary transition-colors">{cat}</Label>
               </div>
            ))}
         </div>
      </div>
      
      <div className="w-full h-px bg-border/50" />

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Бренд</h3>
        <div className="space-y-2">
          {["Royal Canin", "Purina", "Monge", "Grandorf", "Whiskas"].map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleSelection(selectedBrands, setSelectedBrands, brand)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer hover:text-primary transition-colors">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-border/50" />

      {/* Availability */}
      <div className="flex items-center space-x-3 py-1">
         <Checkbox 
            id="in-stock" 
            checked={inStock}
            onCheckedChange={(checked) => setInStock(checked as boolean)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
         />
         <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">Только в наличии</Label>
      </div>
      
      <Button variant="outline" className="w-full rounded-xl border-dashed hover:border-solid hover:bg-secondary/50 transition-all" size="sm" onClick={handleReset}>Сбросить фильтры</Button>
    </div>
  )
}

export function ProductFilters() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block space-y-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm island-card">
        <FilterContent />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-white/50 backdrop-blur-sm border-white/40">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl pt-6">
            <SheetHeader className="pb-4">
              <SheetTitle>Фильтры</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-full pb-20 px-1">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

