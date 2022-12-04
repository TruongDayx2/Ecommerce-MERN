import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import Announcement from './Announcement'
import "./navbar.css"

const Navbar = () => {
  return (
    <>
      <Announcement/>
      <div className='nb_container'>
        <div className="nb_wrapper">
          <div className="nb_left">
            <div className="nb_language">EN</div>
            <div className="nb_search">
              <input type="text" className="nb_input" />
              <Search style={{color:'gray',fontSize:16}}/>
            </div>
          </div>
          <div className="nb_center">
            <h1>77Shop</h1>
          </div>
          <div className="nb_right">
  
            <div className="nb_menuItem">REGISTER</div>
            <div className="nb_menuItem">SIGN IN</div>
            <div className="nb_menuItem">
              <Badge badgeContent={3} color="primary" overlap="rectangular">
                <ShoppingCartOutlined/>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
