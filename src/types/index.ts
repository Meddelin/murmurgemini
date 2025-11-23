export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: "new" | "sale" | "bestseller";
  inStock: boolean;
  brand?: string;
}



