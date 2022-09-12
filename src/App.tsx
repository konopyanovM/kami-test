import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Page from './components/Page'
import { PagesEnum } from './pages'

function App() {
  return (
    <div className='App'>
      <Page>
        <Routes>
          <Route path={PagesEnum.products}></Route>
        </Routes>
      </Page>
    </div>
  )
}

export default App
