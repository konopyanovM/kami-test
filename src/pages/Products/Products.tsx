import { FC, ReactNode, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import './Products.css'
import images from '../../data/index'
import { PagesEnum, PRODUCT_ITEMS_PER_PAGE } from '../../constants'
import ReactPaginate from 'react-paginate'
import { Link, useLocation } from 'react-router-dom'
import HorizontalRule from '../../components/HorizontalRule'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const products = require('../../data/products.json')
  const locationPath = useLocation().pathname

  const [Products, setProducts] = useState<null | ReactNode[]>(null)
  const [currentItems, setCurrentItems] = useState<null | ReactNode[]>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    setProducts(
      products &&
        products.map((product, index) => {
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
        }),
    )
  }, [products])

  useEffect(() => {
    if (Products) {
      const endOffset = itemOffset + PRODUCT_ITEMS_PER_PAGE
      setCurrentItems(Products.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(Products.length / PRODUCT_ITEMS_PER_PAGE))
    }
  }, [Products, itemOffset])

  const handlePageClick = (event) => {
    const newOffset = Products
      ? (event.selected * PRODUCT_ITEMS_PER_PAGE) % Products.length
      : 0
    setItemOffset(newOffset)
  }

  return (
    <div className='products'>
      <div className='products__wrapper'>
        <div className='products-header'>
          <Link to={`${locationPath}${PagesEnum.CREATE}`}>Create</Link>
        </div>
        <HorizontalRule margin={20} />
        <div className='products__list'>{currentItems}</div>
        <HorizontalRule margin={20} />
        <ReactPaginate
          className='products-pagination'
          onPageChange={handlePageClick}
          breakLabel='...'
          nextLabel='next >'
          previousLabel='< previous'
          pageCount={pageCount}
        />
      </div>
    </div>
  )
}

export default Products
