import React from 'react'

import './products.css'
import {popularProducts} from '../../data'
import Product from './Product'

const Products = ({cate,filter,sort}) => {
  console.log(cate,filter,sort);
  return (
    <div className='proS_container'>
      {popularProducts.map((item)=>(
        <Product item={item} key={item.id}/>
      ))}
    </div>
  )
}

export default Products
