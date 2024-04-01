import React, { useEffect, useState } from 'react'
import './Invoice.css'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import BackToCart from '../BackToCart/BackToCart'
import Footer from '../Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import { viewInvoice } from '../../apis/invoiceApis'
import Mobile_Header from '../Mobile_Header/Mobile_Header'
import BackToMobileCart from '../BackToMobileCart/BackToMobileCart'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'

const Invoice = () => {

    const { invoiceId } = useParams()
    const [userInvoice, setUserInvoice] = useState({})
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {

        let payload = {
            invoiceId: invoiceId
        }

        async function fetchInvoice() {
            const response = await viewInvoice(payload)
            setUserInvoice(response.response)
        }

        fetchInvoice()
    }, [])

    const handleImageClick = (productId) => {
        setSelectedProductId(productId);
    };

    return (
        <div className='invoice-page'>
            <div className='invoice-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <Mobile_Header />
                </div>

                <div className='invoice-div-container'>
                    <div className='invoice-div'>
                        <div className='home-allinvoices-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a> / Invoices
                            </div>
                        </div>
                    </div>
                    <div className='backToProducts'>
                        <BackToCart />
                    </div>
                    <div className='backToMobileProducts'>
                        <BackToMobileCart />
                    </div>
                    <div className='invoice'>
                        <div className='invoice-first-div'>
                            <h1 className='roboto-bold'>
                                Invoice
                            </h1>
                        </div>

                        <div className='invoice-second-div'>
                            <div className='invoice-secondDiv-container'>
                                <div className='invoice-container-info'>

                                    <div className='invoice-info-list information-list1'>
                                        <span>
                                            1. Delivery address
                                        </span>
                                        <div id='information-header' className='invoice-textarea'>
                                            <p className='roboto-medium'>{userInvoice.name}</p>
                                            <textarea value={userInvoice.address} className='roboto-medium' cols="30" rows="4" placeholder='Your Address' disabled></textarea>
                                        </div>
                                    </div>

                                    <div className='invoice-info-list information-list2'>
                                        <span>
                                            2. Payment method
                                        </span>
                                        <div id='information-header' className='invoice-select-payment'>
                                            <div className='roboto-medium'>
                                                {userInvoice.mode_of_payment}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='invoice-info-list information-list3'>
                                        <span>
                                            3. Review items and delivery
                                        </span>
                                        <div id='information-header' className='invoice-allProduct-info'>
                                            <div className='invoice-product-grid'>
                                                {userInvoice.products && userInvoice.products.map((prod, index) => (
                                                    <div key={index} onClick={() => handleImageClick(prod.product._id)} className='product-gridImage'>
                                                        <img src={prod.product.img[0].img_1} alt="product" />
                                                    </div>
                                                ))}
                                            </div>

                                            {userInvoice.products && userInvoice.products.map((prod, index) => (
                                                <div key={index} className='invoice-product-gridInfo' style={{ display: selectedProductId === prod.product._id ? 'block' : 'none' }}>
                                                    <h2 className='roboto-bold'>{prod.product.brand} {prod.product.model}</h2>
                                                    <h3 className='roboto-medium' style={{ color: '#797979' }}>Colour : {prod.product.color}</h3>
                                                    <h3 className='roboto-medium'>
                                                        <div>{userInvoice.delivery}</div>
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='invoice-second-secondPart'>
                                <div className='invoice-order-summary'>
                                    <h2 className='roboto-bold'>
                                        Order Summary
                                    </h2>
                                </div>
                                <div className='invoice-items-delivery roboto-bold'>
                                    <p>
                                        <span>Items : </span>
                                        <span>₹ {userInvoice.total}</span>
                                    </p>
                                    <p>
                                        <span>Delivery : </span>
                                        <span>₹ {userInvoice.convenienceFee}</span>
                                    </p>
                                </div>
                                <div className='invoice-order-total roboto-bold'>
                                    <span>Order Total : </span>
                                    <span>₹ {userInvoice.cartTotal}</span>
                                </div>
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
        </div>
    )
}

export default Invoice