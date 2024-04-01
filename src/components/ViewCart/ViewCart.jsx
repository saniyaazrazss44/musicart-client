import React, { useEffect, useState } from 'react'
import './ViewCart.css'
import ViewCartImg from '../../assets/icons/viewCart.png'
import { Link } from 'react-router-dom'
import { viewCartCount } from '../../apis/cartApis'

const ViewCart = () => {

    const user_Id = localStorage.getItem('userId')
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function itemsCount() {

            const response = await viewCartCount(payload)
            setCartItemCount(response.count)
            return 
        }

        itemsCount()
    }, [])

    return (
        <div>
            <Link to="/view-cart" style={{ textDecoration: 'none' }}>
                <div className='view-cart-main'>
                    <div className='view-cart-img'>
                        <img src={ViewCartImg} alt="cart" />
                    </div>
                    <div className='view-cart-text roboto-medium'>View Cart</div>
                    <div className='view-cart-count roboto-medium'>{cartItemCount}</div>
                </div>
            </Link>
        </div>
    )
}

export default ViewCart