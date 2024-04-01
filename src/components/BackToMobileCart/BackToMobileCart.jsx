import React from 'react'
import './BackToMobileCart.css'
import { Link } from 'react-router-dom'
import BackIcon from '../../assets/icons/back_icon.png'

const BackToMobileCart = () => {
    return (
        <div>
            <Link to="/view-cart" style={{ textDecoration: 'none' }}>
                <div className='back-mobile-to-cart roboto-medium'>
                    <img src={BackIcon} alt="back" />
                </div>
            </Link>
        </div>
    )
}

export default BackToMobileCart