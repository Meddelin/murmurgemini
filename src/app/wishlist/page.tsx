"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/catalog/product-card"
import { useWishlistStore } from "@/store/wishlist-store"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { toast } from "sonner"
import { ShoppingCart, Trash2 } from "lucide-react"

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()
  const addItemToCart = useCartStore(state => state.addItem)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleAddAllToCart = () => {
    items.forEach(item => addItemToCart(item))
    toast.success(`Добавлено ${items.length} товаров в корзину`)
  }

  const handleClearWishlist = () => {
    if (confirm("Вы уверены, что хотите очистить список избранного?")) {
      clearWishlist()
      toast.success("Список избранного очищен")
    }
  }

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold">Избранное</h1>
            <p className="text-muted-foreground mt-1">
              {items.length > 0 
                ? `У вас ${items.length} товаров в избранном` 
                : "Сохраняйте товары, чтобы не потерять их"}
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClearWishlist} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Очистить</span>
              </Button>
              <Button onClick={handleAddAllToCart} className="gap-2 shadow-lg shadow-primary/20">
                <ShoppingCart className="h-4 w-4" />
                Добавить все в корзину
              </Button>
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-muted-foreground/25">
            <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4 text-4xl">
               💔
            </div>
            <h3 className="text-lg font-semibold mb-2">Список избранного пуст</h3>
            <p className="text-muted-foreground max-w-xs text-center mb-6">
              Добавляйте товары, нажимая на сердечко в каталоге или карточке товара
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/catalog'}>
              Перейти в каталог
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
