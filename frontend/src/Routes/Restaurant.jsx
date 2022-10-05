import React from 'react'
import { useParams } from 'react-router-dom'
import RestaurantPage from '../const/Restaurant/restaurantBody'
export default function Restaurant() {
    let { place_id } = useParams();
    document.title = "Restaurant"
  return (

    // Call Google Place Details and pass it into RestaurantPage
    // Restaurant Page will render Restaurant Page with reviews etc

    <div>
        <RestaurantPage />
    </div>
  )
}
