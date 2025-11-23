"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from "@/types"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)
  const { toggleItem, hasItem } = useWishlistStore()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsWishlisted(hasItem(product.id))
  }, [hasItem, product.id])

  // Update local state when store changes (if needed for direct reactivity)
  useEffect(() => {
    if (mounted) {
      setIsWishlisted(hasItem(product.id))
    }
  }, [hasItem, product.id, mounted, useWishlistStore.getState().items])


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast.success("Товар добавлен в корзину", {
      description: product.name,
      action: {
        label: "В корзину",
        onClick: () => window.location.href = '/cart'
      }
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    const newState = !isWishlisted
    setIsWishlisted(newState)
    toast.success(newState ? "Добавлено в избранное" : "Удалено из избранного")
  }

  return (
    <Card className="h-full flex flex-col group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl island-card relative">
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={product.name} />
      
      <div className="relative aspect-square bg-secondary/30 p-4 flex items-center justify-center overflow-hidden rounded-t-2xl">
         {product.badge && (
            <Badge 
              variant={product.badge === 'sale' ? 'destructive' : 'secondary'} 
              className="absolute top-3 left-3 z-20 shadow-sm pointer-events-none"
            >
              {product.badge === 'new' && 'Новинка'}
              {product.badge === 'sale' && 'Скидка'}
              {product.badge === 'bestseller' && 'Хит'}
            </Badge>
         )}
         <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "absolute top-2 right-2 z-20 transition-all duration-200 hover:scale-110",
              isWishlisted ? "text-red-500 opacity-100 bg-white/80 shadow-sm" : "opacity-0 group-hover:opacity-100 bg-white/50 hover:bg-white text-muted-foreground hover:text-red-500"
            )}
            onClick={handleToggleWishlist}
         >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
         </Button>
         <div className="text-6xl group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none">
            {product.image && product.image.startsWith('/') ? '🐕' : product.image}
         </div>
      </div>
      <CardContent className="flex-1 p-5 space-y-3 pointer-events-none">
        <div className="flex items-center gap-1">
           <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
           <span className="text-xs font-medium text-muted-foreground">{product.rating} ({product.reviewsCount})</span>
        </div>
        <h3 className="font-semibold text-base leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-bold text-xl text-foreground">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through decoration-destructive/50">{product.oldPrice} ₽</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 relative z-20">
        <Button className="w-full gap-2 rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5" size="default" onClick={handleAddToCart}>
           <ShoppingCart className="h-4 w-4" />
           В корзину
        </Button>
      </CardFooter>
    </Card>
  )
}
