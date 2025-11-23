"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Heart, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { useState, useEffect } from "react"

export function MobileNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore(state => state.totalItems())

  useEffect(() => setMounted(true), [])

  const items = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/catalog", label: "Каталог", icon: LayoutGrid },
    { href: "/wishlist", label: "Избранное", icon: Heart },
    { href: "/cart", label: "Корзина", icon: ShoppingCart, badge: totalItems },
    { href: "/profile", label: "Профиль", icon: User },
  ]

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <nav className="flex h-16 items-center justify-around rounded-2xl bg-white/80 backdrop-blur-lg border border-white/40 shadow-lg shadow-gray-200/50 px-2">
        {items.map((item) => {
          const isActive = item.href === "/" 
             ? pathname === "/" 
             : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all duration-200 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10"
              )}>
                <item.icon className={cn("h-5 w-5 transition-transform duration-200", isActive && "scale-110")} />
                {item.badge !== undefined && item.badge > 0 && mounted && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white shadow-sm animate-in zoom-in">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

