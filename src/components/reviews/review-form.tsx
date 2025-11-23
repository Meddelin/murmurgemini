"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ReviewForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Отзыв отправлен на модерацию")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-muted/20 p-6 rounded-lg">
      <h3 className="font-medium">Оставить отзыв</h3>
      <div className="space-y-2">
        <Label>Оценка</Label>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <Button key={i} type="button" variant="ghost" size="icon" className="h-8 w-8 text-yellow-400 hover:text-yellow-500">★</Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Заголовок</Label>
        <Input id="title" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="text">Текст отзыва</Label>
        <Textarea id="text" />
      </div>
      <Button type="submit">Отправить</Button>
    </form>
  )
}



