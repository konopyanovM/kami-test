import { FC, ReactNode } from 'react'
import Header from '../Header/Header'
import './Page.css'

interface PageProps {
  children: ReactNode
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default Page
