import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("YooKassa Webhook:", body)
    
    // Verify signature and update order status logic here
    
    return NextResponse.json({ status: "ok" })
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

