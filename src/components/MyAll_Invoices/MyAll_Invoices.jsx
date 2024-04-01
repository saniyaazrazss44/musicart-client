import React, { useEffect, useState } from 'react'
import './MyAll_Invoices.css'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import Footer from '../Footer/Footer'
import InvoiceIcon from '../../assets/icons/invoice-icon.png'
import { Link } from 'react-router-dom'
import { viewAllInvoices } from '../../apis/invoiceApis'
import ViewCart2 from '../ViewCart2/ViewCart2'
import Mobile_Header from '../Mobile_Header/Mobile_Header'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'
import BackToMobileProducts from '../BackToMobileProducts/BackToMobileProducts'
import MobileInvoiceLogo from '../../assets/icons/mobile_invoiceLogo.png'

const MyAll_Invoices = () => {

    const user_Id = localStorage.getItem('userId')
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const [allInvoices, setAllInvoices] = useState([])

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function fetchAllInvoices() {
            const response = await viewAllInvoices(payload)
            setAllInvoices(response.invoices)
        }

        fetchAllInvoices()

    }, [])

    return (
        <div className='myallinvoices-page'>
            <div className='myallinvoices-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <Mobile_Header />
                </div>

                <div className='myallinvoices-div-container'>
                    <div className='myallinvoices-div'>
                        <div className='home-allinvoices-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a> / Invoices
                            </div>
                        </div>
                        <ViewCart2 />
                    </div>
                    <div className='backToProducts' style={{ width: '100%' }}>
                        <Link to='/' style={{ textDecoration: "none", width: '100%' }}>
                            <div className='back-to-home roboto-medium'>
                                Back to Home
                            </div>
                        </Link>
                    </div>
                    <div className='backToMobileProducts'>
                        <BackToMobileProducts />
                    </div>
                    <div className='myallinvoices'>
                        <div className='myallinvoices-first-div'>
                            <img src={MobileInvoiceLogo} alt="logo" />
                            <h1 className='roboto-bold'>
                                My Invoices
                            </h1>
                        </div>

                        {isLoggedIn ? (
                            <div className='myallinvoices-second-div'>
                                {allInvoices.map((invoice, index) => (

                                    <div key={index} className='myallinvoices-secondDiv-container'>
                                        <div className='myallinvoices-invoice-details'>
                                            <div className='myallinvoices-invoice-icon'>
                                                <img src={InvoiceIcon} alt="invoice" />
                                            </div>
                                            <div className='myallinvoices-invoice-name roboto-medium'>
                                                <div>{invoice.name}</div>
                                                <div>{invoice.address}</div>
                                            </div>
                                        </div>
                                        <div className='myallinvoices-btn-viewInvoice'>
                                            <Link to={`/invoices/${invoice.invoiceId}`}>
                                                <button className='roboto-bold'>View Invoice</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            window.location.href = '/'
                        )}

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

export default MyAll_Invoices