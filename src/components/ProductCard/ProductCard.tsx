import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DEFAULT_CURRENCY, PagesEnum } from '../../constants'
import './ProductCard.css'
import { ProductCardProps } from './types'

const ProductCard: FC<ProductCardProps> = ({
  id,
  src,
  alt = '',
  title,
  isActive,
  price,
  handlerDelete,
}) => {
  const locationPath = useLocation().pathname
  const idPath = `/${id}`
  const status = isActive ? 'Active' : 'Archive'
  return (
    <div className='product-card'>
      <div className='product-card__wrapper'>
        <img src={src} alt={alt} className='product-card__image' />
        <p className='product-card__title'>{title}</p>
        <p className={`product-card__status ${status}`}>{status}</p>
        <p className='product-card__price'>{`${price} ${DEFAULT_CURRENCY}`}</p>
        <Link
          to={`${locationPath}${PagesEnum.EDIT}${idPath}`}
          className='product-card__link button'
        >
          Edit
        </Link>
        <p className='button' onClick={handlerDelete}>
          Delete
        </p>
      </div>
    </div>
  )
}

export default ProductCard
