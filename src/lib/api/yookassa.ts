export async function createPayment(amount: number, description: string) {
  // Mock YooKassa Payment Creation
  console.log("Creating payment in YooKassa:", amount, description)
  return {
    id: "pay_" + Math.random().toString(36).substring(7),
    confirmation_url: "https://yookassa.ru/checkout/mock",
    status: "pending"
  }
}



