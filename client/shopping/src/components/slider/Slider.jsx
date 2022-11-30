import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React from 'react'
import './slider.css'

const Slider = () => {
  return (
    <div className='sl_container'>
        <div className="sl_arrow sl_left">
            <ArrowLeftOutlined/>
        </div>
        <div className="sl_wrapper">
          <div className='sl_slide'>
            <div className="sl_img">
              {/* <img src="https://ssstutter.com/img/lookbook/1.jpg" alt="" className="sl_img__item" /> */}
            </div>
            <div className="sl_info">
          </div>

          </div>
        </div>
        <div className="sl_arrow sl_right">
            <ArrowRightOutlined/>
        </div>
    </div>
  )
}

export default Slider