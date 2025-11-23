"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Ссылка для сброса отправлена на email")
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Сброс пароля</CardTitle>
        <CardDescription className="text-center">
          Введите email для получения ссылки
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <Button type="submit" className="w-full">Отправить ссылку</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-muted-foreground text-center">
           <Link href="/auth/login" className="text-primary hover:underline">Вернуться ко входу</Link>
        </div>
      </CardFooter>
    </Card>
  )
}



