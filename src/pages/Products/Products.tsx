import { FC, ReactNode, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import './Products.css'
import images from '../../data/index'
import { PagesEnum, PRODUCT_ITEMS_PER_PAGE } from '../../constants'
import ReactPaginate from 'react-paginate'
import { Link, useLocation } from 'react-router-dom'
import HorizontalRule from '../../components/HorizontalRule'
import { getItem, searchFilter } from '../../utils'

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const locationPath = useLocation().pathname

  const [productList] = useState(getItem('productList'))
  const [Products, setProducts] = useState<null | ReactNode[]>(null)
  const [currentItems, setCurrentItems] = useState<null | ReactNode[]>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const [query, setQuery] = useState('')

  const getProductCards = (products): ReactNode[] => {
    return products.map((product, index) => {
      const imagePlaceholder = require('../../data/imagePlaceholder.jpg')
      const image = images[product.src] || imagePlaceholder

      const price = product.price[product.priceBy] || product.price.base

      return (
        <ProductCard
          key={index}
          src={image}
          title={product.title}
          isActive={product.status}
          price={price}
        />
      )
    })
  }

  useEffect(() => {
    setProducts(productList && getProductCards(productList))
  }, [productList])

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

  const handleOnSearch = (e) => {
    e.preventDefault()
    const filteredProducts = searchFilter(productList, query)

    setProducts(filteredProducts && getProductCards(filteredProducts))
  }

  return (
    <div className='products'>
      <div className='products__wrapper'>
        <div className='products-header'>
          <Link to={`${locationPath}${PagesEnum.CREATE}`}>Create</Link>
          <form className='products-header__search' onSubmit={handleOnSearch}>
            <label htmlFor='search'>Search by name</label>
            <input
              className='products-header__search-input'
              value={query}
              type='text'
              id='search'
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
            <input type='submit' />
          </form>
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
