import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './Routes/Home'
import Restaurant from './Routes/Restaurant'
import SearchRestaurants from './Routes/SearchRestaurants'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/nearme" element={<SearchRestaurants/>}/>
      <Route path="/restaurant/:place_id" element={<Restaurant />}/>
    </Routes>
  )
}
