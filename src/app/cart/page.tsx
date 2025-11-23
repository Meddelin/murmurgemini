"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { CartItem } from "@/components/cart/cart-item"
import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"
import { ShoppingBag, ArrowRight, Tag } from "lucide-react"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="container py-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="h-32 w-32 rounded-full bg-orange-50 flex items-center justify-center animate-in zoom-in duration-500">
          <ShoppingBag className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Корзина пуста</h1>
        <p className="text-muted-foreground max-w-md">
          Посмотрите наш каталог, там много интересного для вашего питомца.
        </p>
        <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/20">
          <Link href="/catalog">Перейти к покупкам</Link>
        </Button>
      </div>
    )
  }

  const subtotal = totalPrice()
  const discount = 0 // Mock discount
  const delivery = subtotal > 3000 ? 0 : 300 // Mock delivery logic
  const total = subtotal - discount + delivery

  return (
    <div className="container py-8">
      <CustomBreadcrumb items={[
         { label: "Каталог", href: "/catalog" },
         { label: "Корзина", href: "/cart" }
       ]} />
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card overflow-hidden">
            <div className="p-6 md:p-8 space-y-4">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card p-6 space-y-6">
            <h2 className="text-xl font-bold">Итого</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({items.reduce((acc, i) => acc + i.quantity, 0)})</span>
                <span className="font-medium">{subtotal} ₽</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Скидка</span>
                  <span>-{discount} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className="font-medium text-green-600">{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
              </div>
              
              <Separator className="bg-muted-foreground/10" />
              
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">К оплате</span>
                <span className="font-bold text-2xl text-primary">{total} ₽</span>
              </div>
              
              {/* Promo Code - US-007 */}
              <div className="pt-2">
                <div className="relative flex items-center">
                   <Tag className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                   <Input placeholder="Промокод" className="pl-9 pr-24 bg-white/50 border-muted-foreground/20 rounded-xl" />
                   <Button variant="ghost" size="sm" className="absolute right-1 h-8 text-primary hover:text-primary hover:bg-primary/10">Применить</Button>
                </div>
              </div>
            </div>

            <Button className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" size="lg" asChild>
              <Link href="/checkout">
                 Оформить заказ <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
               Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
