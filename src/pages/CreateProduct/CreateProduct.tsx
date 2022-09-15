import { FC, ReactNode, useEffect, useState } from 'react'
import { PRODUCT_LIST } from '../../constants'
import { getItem, setItem } from '../../utils'
import './CreateProduct.css'
import { ProductFieldsEnum } from './types/enums'

interface CreateProductProps {}

const productList = getItem('productList')

const CreateProduct: FC<CreateProductProps> = () => {
  const products = require('../../data/products.json')
  const productsLength = products.length

  const [id, setId] = useState(productsLength + 1)
  const [title, setTitle] = useState('title')
  const [description, setDescription] = useState('description')
  const [image, setImage] = useState<Blob[] | MediaSource[] | null>(null)
  const [status, setStatus] = useState('status')
  const [price, setPrice] = useState('price')

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
        setImage(e.target.files!)
        break
      case ProductFieldsEnum.STATUS:
        setStatus(e.target.value)
        break
      case ProductFieldsEnum.PRICE:
        setPrice(e.target.value)
        break
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const newProduct = createProduct({
      id,
      title,
      status,
      price,
    })
    productList.push(newProduct)
    setItem(PRODUCT_LIST, productList)

    setId((prev) => {
      return prev + 1
    })
  }

  const createProduct = ({
    id,
    src = id,
    description = '',
    title,
    status,
    priceBy = 'base',
    price,
  }) => {
    return {
      id,
      src,
      description,
      title,
      status,
      priceBy,
      price,
    }
  }

  useEffect(() => {
    const ImageComponents: ReactNode[] = []
    if (image)
      for (let i = 0; i < image.length; i++) {
        ImageComponents.push(
          <img
            key={i}
            src={URL.createObjectURL(image[i])}
            alt=''
            className={
              i === 0 ? 'create-product__image-main' : 'create-product__image'
            }
          />,
        )
      }
    setImages(ImageComponents)
  }, [image])

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
          {image && (
            <div className='create-product__image-container'>{Images}</div>
          )}

          <label className='create-product__label' htmlFor='status'>
            <span>{ProductFieldsEnum.STATUS}</span>
            <input
              className='create-product__input'
              id='status'
              type='checkbox'
              name={ProductFieldsEnum.STATUS}
              value={status}
              onChange={handleOnChange}
            />
          </label>
          <label className='create-product__label' htmlFor='priceBy'>
            <span>One price for all cities</span>
            <input
              className='create-product__input'
              id='priceBy'
              type='checkbox'
              name={ProductFieldsEnum.PRICE}
              value={price}
              onChange={handleOnChange}
            />
          </label>
          <input className='create-product__button' type='submit' />
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
