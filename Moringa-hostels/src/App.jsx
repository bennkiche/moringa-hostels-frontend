import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 import Footer from './Components/Footer'
import Contact from './Components/Contact'
// import AccommodationListing from './Components/AccommodationListing'
import Accommodate from './Accommodate/Accommodate'
import Room from './Rooms/Room'

function App() {

  return (
    <>
     <div className="App">
      {/* <AccommodationListing/> */}
      <Accommodate/>
      <Room/>
      <Contact />
      <Footer />
    </div>
    </>
  )
}

export default App
