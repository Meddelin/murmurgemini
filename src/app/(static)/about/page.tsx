import { CustomBreadcrumb } from "@/components/shared/custom-breadcrumb"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <CustomBreadcrumb />
      <h1 className="text-3xl font-bold mb-6">О компании</h1>
      <div className="prose max-w-none">
        <p>Мы любим животных!</p>
      </div>
    </div>
  )
}



