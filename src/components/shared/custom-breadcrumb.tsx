"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Map of path segments to labels
const labelMap: Record<string, string> = {
  catalog: "Каталог",
  dogs: "Собаки",
  cats: "Кошки",
  cart: "Корзина",
  checkout: "Оформление заказа",
  login: "Вход",
  register: "Регистрация",
  profile: "Личный кабинет",
  "delivery": "Доставка и оплата",
  "contacts": "Контакты",
  "about": "О компании",
}

export function CustomBreadcrumb({ 
  items 
}: { 
  items?: { label: string; href: string }[] 
}) {
  const pathname = usePathname()
  
  if (pathname === "/") return null

  let breadcrumbs = items

  if (!breadcrumbs) {
    const segments = pathname.split("/").filter(Boolean)
    breadcrumbs = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`
      const label = labelMap[segment] || segment
      return { label, href }
    })
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Главная</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs!.length - 1
          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}



