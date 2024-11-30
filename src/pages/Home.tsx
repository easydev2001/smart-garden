import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import MyChatBot from '../components/ChatBot'
import Footer from '../components/Footer'
import MyChart from '../components/Chart'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [navigate])

  return (
    <div>
      <Header />
      <div className='min-h-screen bg-slate-50 p-4 flex gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Nhiệt độ</h1>
            <p className='text-4xl font-bold text-red-500'>23 °C</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Độ ẩm</h1>
            <p className='text-4xl font-bold text-green-500'>83 %</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Độ PH</h1>
            <p className='text-4xl font-bold text-purple-500'>7</p>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4 bg-white rounded-md shadow-md'>
          <MyChart />
        </div>
      </div>
      <Footer />
      <MyChatBot />
    </div>
  )
}

export default Home
