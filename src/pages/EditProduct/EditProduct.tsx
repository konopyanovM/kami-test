import { FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HorizontalRule from '../../components/HorizontalRule'
import { CITIES, CurrencyEnum, PagesEnum, PRODUCT_LIST } from '../../constants'
import {
  capitalizeFirstLetter,
  getItem,
  setItem,
  updateProduct,
} from '../../utils'
import { ProductFieldsEnum } from '../CreateProduct/types/enums'
import './EditProduct.css'

interface EditProductProps {}

const EditProduct: FC<EditProductProps> = () => {
  const id = useParams().id

  const [productList] = useState(getItem(PRODUCT_LIST))
  const [currentProduct] = useState(
    productList.filter((product) => {
      return product.id === +id!
    })[0],
  )

  const [title, setTitle] = useState(currentProduct.title)
  const [description, setDescription] = useState(currentProduct.description)
  const [status, setStatus] = useState(currentProduct.status)
  const [cities, setCities] = useState(currentProduct.price)
  const [basePrice, setBasePrice] = useState(currentProduct.price.base)
  const [priceStatus, setPriceStatus] = useState(
    currentProduct.priceBy === 'base' ? true : false,
  )

  const routerNavigate = useNavigate()

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const newProduct = updateProduct({
      id,
      description,
      title,
      status,
      prices: '',
      cities,
      priceStatus,
    })
    const productIndex = productList.findIndex((product) => {
      return product.id === +id!
    })
    productList[productIndex] = newProduct

    setItem(PRODUCT_LIST, productList)
    routerNavigate(PagesEnum.PRODUCTS)
  }

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case ProductFieldsEnum.TITLE:
        setTitle(e.target.value)
        break
      case ProductFieldsEnum.DESCRIPTION:
        setDescription(e.target.value)
        break
      case ProductFieldsEnum.STATUS:
        setStatus(!status)
        break
      case ProductFieldsEnum.PRICE_STATUS:
        setPriceStatus(!priceStatus)
        break
    }
  }

  const handleOnChangeCityPrice = (e) => {
    if (e.target.id === 'base') setBasePrice(e.target.value)
    setCities((prev) => {
      prev[e.target.id] = +e.target.value

      return { ...prev }
    })
  }

  const getCityPriceInputs = (cities) => {
    const citiesArray = Object.entries(cities)
    const CityComponents = citiesArray.map((city, index) => {
      const name = city[0]
      const price: any = city[1]

      if (name === 'base') return null
      return (
        <label key={index} className='create-product__label' htmlFor={name}>
          <span>{capitalizeFirstLetter(name)}</span>
          <input
            className='create-product__input'
            id={name}
            type='number'
            value={price}
            name={capitalizeFirstLetter(name)}
            onChange={handleOnChangeCityPrice}
            disabled={priceStatus}
          />
          <p className='create-product__symbol'>{CurrencyEnum.KZ}</p>
        </label>
      )
    })
    return CityComponents
  }

  const cityInputs = getCityPriceInputs(cities)

  return (
    <div className='edit-product'>
      <div className='edit-product__wrapper'>
        <form
          action='#'
          className='edit-product__form'
          onSubmit={handleOnSubmit}
        >
          <label className='edit-product__label' htmlFor='title'>
            {ProductFieldsEnum.TITLE}
          </label>
          <input
            className='edit-product__input'
            id='title'
            type='text'
            name={ProductFieldsEnum.TITLE}
            value={title}
            onChange={handleOnChange}
          />
          <label className='edit-product__label' htmlFor='description'>
            {ProductFieldsEnum.DESCRIPTION}
          </label>
          <input
            className='edit-product__input'
            id='description'
            type='text'
            name={ProductFieldsEnum.DESCRIPTION}
            value={description}
            onChange={handleOnChange}
          />
          <label className='edit-product__label' htmlFor='status'>
            <span>{ProductFieldsEnum.STATUS}</span>
            <input
              className='edit-product__input checkbox'
              id='status'
              type='checkbox'
              name={ProductFieldsEnum.STATUS}
              onChange={handleOnChange}
            />
          </label>
          <label className='edit-product__label' htmlFor='priceBy'>
            <span>One price for all cities</span>
            <input
              className='edit-product__input checkbox'
              id='priceBy'
              type='checkbox'
              checked={priceStatus}
              name={ProductFieldsEnum.PRICE_STATUS}
              onChange={handleOnChange}
            />
          </label>
          <label className='edit-product__label' htmlFor='base'>
            <input
              className='edit-product__input'
              id='base'
              type='number'
              name='BasePrice'
              value={basePrice}
              onChange={handleOnChangeCityPrice}
            />
            <p className='edit-product__symbol'>{CurrencyEnum.KZ}</p>
          </label>
          <HorizontalRule></HorizontalRule>
          <div className='edit-product__cities'>{cityInputs}</div>
          <input className='edit-product__button' type='submit' />
          <Link className='button' to={PagesEnum.PRODUCTS}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
