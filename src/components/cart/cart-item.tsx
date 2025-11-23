"use client"

import { CartItem as CartItemType } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 border-b border-dashed border-muted-foreground/20 last:border-none group relative">
      <div className="h-24 w-24 flex-shrink-0 bg-white rounded-2xl flex items-center justify-center text-5xl overflow-hidden border border-muted shadow-sm group-hover:scale-105 transition-transform duration-300">
        {item.image}
      </div>
      <div className="flex-1 space-y-2 w-full sm:w-auto">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
        <div className="text-sm text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md inline-block">Артикул: {item.id}</div>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8 mt-2 sm:mt-0">
        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-secondary-foreground/10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-lg bg-white shadow-sm hover:bg-white/80 hover:text-primary transition-colors"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input 
            type="number" 
            value={item.quantity} 
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="h-8 w-12 text-center px-0 border-none bg-transparent focus-visible:ring-0 font-bold text-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={1}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-lg bg-white shadow-sm hover:bg-white/80 hover:text-primary transition-colors"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex flex-col items-end gap-1 min-w-[100px] h-12 justify-center">
          <span className="font-bold text-xl leading-none">{item.price * item.quantity} ₽</span>
          <div className="h-4 text-xs text-muted-foreground flex items-center">
            {item.quantity > 1 && (
                <span>{item.price} ₽ / шт</span>
            )}
          </div>
        </div>
        <Button 
           variant="ghost" 
           size="icon" 
           className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-9 w-9 rounded-xl sm:ml-2 transition-colors"
           onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
