import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PagesEnum } from '../../constants/enums'
import './Header.css'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className='header'>
      <Link to={PagesEnum.PRODUCTS}>Products</Link>
    </header>
  )
}

export default Header
