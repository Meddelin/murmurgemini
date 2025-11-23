import { ProductCard } from "@/components/catalog/product-card"
import { Product } from "@/types"
import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"
import { Button } from "@/components/ui/button"
import { ProductFilters } from "@/components/catalog/filters"
import { ProductSort } from "@/components/catalog/sort"
import { SearchBar } from "@/components/shared/search-bar"

// Mock Products
const products: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `p-${i}`,
  name: `Товар для питомца ${i + 1}`,
  price: 1000 + i * 100,
  oldPrice: i % 3 === 0 ? 1500 + i * 100 : undefined,
  image: "🐕",
  rating: 4.5 + (i % 5) * 0.1,
  reviewsCount: 10 + i,
  badge: i === 0 ? "new" : i === 1 ? "sale" : undefined,
  inStock: true,
  brand: ["Royal Canin", "Purina", "Monge"][i % 3],
  category: ["Корма", "Игрушки"][i % 2]
} as any))

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const minPrice = Number(params.minPrice) || 0
  const maxPrice = Number(params.maxPrice) || 20000
  const categories = Array.isArray(params.category) ? params.category : params.category ? [params.category] : []
  const brands = Array.isArray(params.brand) ? params.brand : params.brand ? [params.brand] : []
  const inStock = params.inStock === 'true'
  const sort = params.sort || 'popular'

  let filteredProducts = products.filter(p => {
    if (p.price < minPrice || p.price > maxPrice) return false
    if (categories.length > 0 && !(categories as string[]).includes((p as any).category)) return false
    if (brands.length > 0 && !brands.includes(p.brand || '')) return false
    if (inStock && !p.inStock) return false
    return true
  })

  // Apply Sorting
  filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'popular':
      default:
        return b.reviewsCount - a.reviewsCount
    }
  })

  return (
    <div className="container py-8">
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
           <div className="mb-6 space-y-4 hidden md:block">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <h1 className="text-3xl font-bold">Каталог товаров</h1>
               <div className="flex items-center gap-4 hidden md:flex">
                 <span className="text-sm text-muted-foreground">Найдено {filteredProducts.length} товаров</span>
                 <ProductSort />
               </div>
             </div>
           </div>
           
           {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredProducts.map(p => (
                 <ProductCard key={p.id} product={p} />
               ))}
             </div>
           ) : (
             <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
               <p className="text-muted-foreground">Товары не найдены. Попробуйте изменить фильтры.</p>
             </div>
           )}
           
           {/* Pagination Mock */}
           <div className="mt-8 flex justify-center">
             <div className="flex gap-2">
               <Button variant="default" size="sm">1</Button>
               <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">2</Button>
               <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">3</Button>
               <span className="px-2 py-1">...</span>
               <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">10</Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
