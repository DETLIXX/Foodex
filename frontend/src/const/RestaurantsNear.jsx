import React, { useEffect, useState } from 'react'
import CRC from './CreateRestaurantCard'
import '../css/restaurants.css'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE = "local.restaurant.key"

export default function RestaurantsNear() { 

    async function locateRestaurant () {
        console.log("Locating...");
        const coords = await getLocation()
        const restaurants = await getRestaurants(...coords)
        setRestaurants(restaurants)
    }

    const getLocation = () => 
    new Promise((res, rej) => 
        navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude}}) => res([latitude, longitude]),
        rej
        )
    )

    const getRestaurants = async (lat, long) => {
        console.log(lat, long);
        const response = await fetch(`http://localhost:3001/api/places/${lat}&${long}&3000`)
        if(!response) throw new Error("We can't find you")
        const data = await response.json()
        console.log(data);
        return data.map(
            ({ name, vicinity, rating, user_ratings_total, types, opening_hours, permanently_closed, place_id}) => ({
                id: uuidv4(),
                restaurantName: name,
                address: vicinity,
                rating,
                user_ratings_total,
                types,
                opening_hours,
                permanently_closed,
                place_id
            }
            )
        )
    }

    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{(
        async()=>{
        try {
            const storedRestaurant = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
            if(storedRestaurant) {setRestaurants(storedRestaurant)
             console.log("Success Loaded Storage");} 
            else { 
                locateRestaurant();
            }
        } catch(e) {
            console.error(e)
        }
    })()}, []);


    useEffect(() => { 
        localStorage.setItem(LOCAL_STORAGE, JSON.stringify(restaurants))
    }, [restaurants])

        try {
            const test = restaurants.sort((a, b) => Number(b.opening_hours) - Number(a.opening_hours));

        } catch (error) {
            console.log(error);
        }

    return (
        <section id='restaurants'>
            <div className="restaurants-title">
                <button onClick={locateRestaurant}>Update Restaurant</button>
            </div>
            <div className="restaurant-holder">
                {
                    restaurants.map(res => {
                        return <CRC key={res.id} data={res}/>
                    })
                }
            </div>
        </section>
    )
}