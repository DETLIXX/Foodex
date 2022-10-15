import React from 'react'
import Header from '../const/Header'
import Landing from '../const/Landing'


export default function Home() {
  document.title = "Foodex"
  return (
    <div>
        <Header/>
        <Landing/>
    </div>
  )
}
