export interface Product {
  done: boolean
  qty: number
  data?: {
    _id: string
    name: string
    price: number
    stock: number
    productsCategory: {
      _id: string
      name: string
      description: string
    }
    mark: {
      _id: string
      name: string
    }
    description: string
  }[]
}
