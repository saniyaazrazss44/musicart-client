import React from 'react'
import './BackToProducts.css'
import { Link } from 'react-router-dom'

const BackToProducts = () => {
    return (
        <div style={{ width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className='back-to-products roboto-medium'>
                    Back to products
                </div>
            </Link>
        </div>
    )
}

export default BackToProducts