import React from 'react'
import { logIn, registerUser, setAuthError, setRegError } from '../../redux/actions/auth-actions'
import { LoginFormProps, LoginProps, RegFormProps } from '../../types/props-types'
import './Login.css'

const LoginForm = ({ authError, currentUsername, dispatch }: LoginFormProps) => {
  const [username, setUsername] = React.useState(currentUsername || '')
  const [password, setPassword] = React.useState('')
  
  const handleAuth = (e: any) => {
    e.preventDefault()
    dispatch(logIn(username, password))
  }

  return (
    <div className='login_wrapper'>
      <h2 className="login_title">Авторизация</h2>
      <form className="login_form">
        <input 
          type="text" 
          className={'login_form_input login_form_username' + (authError && ' error')}
          placeholder='Имя пользователя'
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <input 
          type="password" 
          className={'login_form_input login_form_password' + (authError && ' error')}
          placeholder='Пароль'
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <button 
          className="login_btn"
          onClick={handleAuth}
        >
          Войти
        </button>
      </form>
      {authError && <div className="login_error_message">
        Ошибка! {authError}
      </div>}
    </div>
  )
}

const RegisterForm = ({ regError, dispatch }: RegFormProps) => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirm, setPasswordConfirm] = React.useState('')
  
  const handleReg = (e: any) => {
    e.preventDefault()
    
    if (password !== passwordConfirm) {
      dispatch(setRegError('Введенные пароли не совпадают.'))
    } else {
      console.log(username, email, password)
      dispatch(registerUser(username, email, password))
    }
  }

  return (
    <>
      <h2 className="login_title">Регистрация</h2>
      <form className="login_form">
        <input 
          type="text" 
          className='login_form_input login_form_username'
          placeholder='Имя пользователя'
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
        />
        <input 
          type="email" 
          className='login_form_input login_form_email'
          placeholder='Email (не обязательно)'
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <input 
          type="password" 
          className='login_form_input login_form_password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
        />
        <input 
          type="password" 
          className='login_form_input login_form_password'
          placeholder='Подтверждение пароля'
          value={passwordConfirm}
          onChange={(e) => {setPasswordConfirm(e.target.value)}}
        />
        <button 
          className="login_btn"
          onClick={handleReg}
        >
          Зарегистрироваться
        </button>
      </form>
      {regError && <div className="login_error_message">
        Ошибка! {regError}
      </div>}
    </>
  )
}

const Login = ({ currentUsername, authError, regError, dispatch }: LoginProps) => {
  const [registerIsActive, setRegisterIsActive] = React.useState(false)

  const registerSwitchHandler = () => {
    setRegisterIsActive(!registerIsActive)
    dispatch(setAuthError(null))
    dispatch(setRegError(null))
  }

  return (
    <div className='login_wrapper'>
      {!registerIsActive && <LoginForm currentUsername={currentUsername} authError={authError} dispatch={dispatch} />}
      {registerIsActive && <RegisterForm  regError={regError} dispatch={dispatch} />}

      <div className="login_register_switch">
      {registerIsActive && 
        <button 
          onClick={registerSwitchHandler} 
          className="register_switch_btn"
        >
          Назад к авторизации
        </button>}
        {!registerIsActive && 
        <button 
          onClick={registerSwitchHandler} 
          className="register_switch_btn"
        >
          Регистрация
        </button>}
      </div>
    </div>
  )
}

export default Login