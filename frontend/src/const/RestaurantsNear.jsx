import React, { useEffect, useState } from 'react'
import CRC from './CreateRestaurantCard'
import '../css/restaurantsnear.css'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE = "local.restaurant.key"

export default function RestaurantsNear() { 

    // TODO This will show all near restaurants

    const [restaurants, setRestaurants] = useState([]);

    async function locateRestaurant () {
        setRestaurants([]);
        console.log("Locating...");
        const coords = await getLocation()
        const restaurants = await getRestaurants(...coords);
        restaurants.sort((a,b) => a.opening_hours?.open_now === b.opening_hours?.open_now ? 0 : a.opening_hours?.open_now ? -1 : 1);
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
        const response = await fetch(`http://localhost:3001/api/places/${lat}&${long}&1500`)
        if(!response) throw new Error("We can't find you")
        const data = await response.json()
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

    useEffect(()=>{(
        async()=>{
        try {
            const storedRestaurant = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
            if(storedRestaurant) {
                 setRestaurants(storedRestaurant)
            } 
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

    var test;

    return (
        <section id='restaurants'>
            <div className="restaurants-title">
            <div className="restaurant-sorting">
                    <select name="sortRating" id="sort-by-rating">
                        <option value="Best">Best Reviewed</option>
                        <option value="Worst">Worst Reviewed</option>
                    </select>
                    <select name="sortPrice" id="sort-by-price">
                        <option value="Expensive">Expensive</option>
                        <option value="Cheap">Cheap</option>
                    </select>
                </div>
                <button id='updateBtn' onClick={locateRestaurant}>Update Restaurant</button>
                <p>We found {restaurants.length} results near you</p>
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