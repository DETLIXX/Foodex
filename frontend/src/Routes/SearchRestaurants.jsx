import React from 'react'
import Header from '../const/Header'
import RestaurantsNear from '../const/RestaurantsNear'

export default function SearchRestaurants() {
    document.title = "Near me"
  return (
    <div>
        <Header/>
        <RestaurantsNear/>
        <h1>Search Restaurant</h1>
    </div>
  )
}
