import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import { PagesEnum } from './constants/enums'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct/EditProduct'
import Main from './pages/Main'
import Products from './pages/Products'
import { loadLocaleStorage } from './utils'

function App() {
  const productList = require('./data/products.json')
  loadLocaleStorage('productList', productList)

  const CREATE_PRODUCT_PATH = `${PagesEnum.PRODUCTS}${PagesEnum.CREATE}`
  const EDIT_PRODUCT_PATH = `${PagesEnum.PRODUCTS}${PagesEnum.EDIT}/:id`

  return (
    <div className='app'>
      <Page>
        <Routes>
          <Route path={PagesEnum.MAIN} element={<Main />}></Route>
          <Route path={PagesEnum.PRODUCTS} element={<Products />}></Route>
          <Route path={CREATE_PRODUCT_PATH} element={<CreateProduct />}></Route>
          <Route path={EDIT_PRODUCT_PATH} element={<EditProduct />}></Route>
        </Routes>
      </Page>
    </div>
  )
}

export default App
