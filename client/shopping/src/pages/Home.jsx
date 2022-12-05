import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Slider from '../components/slider/Slider'
import Chat from '../components/chatbot/Chat'
import Categories from '../components/category/Categories'
import Products from '../components/product/Products'
import NewLetter from '../components/newLetter/NewLetter'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Products/>
      <NewLetter/>
      <Chat/>
    </div>
  )
}

export default Home
