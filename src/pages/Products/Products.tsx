import { FC } from 'react'
import ProductCard from '../../components/ProductCard'
import './Products.css'
import images from '../../data/index'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const products = require('../../data/products.json')
  const Products = products.map((product, index) => {
    const imagePlaceholder = require('../../data/imagePlaceholder.jpg')
    const image = images[index + 1] || imagePlaceholder

    return (
      <ProductCard
        key={index}
        src={image}
        title={product.title}
        isActive={product.status}
        price={product.price}
      />
    )
  })

  return (
    <div className='products'>
      <div className='products__wrapper'>{Products}</div>
    </div>
  )
}

export default Products
