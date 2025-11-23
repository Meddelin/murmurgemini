import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Check, Share2, Heart } from "lucide-react"
import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"
import { ProductCard } from "@/components/catalog/product-card"
import { ProductActions } from "@/components/product/product-actions"
import { ReviewList } from "@/components/reviews/review-list"
import { ReviewForm } from "@/components/reviews/review-form"

// Mock Product Data
const product: Product & { description: string; specs: { name: string; value: string }[] } = {
  id: "1",
  name: "Сухой корм Royal Canin для взрослых собак крупных пород, 15 кг",
  price: 4500,
  oldPrice: 5200,
  image: "🐕",
  rating: 4.8,
  reviewsCount: 124,
  badge: "bestseller",
  inStock: true,
  brand: "Royal Canin",
  description: "Полнорационный сухой корм для взрослых собак крупных пород (вес взрослой собаки от 26 до 44 кг) в возрасте от 15 месяцев до 5 лет.",
  specs: [
    { name: "Бренд", value: "Royal Canin" },
    { name: "Страна", value: "Франция/Россия" },
    { name: "Возраст", value: "Взрослые" },
    { name: "Порода", value: "Крупные" },
  ]
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="container py-8">
       <div className="hidden md:block">
          <CustomBreadcrumb items={[
            { label: "Каталог", href: "/catalog" },
            { label: "Собаки", href: "/catalog/dogs" },
            { label: product.name, href: `/product/${id}` }
          ]} />
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
         {/* Gallery */}
         <div className="space-y-4">
           <div className="aspect-square bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center text-9xl overflow-hidden relative group cursor-zoom-in border border-white/40 shadow-sm island-card">
              {product.image}
              {/* Mock Zoom Hint */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {product.badge && (
                 <Badge 
                   variant={product.badge === 'sale' ? 'destructive' : 'secondary'} 
                   className="absolute top-4 left-4 z-10 shadow-sm px-3 py-1 text-sm"
                 >
                   {product.badge === 'new' && 'Новинка'}
                   {product.badge === 'sale' && 'Скидка'}
                   {product.badge === 'bestseller' && 'Хит'}
                 </Badge>
              )}
           </div>
           <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="aspect-square bg-white/60 rounded-2xl cursor-pointer hover:ring-2 ring-primary transition-all border border-white/20 flex items-center justify-center text-2xl shadow-sm">
                 {product.image}
               </div>
             ))}
           </div>
         </div>

         {/* Info */}
         <div className="space-y-6">
           <div>
             <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{product.name}</h1>
             <div className="flex items-center gap-6 text-sm">
               <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
                 <Star className="fill-current w-4 h-4" />
                 <span className="ml-1 font-bold text-foreground text-base">{product.rating}</span>
               </div>
               <span className="text-muted-foreground hover:text-primary cursor-pointer underline-offset-4 hover:underline transition-all">{product.reviewsCount} отзывов</span>
               <span className="text-muted-foreground">Артикул: {id}</span>
             </div>
           </div>

           <div className="space-y-6 p-6 bg-white/60 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card">
             <div className="flex items-end gap-4">
               <span className="text-4xl font-bold text-foreground">{product.price} ₽</span>
               {product.oldPrice && (
                 <span className="text-xl text-muted-foreground line-through mb-1">{product.oldPrice} ₽</span>
               )}
               {product.oldPrice && (
                 <Badge variant="destructive" className="mb-2">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</Badge>
               )}
             </div>

             <div className="flex items-center gap-2 text-sm">
               {product.inStock ? (
                 <div className="flex items-center text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                   <Check className="w-4 h-4 mr-1" /> В наличии
                 </div>
               ) : (
                 <span className="text-muted-foreground bg-muted px-3 py-1 rounded-full">Нет в наличии</span>
               )}
             </div>

             {/* Options Mock */}
             <div className="space-y-3">
               <span className="font-medium text-sm text-muted-foreground">Вес упаковки:</span>
               <div className="flex flex-wrap gap-2">
                 <Button variant="default" className="rounded-xl shadow-md shadow-primary/20">15 кг</Button>
                 <Button variant="outline" className="rounded-xl bg-transparent border-muted-foreground/30 hover:bg-white/50">3 кг</Button>
               </div>
             </div>
             
             <ProductActions product={product} />
           </div>
           
           <div className="text-sm space-y-0 bg-white/40 rounded-xl border border-white/20 overflow-hidden">
             <div className="flex justify-between py-3 px-4 border-b border-white/20 hover:bg-white/40 transition-colors">
               <span className="text-muted-foreground">Бренд</span>
               <span className="font-medium">{product.brand}</span>
             </div>
             <div className="flex justify-between py-3 px-4 hover:bg-white/40 transition-colors">
               <span className="text-muted-foreground">Страна</span>
               <span>Франция</span>
             </div>
           </div>
         </div>
       </div>

       {/* Tabs */}
       <Tabs defaultValue="desc" className="mb-12">
         <TabsList className="w-full justify-start h-auto p-1.5 bg-muted/50 backdrop-blur-sm rounded-2xl overflow-x-auto mb-8 gap-2 border border-white/20">
           <TabsTrigger value="desc" className="rounded-xl px-8 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary data-[state=active]:scale-105 transition-all duration-300 hover:bg-white/50">Описание</TabsTrigger>
           <TabsTrigger value="specs" className="rounded-xl px-8 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary data-[state=active]:scale-105 transition-all duration-300 hover:bg-white/50">Характеристики</TabsTrigger>
           <TabsTrigger value="reviews" className="rounded-xl px-8 py-3 text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary data-[state=active]:scale-105 transition-all duration-300 hover:bg-white/50">Отзывы ({product.reviewsCount})</TabsTrigger>
         </TabsList>
         <TabsContent value="desc" className="p-8 md:p-10 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-sm island-card animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="prose max-w-none prose-lg text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground">
             <p className="leading-relaxed">{product.description}</p>
             <h3 className="text-xl font-bold mt-8 mb-6">Преимущества</h3>
             <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
               <li className="flex flex-col items-center text-center gap-4 p-6 bg-white/60 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0 shadow-inner">
                     <Check className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Здоровье костей и суставов</span>
               </li>
               <li className="flex flex-col items-center text-center gap-4 p-6 bg-white/60 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-inner">
                     <Check className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Высокая усвояемость</span>
               </li>
               <li className="flex flex-col items-center text-center gap-4 p-6 bg-white/60 rounded-3xl border border-white/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-inner">
                     <Check className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Поддержка иммунитета</span>
               </li>
             </ul>
           </div>
         </TabsContent>
         <TabsContent value="specs" className="p-8 md:p-10 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-sm island-card animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="max-w-4xl">
             <h3 className="text-2xl font-bold mb-8">Характеристики</h3>
             <div className="grid grid-cols-1 gap-y-4">
               {product.specs.map((spec, i) => (
                 <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-white/40 group">
                   <dt className="text-muted-foreground font-medium text-lg relative z-10 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                      {spec.name}
                   </dt>
                   <div className="hidden sm:block flex-1 mx-4 border-b-2 border-dotted border-muted-foreground/20 relative top-1" />
                   <dd className="font-bold text-xl text-foreground relative z-10">{spec.value}</dd>
                 </div>
               ))}
             </div>
           </div>
         </TabsContent>
         <TabsContent value="reviews" className="p-8 md:p-10 bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-sm island-card space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-2xl font-bold mb-6">Отзывы покупателей</h3>
           <ReviewList />
           <div className="bg-white/40 p-6 rounded-3xl border border-white/30">
              <h4 className="text-xl font-bold mb-4">Оставить отзыв</h4>
              <ReviewForm />
           </div>
         </TabsContent>
       </Tabs>

       {/* Related Products */}
       <section>
         <h2 className="text-2xl font-bold mb-6 pl-2">Похожие товары</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Mock Related */}
            {[1, 2, 3, 4].map(i => (
               <ProductCard key={i} product={{...product, id: `rel-${i}`, name: "Похожий товар"}} />
            ))}
         </div>
       </section>
    </div>
  )
}
