import React from 'react'
import { Link } from 'react-router-dom'
 
export default function CreateRestaurantCard( { data }) {

  // TODO Create card array for RestaurantNear.jsx


  function IsClosed () {
    if(!data?.opening_hours?.open_now) { 
      return (
            <div className='isClosed'>
              <h2>This restaurant is currently closed <br /> <br /><i className="fa-solid fa-lock fa-2x"></i></h2>
            </div>
      )
    }
  }
  
  function CheckOpenState() { 
    if (data?.opening_hours?.open_now) { 
     return <p className='open'><strong>OPEN</strong>: Closes</p>
    }
    else { 
     return <p className='closed'><strong>CLOSED</strong>: Closes</p>
    }
  }

  if(data.permanently_closed) { 
    return
  }else { 
    return (
      <Link to={`/restaurant/${data.place_id}`}>
        <div className="restaurant-card">
          <img className='restaurant-card-background' src={require('../resources/Pizza.png')} alt="" />
            <div className="restaurant-card-container">
                <IsClosed/>
                <div className="restaurant-title">
                  <div className="restaurant-title-content">
                    <h2>{data.restaurantName}</h2>
                    <p>{data.types[0]}</p>
                  </div>
                </div>
                <div className="restaurant-mid">
                  <div className="restaurant-hours-content">
                        <CheckOpenState/>
                  </div>
                </div>
                <div className="restaurant-bottom">
                  <div className="restaurant-bottom-content">
                  </div>
                  <div className="restaurant-bottom-content"></div>
                </div>
            </div>
        </div>
      </Link>
    )
  }
}
