import { useEffect, useState } from 'react'
import { ref, onValue, remove } from 'firebase/database'
import { database } from '../fỉebase'
import Chart from 'react-google-charts'

const MyChart = () => {
  const [data1, setData1] = useState([
    ['Thời gian', 'Nhiệt độ'],
    ['0:00', 0],
  ])
  const [data2, setData2] = useState([
    ['Thời gian', 'Độ ẩm'],
    ['0:00', 0],
  ])
  const [data3, setData3] = useState([
    ['Thời gian', 'Độ PH'],
    ['0:00', 0],
  ])

  useEffect(() => {
    const sensorDataRef = ref(database, 'sensor_data')

    const unsubscribe = onValue(sensorDataRef, (snapshot) => {
      const data = snapshot.val()
      const dataArray = Object.keys(data).map((key) => ({
        time: new Date(Number(key) * 1000),
        ...data[key],
      }))

      // Lấy 50 bản ghi cuối cùng
      const latestDataArray = dataArray.slice(-50)

      // Xóa các bản ghi cũ
      const keysToDelete = Object.keys(data).slice(0, -50)
      keysToDelete.forEach((key) => {
        remove(ref(database, `sensor_data/${key}`))
      })

      console.log('🚀 ~ latestDataArray:', latestDataArray)
      const temp = latestDataArray.map((item) => [
        item.time.toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
        }),
        item.temperature,
      ])
      const humid = latestDataArray.map((item) => [
        item.time.toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
        }),
        item.humidity,
      ])
      const ph = latestDataArray.map((item) => [
        item.time.toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
          hour12: false,
        }),
        item.pH,
      ])
      setData1([['Thời gian', 'Nhiệt độ'], ...temp])
      setData2([['Thời gian', 'Độ ẩm'], ...humid])
      setData3([['Thời gian', 'Độ PH'], ...ph])
    })

    // Cleanup listener when component unmount
    return () => unsubscribe()
  }, [])
  const options1 = {
    title: 'Biểu đồ Nhiệt độ theo thời gian',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#ef4444'],
    lineWidth: 4,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  }

  const options2 = {
    title: 'Biểu đồ Độ ẩm theo thời gian',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#22c55e'],
    lineWidth: 4,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  }

  const options3 = {
    title: 'Biểu đồ Độ PH theo thời gian',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#a855f7'],
    lineWidth: 4,
    animation: {
      duration: 1000,
      easing: 'out',
    },
  }

  return (
    <>
      <Chart chartType='LineChart' width='100%' height='300px' data={data1} options={options1} legendToggle />
      <Chart chartType='LineChart' width='100%' height='300px' data={data2} options={options2} legendToggle />
      <Chart chartType='LineChart' width='100%' height='300px' data={data3} options={options3} legendToggle />
    </>
  )
}

export default MyChart
