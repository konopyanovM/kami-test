import { FC } from 'react'
import ProductCard from '../../components/ProductCard'
import './Products.css'
interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  return (
    <div>
      <ProductCard
        src={require('../../data/images/1.webp')}
        title={'Товар 1'}
        isActive={true}
        price={3114}
      ></ProductCard>
    </div>
  )
}

export default Products
