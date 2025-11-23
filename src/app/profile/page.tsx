"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronRight, Package, Wallet, Ticket, Settings, Dog, MapPin, HelpCircle, ExternalLink, History, Heart } from "lucide-react"

export default function ProfilePage() {
  const menuItems = [
    { icon: Package, label: "Заказы", href: "/profile/orders" },
    { icon: History, label: "Купленные товары", href: "/profile/orders?filter=delivered" },
    { icon: Wallet, label: "Возвраты", href: "/profile/orders?filter=returns" },
    { icon: Heart, label: "Избранное", href: "/wishlist" },
  ]

  const benefitItems = [
    { icon: Ticket, label: "Промокоды", href: "/profile/promos" },
    { icon: ExternalLink, label: "Реферальная программа", href: "/profile/referral", special: true },
  ]
  
  const settingsItems = [
    { icon: Dog, label: "Мои питомцы", href: "/profile/pets" },
    { icon: MapPin, label: "Адреса доставки", href: "/profile/addresses" },
    { icon: Settings, label: "Настройки", href: "/profile/settings" },
    { icon: HelpCircle, label: "Поддержка", href: "/contacts" },
  ]

  return (
    <div className="max-w-2xl mx-auto pb-20 md:pb-0 space-y-8">
      
      {/* Header Profile Info */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
           <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-2xl font-bold">M</AvatarFallback>
           </Avatar>
           <div>
              <h1 className="text-2xl font-bold">Meddeli</h1>
              <p className="text-muted-foreground">+7 900 000-00-00</p>
           </div>
        </div>
      </div>

      {/* Purchases Section */}
      <div className="space-y-3">
         <h2 className="text-lg font-semibold px-1">Покупки</h2>
         <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden island-card">
            {menuItems.map((item, i) => (
               <Link key={item.href} href={item.href} className="flex items-center p-5 hover:bg-white/80 hover:shadow-md transition-all duration-300 border-b last:border-0 border-muted/50 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                  <div className="bg-primary/10 p-2 rounded-xl mr-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                     <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="flex-1 font-medium text-lg relative z-10">{item.label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 relative z-10" />
               </Link>
            ))}
         </div>
      </div>
      
      {/* Benefits Section */}
      <div className="space-y-3">
         <h2 className="text-lg font-semibold px-1">Выгода</h2>
         <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden island-card">
            {/* Banner */}
            <Link href="#" className="block p-5 bg-gradient-to-r from-orange-400 to-orange-600 text-white relative overflow-hidden">
               <div className="relative z-10 flex justify-between items-center">
                  <div>
                     <div className="font-bold text-xl mb-1">13 000 ₽</div>
                     <div className="text-sm opacity-90 font-medium">На Чёрную пятницу</div>
                  </div>
                  <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                     <ChevronRight className="h-6 w-6 text-white" />
                  </div>
               </div>
               {/* Decor */}
               <div className="absolute -bottom-4 -right-4 bg-white/10 w-24 h-24 rounded-full" />
               <div className="absolute -top-4 -left-4 bg-white/10 w-16 h-16 rounded-full" />
            </Link>
            
            {benefitItems.map((item, i) => (
               <Link key={item.href} href={item.href} className="flex items-center p-5 hover:bg-white/60 transition-colors border-b last:border-0 border-muted/50 group">
                  <div className="bg-blue-50 p-2 rounded-xl mr-6 group-hover:bg-blue-100 transition-colors">
                     <item.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <span className="flex-1 font-medium text-lg">{item.label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
               </Link>
            ))}
         </div>
      </div>

      {/* Settings Section */}
      <div className="space-y-3">
         <h2 className="text-lg font-semibold px-1">Настройки</h2>
         <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden island-card">
            {settingsItems.map((item, i) => (
               <Link key={item.href} href={item.href} className="flex items-center p-5 hover:bg-white/60 transition-colors border-b last:border-0 border-muted/50 group">
                  <div className="bg-gray-100 p-2 rounded-xl mr-6 group-hover:bg-gray-200 transition-colors">
                     <item.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className="flex-1 font-medium text-lg">{item.label}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
               </Link>
            ))}
         </div>
      </div>

      <div className="flex justify-center pt-6">
         <Button variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-auto py-2 px-6 rounded-xl">
            Выйти из аккаунта
         </Button>
      </div>
    </div>
  )
}
