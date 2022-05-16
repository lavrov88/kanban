import React from 'react'
import { logOut } from '../../redux/actions/auth-actions'
import { HeaderProps } from '../../types/props-types'
import './Header.css'

const Header = ({ isLogged, currentUsername, dispatch }: HeaderProps) => {
  const [burgerMenuIsOpened, setBurgerMenuIsOpened] = React.useState(false)

  const burgerClickHandler = () => {
    if (isLogged) {
      setBurgerMenuIsOpened(!burgerMenuIsOpened)
    }
  }

  const logOutHandler = () => {
    setBurgerMenuIsOpened(false)
    dispatch(logOut())
  }

  const BurgerButton = () => {
    return (
      <div className="burger_btn_wrapper">
        <button onClick={burgerClickHandler} className="burger_btn_btn">
          <span></span>
        </button>
      </div>
    )
  }
  
  const BurgerMenu = () => {
    return (
      <div className={'burger_menu_wrapper' + (burgerMenuIsOpened ? '' : ' closed')}>
        <div className="burger_menu_auth_data">
          {isLogged &&
            <div className="burger_menu_logout">
              <span>Текущий пользователь:</span>
              <span><strong>{currentUsername}</strong></span>
              <button onClick={logOutHandler} className='header_logout_btn'>Выйти</button>
            </div>}
        </div>
      </div>
    )
  }

  return (
    <header className='header'>
      <BurgerButton />
      <div className="header_title"></div>
      <div className="header_auth_data">
        {isLogged &&
        <div className="header_logout">
          <span>Текущий пользователь:</span>
          <span><strong>{currentUsername}</strong></span>
          <button onClick={logOutHandler} className='header_logout_btn'>Выйти</button>
        </div>}
      </div>
      <BurgerMenu />
    </header>
  )
}

export default Header