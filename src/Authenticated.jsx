import { useContext } from 'react'
import Layout from 'components/layout'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/home'
import Review from 'pages/review'
import { DataContext } from 'components/layout'

const Authenticated = () => {
  const data = useContext(DataContext)
  console.log(data)
  return (
    <Layout className='app' userData={data}>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/review' element={<Review />} />
      </Routes>
    </Layout>
  )
}

export default Authenticated
