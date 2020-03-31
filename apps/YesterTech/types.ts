export type Product = {
  id: number
  imagePath: string
  inventory: number
  name: string
  rating: number
  brand: string
  category: string
  condition: string
  price: number
  description: string
  relatedProducts?: number[]
}

export type CartProduct = {
  productId: Product['id']
  quantity: number
  name: Product['name']
  price: Product['price']
}
