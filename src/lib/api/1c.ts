export async function syncProducts() {
  // Mock 1C Sync
  console.log("Syncing products from 1C...")
  return { success: true, updated: 150 }
}

export async function syncOrders() {
  // Mock Order Sync
  console.log("Syncing orders to 1C...")
  return { success: true, sent: 5 }
}



