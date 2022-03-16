export interface Category {
  done: boolean
  qty: number
  data?: {
    _id: string
    name: string
    description: string
  }[]
}
