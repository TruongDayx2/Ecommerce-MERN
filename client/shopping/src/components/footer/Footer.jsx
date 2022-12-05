import { Facebook, Instagram, LinkedIn, MailOutline, Phone, Room, YouTube } from '@material-ui/icons'
import React from 'react'

import './footer.css'

const Footer = () => {
  return (
    <div className='ft_container'>
        <div className="ft_left">
            <h1 className="ft_logo">77Shop</h1>
            <p className="ft_desc">With the message "Refined Life", 77Shop wishes to bring customers a compact lifestyle with exquisite fashion products.</p>
            <div className="ft_social">
                <div className="ft_socialIcon" style={{ backgroundColor: "#3B5999" }}>
                    <Facebook/>
                </div>
                <div className="ft_socialIcon" style={{ backgroundColor: "#E4405F" }}>
                    <Instagram/>
                </div>
                <div className="ft_socialIcon" style={{ backgroundColor: "#0a66c2" }}>
                    <LinkedIn/>
                </div>
                <div className="ft_socialIcon" style={{ backgroundColor: "red" }}>
                    <YouTube/>
                </div>
            </div>
        </div>
        <div className="ft_center">
            <h3 className="ft_title">Useful Links</h3>
            <ul className="ft_list">
                <li className="ft_listItem">Home</li>
                <li className="ft_listItem">Cart</li>
                <li className="ft_listItem">Man Fashion</li>
                <li className="ft_listItem">Woman Fashion</li>
                <li className="ft_listItem">Accessories</li>
                <li className="ft_listItem">My Account</li>
                <li className="ft_listItem">Order Tracking</li>
                <li className="ft_listItem">Wishlist</li>
            </ul>
        </div>
        <div className="ft_right">
            <h3 className="ft_title">Contact</h3>
            <div className="ft_contactItem">
                <Room style={{marginRight:"10px"}}/>
                130/8 8 Street, Linh Xuan, Thu Duc, Ho Chi Minh City 
            </div>
            <div className="ft_contactItem">
                <Phone style={{marginRight:"10px"}}/>
                +84 123 456 789
            </div>
            <div className="ft_contactItem">
                <MailOutline style={{marginRight:"10px"}}/>
                77shop@gmail.com
            </div>
            <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" className="ft_payment" />
        </div>
    </div>
  )
}

export default Footer
