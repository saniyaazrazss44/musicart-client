import React, { useEffect, useState } from 'react'
import './OrderSuccessful.css'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import Footer from '../Footer/Footer'
import OrderSuccessfulImg from '../../assets/images/order-successful.png'
import { Link } from 'react-router-dom'
import Mobile_Header from '../Mobile_Header/Mobile_Header'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'

const OrderSuccessful = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        if (token && name) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (

        <div className='order-page'>
            {isLoggedIn ? (

                <div className='order-main'>
                    <div className='website-header'>
                        <Header />
                    </div>

                    <div className='mobile-Header'>
                        <Mobile_Header />
                    </div>

                    <div className='order-div-container'>
                        <div className='order-div'>
                            <Musicart />
                        </div>
                        <div className='order-body-container'>
                            <div className='order-body'>
                                <div className='order-body-content'>
                                    <img src={OrderSuccessfulImg} alt="order img" />
                                </div>
                                <div className='order-body-content div-content roboto-bold'>
                                    <div>
                                        Order is placed successfully!
                                    </div>
                                    <div className='order-details-text'>
                                        You  will be receiving a confirmation email with order details
                                    </div>
                                </div>
                                <div className='order-body-content'>
                                    <Link to="/">
                                        <button className='roboto-bold'>
                                            Go back to Home page
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='website-footer'>
                        <Footer />
                    </div>
                    <div className='mobile-Footer'>
                        <Mobile_Footer />
                    </div>
                </div>
            ) : (
                window.location.href = '/'
            )}

        </div>
    )
}

export default OrderSuccessful