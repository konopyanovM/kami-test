import { FC, ReactNode, useEffect, useState } from 'react'
import HorizontalRule from '../../components/HorizontalRule'
import { CITIES, CurrencyEnum, PRODUCT_LIST } from '../../constants'
import { getItem, setItem } from '../../utils'
import './CreateProduct.css'
import { ProductFieldsEnum } from './types/enums'

interface CreateProductProps {}

const CreateProduct: FC<CreateProductProps> = () => {
  const products = require('../../data/products.json')
  const productsLength = products.length

  const [productList] = useState(getItem(PRODUCT_LIST))

  const [id, setId] = useState(productsLength + 1)
  const [title, setTitle] = useState('title')
  const [description, setDescription] = useState('description')
  const [imageFiles, setImageFiles] = useState<Blob[] | MediaSource[] | null>(
    null,
  )
  const [status, setStatus] = useState<boolean>(true)
  const [priceStatus, setPriceStatus] = useState<boolean>(true)
  const [cities, setCities] = useState(CITIES)

  const [Images, setImages] = useState<ReactNode[] | null>(null)

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case ProductFieldsEnum.TITLE:
        setTitle(e.target.value)
        break
      case ProductFieldsEnum.DESCRIPTION:
        setDescription(e.target.value)
        break
      case ProductFieldsEnum.IMAGE:
        setImageFiles(e.target.files!)
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
    setCities((prev) => {
      const cityIndex = prev.findIndex((city) => {
        return city.id === e.target.id
      })
      const newCityUpdate = {
        name: e.target.name,
        id: e.target.id,
        price: e.target.value,
      }
      prev[cityIndex] = newCityUpdate
      return prev
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const newProduct = createProduct({
      id,
      images: imageFiles,
      title,
      status,
      prices: '',
    })
    console.log(productList)

    productList.push(newProduct)
    setItem(PRODUCT_LIST, productList)

    setId((prev) => {
      return prev + 1
    })
  }

  const createProduct = ({
    id,
    src = id,
    images = {},
    description = '',
    title,
    status,
  }: any) => {
    let priceBy = ''
    let basePrice = cities[0].price
    if (priceStatus === true) {
      priceBy = 'base'
    }

    const cityPrices = {}
    cities.forEach((city) => {
      cityPrices[city.id] = city.price ? city.price : basePrice
    })

    return {
      id,
      src,
      images,
      description,
      title,
      status,
      price: cityPrices,
      priceBy,
    }
  }

  useEffect(() => {
    const ImageComponents: ReactNode[] = []
    if (imageFiles)
      for (let i = 0; i < imageFiles.length; i++) {
        ImageComponents.push(
          <img
            key={i}
            src={URL.createObjectURL(imageFiles[i])}
            alt=''
            className={
              i === 0 ? 'create-product__image-main' : 'create-product__image'
            }
          />,
        )
      }
    setImages(ImageComponents)
  }, [imageFiles])

  const getCityPriceInputs = (cities) => {
    const CityComponents = cities.map((city, index) => {
      if (city.id !== 'base')
        return (
          <label
            key={index}
            className='create-product__label'
            htmlFor={city.id}
          >
            <span>{city.name}</span>
            <input
              className='create-product__input'
              id={city.id}
              type='number'
              name={city.name}
              onChange={handleOnChangeCityPrice}
              disabled={priceStatus}
            />
            <p className='create-product__symbol'>{CurrencyEnum.KZ}</p>
          </label>
        )
      return null
    })
    return CityComponents
  }

  const cityInputs = getCityPriceInputs(cities)

  return (
    <div className='create-product'>
      <div className='create-product__wrapper'>
        <form
          action='#'
          className='create-product__form'
          onSubmit={handleOnSubmit}
        >
          <label className='create-product__label' htmlFor='title'>
            {ProductFieldsEnum.TITLE}
          </label>
          <input
            className='create-product__input'
            id='title'
            type='text'
            name={ProductFieldsEnum.TITLE}
            value={title}
            onChange={handleOnChange}
          />
          <label className='create-product__label' htmlFor='description'>
            {ProductFieldsEnum.DESCRIPTION}
          </label>
          <input
            className='create-product__input'
            id='description'
            type='text'
            name={ProductFieldsEnum.DESCRIPTION}
            value={description}
            onChange={handleOnChange}
          />
          <label className='create-product__label' htmlFor='image'>
            {ProductFieldsEnum.IMAGE}
            <input
              className='create-product__input'
              id='image'
              type='file'
              name={ProductFieldsEnum.IMAGE}
              accept='image/*'
              multiple={true}
              onChange={handleOnChange}
            />
          </label>
          {imageFiles && (
            <div className='create-product__image-container'>{Images}</div>
          )}
          <label className='create-product__label' htmlFor='status'>
            <span>{ProductFieldsEnum.STATUS}</span>
            <input
              className='create-product__input checkbox'
              id='status'
              type='checkbox'
              name={ProductFieldsEnum.STATUS}
              onChange={handleOnChange}
            />
          </label>
          <label className='create-product__label' htmlFor='priceBy'>
            <span>One price for all cities</span>
            <input
              className='create-product__input checkbox'
              id='priceBy'
              type='checkbox'
              checked={priceStatus}
              name={ProductFieldsEnum.PRICE_STATUS}
              onChange={handleOnChange}
            />
          </label>
          <label className='create-product__label' htmlFor='base'>
            <input
              className='create-product__input'
              id='base'
              type='number'
              name='BasePrice'
              onChange={handleOnChangeCityPrice}
            />
            <p className='create-product__symbol'>{CurrencyEnum.KZ}</p>
          </label>
          <HorizontalRule></HorizontalRule>
          <div className='create-product__cities'>{cityInputs}</div>
          <input className='create-product__button' type='submit' />
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
