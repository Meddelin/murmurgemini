"use client"

import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { Product } from "@/types"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)
  const { toggleItem, hasItem } = useWishlistStore()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsWishlisted(hasItem(product.id))
  }, [hasItem, product.id])

  const handleAddToCart = () => {
    addItem(product)
    toast.success("Товар добавлен в корзину", {
       description: product.name,
       action: {
        label: "В корзину",
        onClick: () => window.location.href = '/cart'
      }
    })
  }

  const handleToggleWishlist = () => {
    toggleItem(product)
    const newState = !isWishlisted
    setIsWishlisted(newState)
    toast.success(newState ? "Добавлено в избранное" : "Удалено из избранного")
  }

  return (
    <div className="flex gap-4 pt-4">
      <Button size="lg" className="flex-1 text-lg h-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" onClick={handleAddToCart}>
        В корзину
      </Button>
      <Button 
        size="icon" 
        variant="outline" 
        className={cn(
          "h-12 w-12 rounded-xl border-2 transition-all hover:scale-105",
          isWishlisted ? "border-red-200 bg-red-50 text-red-500" : "hover:border-primary/50"
        )}
        onClick={handleToggleWishlist}
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
      </Button>
      <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl hover:bg-secondary/50">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  )
}

