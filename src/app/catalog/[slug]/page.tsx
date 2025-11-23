import { ProductCard } from "@/components/catalog/product-card"
import { Product } from "@/types"
import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { ProductFilters } from "@/components/catalog/filters"
import { ProductSort } from "@/components/catalog/sort"
import { SearchBar } from "@/components/shared/search-bar"

// Mock Products
const products: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `p-${i}`,
  name: `Товар в категории ${i + 1}`,
  price: 1000 + i * 100,
  oldPrice: i % 3 === 0 ? 1500 + i * 100 : undefined,
  image: "🐕",
  rating: 4.5,
  reviewsCount: 10 + i,
  badge: i === 0 ? "new" : i === 1 ? "sale" : undefined,
  inStock: true,
}))

const categoryNames: Record<string, string> = {
  dogs: "Собаки",
  cats: "Кошки",
  birds: "Птицы",
  rodents: "Грызуны",
  fish: "Рыбы",
  pharmacy: "Ветаптека",
  sale: "Акции и скидки"
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const title = categoryNames[slug] || "Категория"

  return (
    <div className="container mx-auto py-8">
      <div className="hidden md:block">
        <CustomBreadcrumb />
      </div>

      {/* Mobile Header Area */}
      <div className="md:hidden mb-6 space-y-4">
         <div className="flex gap-2 items-center">
            <div className="flex-1">
               <SearchBar />
            </div>
            <ProductFilters />
         </div>
         <div className="w-full">
            <ProductSort />
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 pr-6 sticky top-24 h-fit">
          <h2 className="font-semibold mb-4 text-lg">Фильтры</h2>
          <ProductFilters />
        </aside>
        
        <div className="flex-1">
           <div className="mb-6 space-y-4">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <h1 className="text-3xl font-bold">{title}</h1>
               <div className="flex items-center gap-4 hidden md:flex">
                 <span className="text-sm text-muted-foreground">Найдено {products.length} товаров</span>
                 <ProductSort />
               </div>
             </div>
             
             {/* Mobile Filters (Removed as moved to top) */}
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {products.map(p => (
               <ProductCard key={p.id} product={p} />
             ))}
           </div>
           
           {/* Pagination Mock */}
           <div className="mt-8 flex justify-center">
             <div className="flex gap-2">
               <Button variant="default" size="sm">1</Button>
               <Button variant="outline" size="sm">2</Button>
               <Button variant="outline" size="sm">3</Button>
               <span className="px-2 py-1">...</span>
               <Button variant="outline" size="sm">10</Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}



