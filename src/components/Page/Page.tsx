import { FC, ReactNode } from 'react'
import Header from '../Header/Header'
import './Page.css'

interface PageProps {
  children: ReactNode
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <div className='page'>
      <Header></Header>
      <main className='page-main'>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Page
