import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import { PagesEnum } from './constants/enums'
import Main from './pages/Main'
import Products from './pages/Products'

function App() {
  return (
    <div className='app'>
      <Page>
        <Routes>
          <Route path={PagesEnum.MAIN} element={<Main />}></Route>
          <Route path={PagesEnum.PRODUCTS} element={<Products />}></Route>
        </Routes>
      </Page>
    </div>
  )
}

export default App
