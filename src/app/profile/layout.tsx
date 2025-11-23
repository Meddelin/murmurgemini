import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-8">
       <CustomBreadcrumb items={[
         { label: "Главная", href: "/" },
         { label: "Личный кабинет", href: "/profile" }
       ]} />
       
       <div className="mt-4">
         {children}
       </div>
    </div>
  )
}
