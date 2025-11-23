"use client"

import Link from "next/link"
import { Heart, ShoppingCart, User, Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/shared/search-bar"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore(state => state.totalItems())
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setIsScrolled(false)
        setIsVisible(true)
      } else {
        setIsScrolled(true)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
           setIsVisible(false) // Hide on scroll down
        } else {
           setIsVisible(true) // Show on scroll up
        }
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header 
       className={cn(
         "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 py-2 px-4 md:px-8 hidden md:block",
         isVisible ? "translate-y-0" : "-translate-y-full",
       )}
    >
      <div className={cn(
         "mx-auto max-w-7xl rounded-2xl transition-all duration-300 flex h-16 items-center space-x-4 px-6 border",
         isScrolled 
            ? "bg-white/80 backdrop-blur-lg border-white/40 shadow-lg shadow-gray-200/50"
            : "bg-transparent border-transparent"
      )}>
        
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">MurmurGemini</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium pl-6">
          <Link href="/catalog" className="transition-colors hover:text-primary">
            Каталог
          </Link>
          <Link href="/catalog/dogs" className="transition-colors hover:text-primary">
            Собакам
          </Link>
          <Link href="/catalog/cats" className="transition-colors hover:text-primary">
            Кошкам
          </Link>
        </nav>

        <div className="flex-1 flex items-center justify-end md:justify-start space-x-2 md:pl-8">
           <div className="w-full max-w-sm hidden md:block">
             <SearchBar />
           </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-1 text-sm font-medium pr-4">
            <Phone className="h-4 w-4 text-primary" />
            <span>8 800 123-45-67</span>
          </div>
          
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Избранное" className="hidden sm:flex hover:bg-primary/10 hover:text-primary">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Корзина" className="relative hover:bg-primary/10 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-[10px] text-primary-foreground hover:bg-primary shadow-sm">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link href="/profile">
            <Button variant="ghost" size="icon" aria-label="Профиль" className="hover:bg-primary/10 hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

