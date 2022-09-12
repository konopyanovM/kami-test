import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PagesEnum } from '../../enums'
import './Header.css'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className='header'>
      <Link to={PagesEnum.products}>Products</Link>
    </header>
  )
}

export default Header
