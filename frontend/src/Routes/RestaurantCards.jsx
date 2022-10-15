import React from 'react'
import Header from '../const/Header'
import RestaurantsNear from '../const/RestaurantsNear'

export default function SearchRestaurants( ) {
    document.title = "Foodex - Near Me"
  return (
    <div>
        <Header/>
        <RestaurantsNear/>
    </div>
  )
}
