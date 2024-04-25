// import { useState, useEffect } from 'react'
// import jwtDecode from 'jwt-decode'
import Home from 'pages/home'

const App = () => {
  // const [user, setUser] = useState()

  // useEffect(() => {
  //   try {
  //     const jwt = localStorage.getItem('token')
  //     const user = jwtDecode(jwt)
  //     setUser(user)
  //   } catch (error) {}
  // }, [])
  return (
    <div>
      <Home />
    </div>
  )
}

export default App
