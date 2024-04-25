import React, { createContext } from 'react'
import './layout.css'
import Aside from 'components/aside'

export const DataContext = createContext()

const Layout = ({ children, userData }) => {
  return (
    <div className='container'>
      <DataContext.Provider value={{ userData }}>
        <Aside />
        <main>{children}</main>
      </DataContext.Provider>
    </div>
  )
}

export default Layout
