import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './Routes/Home'
import RestaurantDetails from './Routes/RestaurantDetails'
import RestaurantCards from './Routes/RestaurantCards'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/nearme" element={<RestaurantCards />} />
      <Route path="/restaurant/:place_id" element={<RestaurantDetails/>} />
    </Routes>
  )
}
