import React from 'react'
import './restaurantcss/restaurantReviews.css'
export default function Reviews( {data} ) {

    function Reviews() {  
        console.log(data?.reviews);
        const allReviews = data.reviews;
        return (
          allReviews?.map((res) => {
            if(res.text === "") { 
              return null;
            }
            else { 
              return (
                 <div key={res.time} className="review-container">
                    <div className="review-name">
                      <h3>{res.author_name} <strong className='notStrong'>({res.relative_time_description})</strong></h3>
                    </div>
                    <div className="review-img">
                      <img referrerPolicy="no-referrer" src={res.profile_photo_url} alt="IMG" />
                    </div>
                    <div className="review-content">
                      <p><q>{res.text}</q></p>
                    </div>
                    <div className="review-rating">
                      <i className="fa-solid fa-star"> </i><h3>{res.rating}/5</h3>
                    </div>
                  </div>
              )
            }
          })
        )
      }

      
      
  return (
    <section id='reviews'>
      <h1 className='reviews-title'>"REVIEWS"</h1>
      <Reviews/>
    </section>
  )
}
