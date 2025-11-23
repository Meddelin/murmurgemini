import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Truck, ShieldCheck, RefreshCw, HeadphonesIcon } from "lucide-react"
import { ProductCard } from "@/components/catalog/product-card"
import { Product } from "@/types"

// Mock Data
const categories = [
  { name: "Собаки", image: "🐶", href: "/catalog/dogs" },
  { name: "Кошки", image: "🐱", href: "/catalog/cats" },
  { name: "Птицы", image: "🦜", href: "/catalog/birds" },
  { name: "Грызуны", image: "🐹", href: "/catalog/rodents" },
  { name: "Рыбы", image: "🐠", href: "/catalog/fish" },
  { name: "Аптека", image: "💊", href: "/catalog/pharmacy" },
]

const featuredProducts: Product[] = [
  { id: "1", name: "Royal Canin Maxi Adult", price: 4500, image: "🐕", badge: "new", rating: 4.8, reviewsCount: 124, inStock: true },
  { id: "2", name: "Pro Plan Sterilised", price: 3200, image: "🐈", badge: "sale", rating: 4.9, reviewsCount: 85, inStock: true, oldPrice: 3800 },
  { id: "3", name: "Monge Dog Mini", price: 1800, image: "🐕", badge: "bestseller", rating: 4.7, reviewsCount: 210, inStock: true },
  { id: "4", name: "Whiskas Tasty Mix", price: 85, image: "🐈", rating: 4.5, reviewsCount: 56, inStock: true },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-12 md:py-16">
        <div className="container flex flex-col items-center text-center md:flex-row md:text-left md:justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Новая коллекция игрушек
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground">
              Счастье вашего питомца — <span className="text-primary">наша забота</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Тысячи товаров для собак, кошек и других животных с быстрой доставкой по всей стране.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/catalog">
                  Перейти в каталог <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/catalog/sale">
                  Акции
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full max-w-sm md:max-w-md aspect-square bg-primary/10 rounded-full flex items-center justify-center text-9xl relative overflow-hidden">
             🐕
             {/* Placeholder for Hero Image */}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="flex flex-col items-center justify-center p-6 gap-4 text-center">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.image}</span>
                  <span className="font-semibold group-hover:text-primary transition-colors">{cat.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container space-y-8">
        <div className="flex items-center justify-between">
           <h2 className="text-3xl font-bold tracking-tight">Хиты продаж</h2>
           <Link href="/catalog" className="text-primary hover:underline">Все товары</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-primary/5 py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Быстрая доставка</h3>
            <p className="text-sm text-muted-foreground">Бесплатно от 3000 ₽ по всей России</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Гарантия качества</h3>
            <p className="text-sm text-muted-foreground">Только сертифицированные товары</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Простой возврат</h3>
            <p className="text-sm text-muted-foreground">14 дней на возврат без вопросов</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <HeadphonesIcon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg">Поддержка 24/7</h3>
            <p className="text-sm text-muted-foreground">Всегда готовы помочь с выбором</p>
          </div>
        </div>
      </section>
    </div>
  )
}
