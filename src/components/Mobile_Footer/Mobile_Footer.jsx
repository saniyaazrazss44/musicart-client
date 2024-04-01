import React, { useEffect, useState } from 'react'
import MobileHomeIcon from '../../assets/icons/mobile_home.png'
import MobileCartIcon from '../../assets/icons/mobile_cart.png'
import MobileInvoiceIcon from '../../assets/icons/mobile_invoice.png'
import MobileLoginIcon from '../../assets/icons/mobile_login.png'
import MobileLogoutIcon from '../../assets/icons/mobile_logout.png'
import './Mobile_Footer.css'
import { Link, useLocation } from 'react-router-dom'
import { viewCartCount } from '../../apis/cartApis'

const Mobile_Footer = () => {

    const user_Id = localStorage.getItem('userId')
    const [cartItemCount, setCartItemCount] = useState(0)
    const location = useLocation();

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

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    const handleLogout = () => {
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        if (isConfirmed) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    };

    return (
        <div className='mobile-container'>
            <div className='mobile-div'>
                <Link to='/' className={location.pathname === '/' ? 'mobile-footer-div active' : 'mobile-footer-div'} style={{ textDecoration: 'none' }}>
                    <div className='mobile-footer-div'>
                        <img src={MobileHomeIcon} alt="home" />
                        <span>Home</span>
                    </div>
                </Link>

                <Link to='/view-cart' className={location.pathname === '/view-cart' ? 'mobile-footer-div active' : 'mobile-footer-div'} style={{ textDecoration: 'none' }}>
                    <div className='mobile-footer-div'>
                        <div className='mobile-cart-countImg-div'>
                            <img className="mobile-cart-countImg" src={MobileCartIcon} alt="cart" />
                            <div className='mobile-cart-count'>{cartItemCount}</div>
                        </div>
                        <span>Cart</span>
                    </div>
                </Link>

                <Link to='/my-invoices' className={location.pathname === '/my-invoices' ? 'mobile-footer-div active' : 'mobile-footer-div'} style={{ textDecoration: 'none' }}>
                    <div className='mobile-footer-div'>
                        <img src={MobileInvoiceIcon} alt="invoice" />
                        <span>Invoice</span>
                    </div>
                </Link>

                {isLoggedIn() ? (
                    <div className='mobile-footer-div' onClick={handleLogout}>
                        <img src={MobileLogoutIcon} alt="logout" />
                        <span>Logout</span>
                    </div>
                ) : (
                    <Link to='/sign-in' style={{ textDecoration: 'none' }}>
                        <div className='mobile-footer-div'>
                            <img src={MobileLoginIcon} alt="login" />
                            <span>Login</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Mobile_Footer