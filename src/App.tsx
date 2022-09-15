import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import { PagesEnum } from './constants/enums'
import CreateProduct from './pages/CreateProduct'
import Main from './pages/Main'
import Products from './pages/Products'
import { setItem } from './utils'

const loadLocalStorage = () => {}

function App() {
  const productList = require('./data/products.json')
  setItem('productList', productList)

  const CREATE_PRODUCT_PATH = `${PagesEnum.PRODUCTS}${PagesEnum.CREATE}`

  return (
    <div className='app'>
      <Page>
        <Routes>
          <Route path={PagesEnum.MAIN} element={<Main />}></Route>
          <Route path={PagesEnum.PRODUCTS} element={<Products />}></Route>
          <Route path={CREATE_PRODUCT_PATH} element={<CreateProduct />}></Route>
        </Routes>
      </Page>
    </div>
  )
}

export default App
