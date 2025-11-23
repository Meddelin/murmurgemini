"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { usePetStore, Pet } from "@/store/pet-store"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PetsPage() {
  const { pets, addPet, updatePet, removePet } = usePetStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const [formData, setFormData] = useState<Partial<Pet>>({
    name: "",
    type: "dog",
    breed: "",
    age: 0,
    size: "medium"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPet) {
      updatePet(editingPet.id, formData)
    } else {
      addPet(formData as Omit<Pet, 'id'>)
    }
    setIsDialogOpen(false)
    setEditingPet(null)
    setFormData({ name: "", type: "dog", breed: "", age: 0, size: "medium" })
  }

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet)
    setFormData(pet)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить питомца?")) {
      removePet(id)
    }
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Мои питомцы</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {pets.map((pet) => (
          <Card key={pet.id} className="relative group overflow-hidden">
             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(pet)}>
                   <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(pet.id)}>
                   <Trash2 className="h-4 w-4" />
                </Button>
             </div>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
                {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐈' : '🐾'}
              </div>
              <div>
                <div className="font-bold text-lg">{pet.name}</div>
                <div className="text-sm text-muted-foreground">
                   {pet.breed || (pet.type === 'dog' ? 'Собака' : pet.type === 'cat' ? 'Кошка' : 'Питомец')}, {pet.age} {getAgeString(pet.age)}
                </div>
                {pet.size && <div className="text-xs text-muted-foreground mt-1">Размер: {pet.size === 'small' ? 'Мелкий' : pet.size === 'medium' ? 'Средний' : 'Крупный'}</div>}
              </div>
            </CardContent>
          </Card>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
           setIsDialogOpen(open)
           if (!open) {
              setEditingPet(null)
              setFormData({ name: "", type: "dog", breed: "", age: 0, size: "medium" })
           }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto min-h-[100px] border-dashed flex flex-col gap-2 hover:border-primary/50 hover:bg-primary/5">
              <Plus className="h-6 w-6 text-primary" />
              <span className="font-medium">Добавить питомца</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPet ? 'Редактировать питомца' : 'Новый питомец'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Имя</Label>
                <Input 
                   value={formData.name} 
                   onChange={e => setFormData({...formData, name: e.target.value})} 
                   required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Вид</Label>
                   <Select value={formData.type} onValueChange={(v: any) => setFormData({...formData, type: v})}>
                     <SelectTrigger><SelectValue /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="dog">Собака</SelectItem>
                       <SelectItem value="cat">Кошка</SelectItem>
                       <SelectItem value="other">Другое</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label>Возраст (лет)</Label>
                   <Input 
                      type="number" 
                      min="0"
                      value={formData.age} 
                      onChange={e => setFormData({...formData, age: parseInt(e.target.value) || 0})} 
                   />
                 </div>
              </div>
              <div className="space-y-2">
                <Label>Порода</Label>
                <Input 
                   value={formData.breed} 
                   onChange={e => setFormData({...formData, breed: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label>Размер</Label>
                <Select value={formData.size} onValueChange={(v: any) => setFormData({...formData, size: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Мелкий (до 10 кг)</SelectItem>
                    <SelectItem value="medium">Средний (10-25 кг)</SelectItem>
                    <SelectItem value="large">Крупный (от 25 кг)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                 <Button type="submit">{editingPet ? 'Сохранить' : 'Добавить'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function getAgeString(age: number) {
   if (age % 10 === 1 && age % 100 !== 11) return 'год'
   if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года'
   return 'лет'
}
