import { FC } from 'react'
import './Main.css'

interface MainProps {}

const Main: FC<MainProps> = ({}) => {
  return (
    <div className='main'>
      <div className='main__wrapper'>
        <p>Main page</p>
      </div>
    </div>
  )
}

export default Main
