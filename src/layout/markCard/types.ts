export interface Mark {
  done: boolean
  qty: number
  data?: {
    _id: string
    name: string
  }[]
}
