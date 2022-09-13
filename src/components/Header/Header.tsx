import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PagesEnum } from '../../constants/enums'
import './Header.css'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Link to={PagesEnum.MAIN}>Main</Link>
        <Link to={PagesEnum.PRODUCTS}>Products</Link>
      </div>
    </header>
  )
}

export default Header
