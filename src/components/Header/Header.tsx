import React from 'react'
import { logOut } from '../../redux/actions/auth-actions'
import { HeaderProps } from '../../types/props-types'
import './Header.css'

function Header({ isLogged, currentUsername, dispatch }: HeaderProps) {
  const logOutHandler = () => {
    dispatch(logOut())
  }

  return (
    <header className='header'>
      <div className="header_title"></div>
      <div className="header_auth_data">
        {isLogged &&
        <div className="header_logout">
          <span>Текущий пользователь:</span>
          <span><strong>{currentUsername}</strong></span>
          <button onClick={logOutHandler} className='header_logout_btn'>Выйти</button>
        </div>}
      </div>
    </header>
  )
}

export default Header