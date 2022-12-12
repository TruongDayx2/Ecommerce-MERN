import React from 'react'
import { Send } from "@material-ui/icons";

import './newLetter.css'

const NewLetter = () => {
  return (
    <div>
      <div className="letter_container">
        <h1 className="letter_title">New Letter</h1>
        <p className="letter_desc">Get timely updates from your favorite products</p>
        <div className="letter_inputContainer">
            <input type="text" className="letter_input" placeholder='Your Email'/>
            <button className="letter_btn">
                <Send/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default NewLetter
