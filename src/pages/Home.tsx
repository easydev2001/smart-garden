import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import MyChatBot from '../components/ChatBot'
import Footer from '../components/Footer'
import MyChart from '../components/Chart'
import { database } from '../fỉebase'
import { onValue, ref } from 'firebase/database'

const Home = () => {
  const [data, setData] = useState<{ humidity: number; pH: number; temperature: number }>()
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/auth')
    }
  }, [navigate])

  useEffect(() => {
    const sensorDataRef = ref(database, 'sensor_data')

    // get latest data
    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val()
      const latestData = Object.values(data).pop()
      setData(latestData as { humidity: number; pH: number; temperature: number })
      console.log('🚀 ~ latestData:', latestData)
    })

    // Cleanup listener when component unmount
    return () => unsubscribe()
  }, [])

  return (
    <div>
      <Header />
      <div className='min-h-screen bg-slate-50 p-4 flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Nhiệt độ</h1>
            <p className='text-4xl font-bold text-red-500'>{data?.temperature?.toFixed(2)} °C</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Độ ẩm</h1>
            <p className='text-4xl font-bold text-green-500'>{data?.humidity?.toFixed(2)} %</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 w-40 h-40 rounded-md shadow-md bg-white'>
            <h1 className='text-xl font-medium'>Độ PH</h1>
            <p className='text-4xl font-bold text-purple-500'>{(data?.pH*14/9).toFixed(0)}</p>
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
