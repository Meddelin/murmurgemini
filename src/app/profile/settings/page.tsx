import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Настройки профиля</h1>
      <div className="max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input id="name" defaultValue="Иван Иванов" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="ivan@example.com" />
        </div>
        <Button>Сохранить изменения</Button>
      </div>
    </div>
  )
}



