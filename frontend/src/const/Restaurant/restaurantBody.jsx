import React from 'react'
import './restaurantcss/restaurantbody.css'


export default function RestaurantBody( {data} ) {

  // TODO Create body for Restaurant.jsx

    const DateNow = new Date();
    const day = DateNow.getDay() - 1; 

    //Google Place Details APIs. Yesterday it work fine and after-
    //I restart vs code it show undefined

    

    console.log(day); // this show 6

    const test = data?.opening_hours?.periods[day]; //This should show time of 5th day
    console.log(test); // But it show undefined



    function Open() { 
      const getHours = data?.opening_hours?.periods[day]?.close?.time;
      const hours = `${getHours?.slice(0,2)}:${getHours?.slice(2,4)}`

      return (
        <h3>
           <strong className='OPEN'>Open</strong> • Closes at {hours}
        </h3>
      )
    }

    function Closed() { 
      const getHours = data?.opening_hours?.periods[day]?.open?.time;

      const hours = `${getHours?.slice(0,2)}:${getHours?.slice(2,4)}`
      return (
        <h3>
           <strong className='CLOSED'>CLOSED</strong> • Open at {hours}
        </h3>
      )
    }

    function IsOpen() { 
      const open_now = data?.opening_hours?.open_now
      const getHours = data?.opening_hours?.periods[day]?.open?.time;
      if(getHours === undefined) { 
        return <Error/>
      }
      
      if(open_now) { 
        return <Open/>
      }
      else { 
        return <Closed/>
      }
    }

    return (
      <section id='restaurant-body'>
        <div className="header-bg">
          <img id='restaurant-img' src={require("../../resources/RestaurantImg.png")} alt="" />
          <div className="restaurant-bg-title">
            <div className="restaurant-rating">
              <p>
               <i className="fa-solid fa-star"> </i>{data.rating} | {data.user_ratings_total}
              </p>
            </div>
            <h1 className='restaurant-name'>{data.name}</h1>
            <h3 className='restaurant-type'>RESTAURANT</h3>
            <div className="hour-state">
              <IsOpen/>
            </div>
          </div>
        </div>
        <section id='photos'>
        </section>
      </section>
    )
}
