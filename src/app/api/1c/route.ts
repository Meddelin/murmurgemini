import { NextResponse } from "next/server"
import { syncProducts, syncOrders } from "@/lib/api/1c"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (body.type === 'products') {
      const result = await syncProducts()
      return NextResponse.json(result)
    }
    
    if (body.type === 'orders') {
      const result = await syncOrders()
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

