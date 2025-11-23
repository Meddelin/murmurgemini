import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"

export default function ContactsPage() {
  return (
    <div className="container py-8">
      <CustomBreadcrumb />
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="prose max-w-none">
        <p>Email: support@murmurgemini.ru</p>
        <p>Phone: 8 800 123-45-67</p>
      </div>
    </div>
  )
}



