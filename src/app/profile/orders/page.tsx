import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: "12345", date: "23.11.2025", status: "delivered", total: 4500, items: 3 },
  { id: "12346", date: "20.11.2025", status: "processing", total: 1200, items: 1 },
  { id: "12347", date: "15.11.2025", status: "cancelled", total: 3000, items: 2 },
]

const statusMap: Record<string, { label: string, color: "default" | "secondary" | "destructive" | "outline" }> = {
  delivered: { label: "Доставлен", color: "default" },
  processing: { label: "В обработке", color: "secondary" },
  cancelled: { label: "Отменен", color: "destructive" },
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Мои заказы</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Заказ #{order.id} от {order.date}
              </CardTitle>
              <Badge variant={statusMap[order.status].color as any}>
                {statusMap[order.status].label}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-muted-foreground">
                  {order.items} товара на сумму <span className="font-bold text-foreground">{order.total} ₽</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/profile/orders/${order.id}`}>Подробнее</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}



