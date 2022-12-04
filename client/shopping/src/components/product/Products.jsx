import React from 'react'

import './products.css'
import {popularProducts} from '../../data'
import Product from './Product'

const Products = () => {
  return (
    <div className='proS_container'>
      {popularProducts.map((item)=>(
        <Product item={item} key={item.id}/>
      ))}
    </div>
  )
}

export default Products
