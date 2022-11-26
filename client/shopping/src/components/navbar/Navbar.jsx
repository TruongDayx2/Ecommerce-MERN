import React from 'react'
import "./navbar.css"

const Navbar = () => {
  return (
    <div className='nb_container'>
      <div className="nb_wrapper">
        <div className="nb_left">
          <div className="nb_language">EN</div>
          <div className="nb_search">
            
          </div>
        </div>
        <div className="nb_center">center</div>
        <div className="nb_right">right</div>
      </div>
    </div>
  )
}

export default Navbar
