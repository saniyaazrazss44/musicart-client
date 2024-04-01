import React from 'react'
import './Mobile_Header.css'
import MusicartLogo from '../../assets/images/musicart_logo.png'

const Mobile_Header = () => {
    return (
        <div className='mobileHeaderMain'>
            <div className='musicartMain'>
                <img src={MusicartLogo} alt="musicart logo" />
                <h1 className='roboto-bold' style={{ color: '#ffffff' }}>Musicart</h1>
            </div>
        </div>
    )
}

export default Mobile_Header