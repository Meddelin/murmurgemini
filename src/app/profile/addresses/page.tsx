import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react"

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Адреса доставки</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary">
          <CardContent className="pt-6 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <div className="font-medium">Дом</div>
                <div className="text-sm text-muted-foreground">г. Москва, ул. Пушкина, д. 10, кв. 5</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant="outline" className="h-auto min-h-[100px] border-dashed flex flex-col gap-2">
          <Plus className="h-6 w-6" />
          Добавить адрес
        </Button>
      </div>
    </div>
  )
}



