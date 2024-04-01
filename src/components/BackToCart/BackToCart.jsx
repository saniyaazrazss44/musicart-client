import React from 'react'
import './BackToCart.css'
import { Link } from 'react-router-dom'

const BackToCart = () => {
    return (
        <div style={{ width: '100%' }}>
            <Link to="/view-cart" style={{ textDecoration: 'none' }}>
                <div className='back-to-cart roboto-medium'>
                    Back to cart
                </div>
            </Link>
        </div>
    )
}

export default BackToCart