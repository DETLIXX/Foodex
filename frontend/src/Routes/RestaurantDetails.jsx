import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from '../const/Header';
import RestaurantBody from '../const/Restaurant/RestaurantBody'
import Reviews from '../const/Restaurant/Reviews'



const LOCAL_STORAGE = "local.details.key"


export default function Restaurant() {

    // TODO Give details about restaurant
    let { place_id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([])

    

    if(restaurantDetails.length === 0) {
        document.title = "Foodex"
    }
    else { 
        document.title = restaurantDetails.name
    }

        // Call Google Place Details and pass it into RestaurantPage
        // Restaurant Page will render Restaurant Page with reviews etc

    useEffect(() => {
        const storedRestaurant = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
        try {
            if(storedRestaurant) {setRestaurantDetails(storedRestaurant)
                if(storedRestaurant.place_id === place_id) { 
                    console.log("Same Restaurant");
                }
                else { 
                    console.log("Refreshing");
                    getPlaceDetails();
                }
                console.log("Loading Data from Storage");
            } 
            else { 
                console.log("get Details");
                getPlaceDetails();
            }
        } catch (error) {
           console.log(error); 
        }
    }, [])

    useEffect(() => { 
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(restaurantDetails))
    }, [restaurantDetails])

    

    const getPlaceDetails = async () => {
        const response = await fetch(`http://localhost:3001/api/placedetails/${place_id}`)
        if(!response) throw new Error("We cant find that palce")
        const data = await response.json();
        setRestaurantDetails(data.result)
    }

    console.log(restaurantDetails);
    return (
        <div>
            <Header/>
            <RestaurantBody id={uuidv4()} data={restaurantDetails}/>
            <Reviews data={restaurantDetails}/>
        </div>
    )
}
