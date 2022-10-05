import React from 'react'
import '../css/Landing.css'

export default function  Landing() {
  return (
    <section id='landing'>
        <div className="landing-container">
            <div className="landing-left landing-content">
                <div className="available-delivery">
                    <div className="delivery">
                    <h4><i className="fa-regular fa-clock "></i>  AVAILABLE NOW</h4>
                    </div>
                </div>
                <h1>
                    ALL NEAR <strong>RESTAURANTS</strong> <br />
                    IN <strong>ONE PLACE</strong>
                </h1>
                <h4>
                    Looking for food in your location ? Here you can find everything
                </h4>
                <div className="landing-bottom">
                    <button className='place-order'>ORDER NOW</button>
                    <button className='track-order'><i className="fa-sharp fa-solid fa-location-dot"></i></button>
                </div>
            </div>
            <div className="landing-right landing-content">
                <img  src={require('../resources/delivery_img.jpg')} alt="" />
            </div>
        </div>
    </section>
  )
}
