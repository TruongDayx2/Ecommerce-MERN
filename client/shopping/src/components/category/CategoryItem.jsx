import React from 'react'

import './categoryItem.css'

const CategoryItem = ({item}) => {
  return (
    <div className='cateItem_container'>
      <img src={item.img} alt="" className="cateItem_img" />
      <div className="cateItem_info">
        <h1 className="cateItem_title">{item.title}</h1>
        <button className="cateItem_btn">SHOW NOW</button>
      </div>
    </div>
  )
}

export default CategoryItem
