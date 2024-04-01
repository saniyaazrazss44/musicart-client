import React from 'react'
import './Musicart.css'
import MusicartLogo from '../../assets/images/musicart_logo.png'

const Musicart = () => {
    return (
        <div>
            <div className='musicartMain'>
                <img src={MusicartLogo} alt="musicart logo" />
                <h1 className='roboto-bold'>Musicart</h1>
            </div>
        </div>
    )
}

export default Musicart