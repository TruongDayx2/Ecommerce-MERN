import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Slider from '../components/slider/Slider'
import Chat from '../components/chatbot/Chat'
import Categories from '../components/category/Categories'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Chat/>
    </div>
  )
}

export default Home
