import { FC } from 'react'
import './ProductCard.css'

interface ProductCardProps {
  src: string
  alt?: string
  title: string
  isActive: boolean
  price: string | number
}

const ProductCard: FC<ProductCardProps> = ({
  src,
  alt = '',
  title,
  isActive,
  price,
}) => {
  const status = isActive ? 'Активен' : 'Архивирован'
  return (
    <div className='product-card'>
      <div className='product-card__wrapper'>
        <img src={src} alt={alt} className='product-card__image' />
        <h2 className='product-card__title'>{title}</h2>
        <p className='product-card__status'>{status}</p>
        <p className='product-card__price'>{price}</p>
      </div>
    </div>
  )
}

export default ProductCard
