"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Вы успешно вошли!")
    // Mock redirect
    window.location.href = '/profile'
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Вход</CardTitle>
        <CardDescription className="text-center">
          Введите email и пароль для входа
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
               <Label htmlFor="password">Пароль</Label>
               <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">
                 Забыли пароль?
               </Link>
             </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Войти</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-muted-foreground text-center">
           Нет аккаунта? <Link href="/auth/register" className="text-primary hover:underline">Зарегистрироваться</Link>
        </div>
      </CardFooter>
    </Card>
  )
}



