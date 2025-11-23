"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"
import { useCartStore } from "@/store/cart-store"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Check, CreditCard, Truck, User, MapPin, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const deliverySchema = z.object({
  name: z.string().min(2, "Имя обязательно"),
  phone: z.string().min(10, "Телефон обязателен"),
  email: z.string().email("Некорректный email"),
  deliveryMethod: z.enum(["courier", "pickup"]),
  address: z.string().optional(),
  comment: z.string().optional(),
}).refine((data) => {
  if (data.deliveryMethod === "courier" && !data.address) return false
  return true
}, {
  message: "Адрес обязателен для доставки",
  path: ["address"],
})

type DeliveryFormData = z.infer<typeof deliverySchema>

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData | null>(null)
  const { items, totalPrice, clearCart } = useCartStore()
  
  useEffect(() => setMounted(true), [])

  const { register, handleSubmit, watch, formState: { errors } } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryMethod: "courier"
    }
  })

  const deliveryMethod = watch("deliveryMethod")

  const onDeliverySubmit = (data: DeliveryFormData) => {
    setDeliveryData(data)
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handlePayment = () => {
    toast.success("Заказ успешно оплачен!")
    clearCart()
    setStep(3)
    window.scrollTo(0, 0)
  }

  if (!mounted) return null

  if (items.length === 0 && step !== 3) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <Button asChild className="mt-4">
           <Link href="/catalog">В каталог</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <CustomBreadcrumb items={[
         { label: "Корзина", href: "/cart" },
         { label: "Оформление заказа", href: "/checkout" }
       ]} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between px-4 md:px-12 relative">
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10" />
             {[1, 2, 3].map((i) => (
               <div key={i} className={cn(
                  "flex flex-col items-center gap-2 bg-background px-2",
                  step >= i ? "text-primary" : "text-muted-foreground"
               )}>
                  <div className={cn(
                     "h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300",
                     step >= i ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-muted text-muted-foreground",
                     step > i && "bg-green-500 border-green-500"
                  )}>
                     {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-xs font-medium hidden sm:inline-block">
                     {i === 1 ? 'Доставка' : i === 2 ? 'Оплата' : 'Готово'}
                  </span>
               </div>
             ))}
          </div>

          {step === 1 && (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                 <User className="h-6 w-6 text-primary" />
                 Данные доставки
              </h2>
              <form onSubmit={handleSubmit(onDeliverySubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" {...register("name")} className="bg-white/50 border-muted-foreground/20 rounded-xl h-12" />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" {...register("phone")} placeholder="+7 (999) 000-00-00" className="bg-white/50 border-muted-foreground/20 rounded-xl h-12" />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} className="bg-white/50 border-muted-foreground/20 rounded-xl h-12" />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Способ получения</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <label className={cn(
                        "flex items-center p-4 border rounded-2xl cursor-pointer transition-all",
                        deliveryMethod === 'courier' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-muted-foreground/20 hover:bg-muted/50"
                     )}>
                       <input type="radio" value="courier" {...register("deliveryMethod")} className="sr-only" />
                       <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <Truck className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                          <div className="font-medium">Доставка курьером</div>
                          <div className="text-xs text-muted-foreground">Завтра, от 300 ₽</div>
                       </div>
                     </label>

                     <label className={cn(
                        "flex items-center p-4 border rounded-2xl cursor-pointer transition-all",
                        deliveryMethod === 'pickup' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-muted-foreground/20 hover:bg-muted/50"
                     )}>
                       <input type="radio" value="pickup" {...register("deliveryMethod")} className="sr-only" />
                       <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Home className="h-5 w-5 text-blue-600" />
                       </div>
                       <div>
                          <div className="font-medium">Самовывоз</div>
                          <div className="text-xs text-muted-foreground">Сегодня, бесплатно</div>
                       </div>
                     </label>
                  </div>
                </div>

                {deliveryMethod === "courier" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="address">Адрес доставки</Label>
                    <Textarea id="address" {...register("address")} placeholder="Город, улица, дом, квартира" className="bg-white/50 border-muted-foreground/20 rounded-xl min-h-[100px]" />
                    {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Textarea id="comment" {...register("comment")} className="bg-white/50 border-muted-foreground/20 rounded-xl" placeholder="Код домофона, этаж, пожелания" />
                </div>

                <Button type="submit" className="w-full h-12 text-lg rounded-xl font-bold shadow-lg shadow-primary/20">Перейти к оплате</Button>
              </form>
            </div>
          )}

          {step === 2 && (
             <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card p-6 md:p-8">
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Оплата
               </h2>
               <div className="space-y-6">
                 <RadioGroup defaultValue="card" className="space-y-4">
                   <div className="flex items-center space-x-4 border border-muted-foreground/20 p-4 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors bg-white/50">
                     <RadioGroupItem value="card" id="card" />
                     <Label htmlFor="card" className="cursor-pointer flex-1 font-medium">Банковская карта (ЮKassa)</Label>
                     <div className="flex gap-1 opacity-50">
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                        <div className="w-8 h-5 bg-gray-200 rounded" />
                     </div>
                   </div>
                   <div className="flex items-center space-x-4 border border-muted-foreground/20 p-4 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors bg-white/50">
                     <RadioGroupItem value="sbp" id="sbp" />
                     <Label htmlFor="sbp" className="cursor-pointer flex-1 font-medium">СБП</Label>
                     <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600" />
                   </div>
                   <div className="flex items-center space-x-4 border border-muted-foreground/20 p-4 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors bg-white/50">
                     <RadioGroupItem value="cash" id="cash" />
                     <Label htmlFor="cash" className="cursor-pointer flex-1 font-medium">При получении</Label>
                   </div>
                 </RadioGroup>

                 <div className="bg-secondary/30 p-6 rounded-2xl space-y-3 border border-secondary">
                    <div className="flex justify-between text-sm text-muted-foreground">
                       <span>Товары</span>
                       <span>{totalPrice()} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                       <span>Доставка</span>
                       <span>{deliveryData?.deliveryMethod === 'pickup' ? 'Бесплатно' : '300 ₽'}</span>
                    </div>
                    <Separator className="bg-muted-foreground/20" />
                    <div className="flex justify-between font-bold text-xl">
                       <span>Итого к оплате:</span>
                       <span>{totalPrice() + (deliveryData?.deliveryMethod === 'pickup' ? 0 : 300)} ₽</span>
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                   <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl">Назад</Button>
                   <Button onClick={handlePayment} className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/20">Оплатить заказ</Button>
                 </div>
               </div>
             </div>
          )}

          {step === 3 && (
             <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card p-12 text-center">
               <div className="space-y-6">
                 <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl animate-in zoom-in duration-500">
                   ✓
                 </div>
                 <h2 className="text-3xl font-bold">Заказ успешно оформлен!</h2>
                 <p className="text-muted-foreground text-lg">
                   Номер заказа: #{Math.floor(Math.random() * 10000)}<br/>
                   Мы отправили подтверждение на {deliveryData?.email}
                 </p>
                 <Button asChild size="lg" className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20">
                   <Link href="/">Вернуться в магазин</Link>
                 </Button>
               </div>
             </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step < 3 && (
          <div>
            <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm island-card p-6">
              <h3 className="text-lg font-bold mb-4">Ваш заказ</h3>
              <div className="space-y-4">
                <div className="space-y-3 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                   {items.map(item => (
                     <div key={item.id} className="flex gap-3 items-start text-sm group">
                       <div className="h-12 w-12 bg-white rounded-lg border border-muted-foreground/10 flex items-center justify-center text-xl shrink-0">
                          {item.image}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="text-muted-foreground text-xs mt-1">{item.quantity} шт x {item.price} ₽</p>
                       </div>
                       <span className="font-semibold">{item.price * item.quantity} ₽</span>
                     </div>
                   ))}
                </div>
                <Separator className="bg-muted-foreground/20" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>{totalPrice()} ₽</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
