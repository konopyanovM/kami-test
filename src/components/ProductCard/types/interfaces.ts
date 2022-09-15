import { MouseEventHandler } from 'react'

export interface ProductCardProps {
  src: string
  alt?: string
  title: string
  isActive: boolean
  price: string | number
  handlerDelete: MouseEventHandler<HTMLParagraphElement>
}
