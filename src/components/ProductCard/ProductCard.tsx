import { FC } from 'react'
import { defaultCurrency } from '../../constants'
import './ProductCard.css'
import { ProductCardProps } from './types'

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
        <p className='product-card__title'>{title}</p>
        <p className='product-card__status'>{status}</p>
        <p className='product-card__price'>{`${price} ${defaultCurrency}`}</p>
      </div>
    </div>
  )
}

export default ProductCard
