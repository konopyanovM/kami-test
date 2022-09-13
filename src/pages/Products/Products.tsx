import { FC, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import './Products.css'
import images from '../../data/index'
import { PagesEnum, PRODUCT_ITEMS_PER_PAGE } from '../../constants'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import HorizontalRule from '../../components/HorizontalRule'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const products = require('../../data/products.json')

  const Products =
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
    })

  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + PRODUCT_ITEMS_PER_PAGE
    setCurrentItems(Products.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(Products.length / PRODUCT_ITEMS_PER_PAGE))
  }, [itemOffset, PRODUCT_ITEMS_PER_PAGE])

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * PRODUCT_ITEMS_PER_PAGE) % Products.length

    setItemOffset(newOffset)
  }

  return (
    <div className='products'>
      <div className='products__wrapper'>
        <div className='products-header'>
          <Link to={PagesEnum.PRODUCTS_CREATE}>Create</Link>
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
