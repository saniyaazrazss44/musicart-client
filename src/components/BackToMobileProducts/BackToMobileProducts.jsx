import React from 'react'
import './BackToMobileProducts.css'
import { Link } from 'react-router-dom'
import BackIcon from '../../assets/icons/back_icon.png'

const BackToMobileProducts = () => {
    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className='back-mobile-to-products roboto-medium'>
                    <img src={BackIcon} alt="back" />
                </div>
            </Link>
        </div>
    )
}

export default BackToMobileProducts