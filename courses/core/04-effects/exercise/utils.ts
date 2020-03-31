import { get } from 'YesterTech/api/utils'

export async function getCategories() {
  const products = await get('/products')
  const categories = products.reduce(
    (categories: any[], product: { category?: string }) =>
      categories.concat([product.category || '']),
    []
  )
  return [...new Set(categories)]
}
