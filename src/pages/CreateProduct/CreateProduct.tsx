import { FC, useEffect, useState } from 'react'
import './CreateProduct.css'
import { ProductFieldsEnum } from './types/enums'

interface CreateProductProps {}

const CreateProduct: FC<CreateProductProps> = () => {
  const products = require('../../data/products.json')
  const productsLength = products.length

  const [id, setId] = useState(productsLength + 1)
  const [title, setTitle] = useState('title')
  const [status, setStatus] = useState('status')
  const [price, setPrice] = useState('price')

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case ProductFieldsEnum.TITLE:
        setTitle(e.target.value)
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
    const product = {
      id,
      src: productsLength + 1,
      alt: '',
      description: '',
      title,
      status,
      price,
    }

    setId((prev) => {
      return prev + 1
    })

    console.log(id)
  }

  return (
    <div className='create-product'>
      <div className='create-product__wrapper'>
        <form
          action='#'
          className='create-product__form'
          onSubmit={handleOnSubmit}
        >
          <input
            type='text'
            name={ProductFieldsEnum.TITLE}
            value={title}
            onChange={handleOnChange}
          />
          <input
            type='text'
            name={ProductFieldsEnum.STATUS}
            value={status}
            onChange={handleOnChange}
          />
          <input
            type='text'
            name={ProductFieldsEnum.PRICE}
            value={price}
            onChange={handleOnChange}
          />
          <input type='submit' />
        </form>
      </div>
      {/* <img src={src} alt={alt} className='product-card__image' /> */}
      {/* <p className='product-card__title'>{title}</p>
        <p className='product-card__status'>{status}</p>
        <p className='product-card__price'>{`${price} ${DEFAULT_CURRENCY}`}</p> */}
    </div>
  )
}

export default CreateProduct
