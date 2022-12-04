import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Slider from '../components/slider/Slider'
import Chat from '../components/chatbot/Chat'
import Categories from '../components/category/Categories'
import Products from '../components/product/Products'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Products/>
      <Chat/>
    </div>
  )
}

export default Home
