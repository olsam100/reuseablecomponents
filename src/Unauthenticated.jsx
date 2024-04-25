import Authentication from 'pages/authentication'
import { Routes, Route } from 'react-router-dom'

const Unauthenticated = () => {
  return (
    <Routes>
      <Route path='/' exact element={<Authentication />} />
      <Route path='/login' element={<Authentication />} />
    </Routes>
  )
}

export default Unauthenticated
