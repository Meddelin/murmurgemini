"use client"

import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const reviews = [
  { id: 1, user: "Анна", date: "20.11.2025", rating: 5, text: "Отличный корм, собака ест с удовольствием!", likes: 12, dislikes: 0 },
  { id: 2, user: "Петр", date: "18.11.2025", rating: 4, text: "Хороший, но упаковка была помята.", likes: 3, dislikes: 1 },
]

export function ReviewList() {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center gap-4 mb-2">
            <Avatar>
              <AvatarFallback>{review.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{review.user}</div>
              <div className="text-sm text-muted-foreground">{review.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
            ))}
          </div>
          <p className="mb-4">{review.text}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" /> Полезно ({review.likes})
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsDown className="h-4 w-4" /> Не полезно ({review.dislikes})
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}



