import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useLogin, useRegister } from 'context/api'
import './auth.css'
import { DataContext } from 'components/layout'
import { useContext } from 'react'

const spinner = (
  <div className='svg'>
    <svg className='svgspin' width={30} height={20} viewBox='0 0 512 512'>
      <path
        d='M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z'
        fill='#fff'
      />
    </svg>
  </div>
)

const Authentication = () => {
  const loginMutation = useLogin()
  const registerMutation = useRegister()
  useContext(DataContext)

  const isLoading = loginMutation.isLoading || registerMutation.isLoading

  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const pageTitle = isLogin ? 'Login' : 'Register'
  const descriptionLink = isLogin ? '/' : '/login'
  const descriptionText = isLogin
    ? `Don't have an account? Register`
    : 'Already have an account? Login'

  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    setFormInput({
      name: '',
      email: '',
      password: '',
    })
  }, [location.pathname])

  const handleInputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLogin) {
      loginMutation.mutate(
        {
          email: formInput.email,
          password: formInput.password,
        },
        {
          onSuccess: () => {
            window.location = '/'
          },
        }
      )
    } else {
      registerMutation.mutate(formInput, {
        onSuccess: () => {
          window.location = '/'
        },
      })
    }
  }

  return (
    <div className='authcontainer'>
      <h1>{pageTitle}</h1>
      <form onSubmit={handleSubmit} className='form'>
        {!isLogin && (
          <div className='inputgroup'>
            <input
              type='text'
              value={formInput.name}
              onChange={handleInputChange}
              className='loginInput'
              placeholder='Name'
              name='name'
            />
          </div>
        )}
        <div className='inputgroup'>
          <input
            type='text'
            value={formInput.email}
            onChange={handleInputChange}
            className='loginInput'
            placeholder='Email'
            name='email'
          />
        </div>
        <div className='inputgroup'>
          <input
            type='password'
            value={formInput.password}
            onChange={handleInputChange}
            className='loginInput'
            placeholder='Password'
            name='password'
          />
        </div>

        <button className='btn' disabled={isLoading}>
          {isLoading ? spinner : pageTitle}
        </button>
      </form>

      <span className='descriptiontext'>
        <Link to={descriptionLink} className='descriptiontextlink'>
          {descriptionText}
        </Link>
      </span>
    </div>
  )
}

export default Authentication
