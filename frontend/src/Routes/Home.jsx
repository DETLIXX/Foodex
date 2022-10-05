import React from 'react'
import Header from '../const/Header'
import Landing from '../const/Landing'
import Restaurant from '../const/RestaurantsNear'

export default function Home() {
  document.title = "Foodex"
  return (
    <div>
        <Header/>
        <Landing/>
    </div>
  )
}
