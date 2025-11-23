import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Заказ #{params.id}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Информация о заказе</CardTitle>
            <Badge>Доставлен</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid grid-cols-2 gap-4 text-sm">
             <div>
               <div className="text-muted-foreground">Дата оформления</div>
               <div className="font-medium">23.11.2025</div>
             </div>
             <div>
               <div className="text-muted-foreground">Способ оплаты</div>
               <div className="font-medium">Карта (ЮKassa)</div>
             </div>
             <div>
               <div className="text-muted-foreground">Доставка</div>
               <div className="font-medium">Курьером, ул. Пушкина, д. 10</div>
             </div>
             <div>
               <div className="text-muted-foreground">Получатель</div>
               <div className="font-medium">Иван Иванов</div>
             </div>
           </div>
           
           <Separator />
           
           <div className="space-y-4">
             <div className="font-medium">Товары</div>
             {[1, 2, 3].map(i => (
               <div key={i} className="flex justify-between text-sm">
                 <div className="flex gap-4">
                   <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">🐕</div>
                   <div>
                     <div className="font-medium">Товар {i}</div>
                     <div className="text-muted-foreground">1 шт</div>
                   </div>
                 </div>
                 <div className="font-bold">1500 ₽</div>
               </div>
             ))}
           </div>
           
           <Separator />
           
           <div className="flex justify-between font-bold text-lg">
             <span>Итого</span>
             <span>4500 ₽</span>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}



