import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import { PagesEnum } from './constants/enums'
import Products from './pages/Products'

function App() {
  return (
    <div className='App'>
      <Page>
        <Routes>
          <Route path={PagesEnum.PRODUCTS} element={<Products />}></Route>
        </Routes>
      </Page>
    </div>
  )
}

export default App
