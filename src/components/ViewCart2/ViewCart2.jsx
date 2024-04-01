import React from 'react'
import './ViewCart2.css'
import { Link } from 'react-router-dom'
import ViewCartImg from '../../assets/icons/viewCart.png'

const ViewCart2 = () => {
    return (
        <div>
            <Link to="/view-cart" style={{ textDecoration: 'none' }}>
                <div className='view-cart-main'>
                    <div className='view-cart-img'>
                        <img src={ViewCartImg} alt="cart" />
                    </div>
                    <div className='view-cart-text roboto-medium'>View Cart</div>
                </div>
            </Link>
        </div>
    )
}

export default ViewCart2