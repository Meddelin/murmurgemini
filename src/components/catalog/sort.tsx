"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProductSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentSort = searchParams.get("sort") || "popular"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-full md:w-[180px] bg-white/50 backdrop-blur-sm border-white/40">
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">По популярности</SelectItem>
        <SelectItem value="price_asc">Сначала дешевле</SelectItem>
        <SelectItem value="price_desc">Сначала дороже</SelectItem>
        <SelectItem value="rating">По рейтингу</SelectItem>
      </SelectContent>
    </Select>
  )
}


