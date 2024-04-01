import React, { useState } from 'react'
import './Header.css'
import PhoneIcon from '../../assets/icons/phone-icon.png'

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.clear();
            setIsLoggedIn(false);
            window.location.reload();
        }
    };

    const handleLogin = () => {
        window.location.href = '/sign-in'
    }

    return (
        <div className='headerMain'>
            <div className='headerText1'>
                <img src={PhoneIcon} alt="phone" />
                <h3 className='roboto-regular'>912121131313</h3>
            </div>
            <div className='headerText2'>
                <h3 className='roboto-medium'>Get 50% off on selected items | Shop Now</h3>
            </div>
            <div className='headerText'>
                {isLoggedIn ? (
                    <h3 onClick={handleLogout} className='roboto-bold'>Logout</h3>
                ) : (
                    <h3 onClick={handleLogin} className='roboto-bold'>Login | Signup</h3>
                )}
            </div>
        </div>
    )
}

export default Header