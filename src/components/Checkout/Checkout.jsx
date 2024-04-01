import React, { useEffect, useState } from 'react'
import './Checkout.css'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import Footer from '../Footer/Footer'
import BackToCart from '../BackToCart/BackToCart'
import SearchIcon from '../../assets/icons/search-icon.png'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { createInvoice, viewCheckout } from '../../apis/invoiceApis'
import BackToMobileProducts from '../BackToMobileProducts/BackToMobileProducts'
import BackToMobileCart from '../BackToMobileCart/BackToMobileCart'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'
import Mobile_Header from '../Mobile_Header/Mobile_Header'

const Checkout = () => {

    const user_Id = localStorage.getItem('userId')
    const [userCheckout, setUserCheckout] = useState({})
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function fetchCheckoutDetails() {
            const response = await viewCheckout(payload)
            setUserCheckout(response.checkoutDetails)
            return
        }

        fetchCheckoutDetails()
    }, [])

    const handlePlaceYourOrder = async () => {
        const inpAddress = document.getElementById('inpAddress').value;
        const modeOfPayment = document.getElementById('modeOfPayment').value;

        if (inpAddress.trim() === "") {
            toastr.error("Please enter your address");
            return false;
        } else if (modeOfPayment.trim() === "") {
            toastr.error("Please select your payment mode");
            return false;
        }

        let payload = {
            userId: user_Id,
            address: inpAddress,
            mode_of_payment: modeOfPayment
        };

        try {
            const response = await createInvoice(payload);
            toastr.success(response.message)

            setTimeout(() => {
                window.location.href = '/order-successful'
            }, 1500)

        } catch (error) {
            console.error(error);
        }
    }

    const handleImageClick = (productId) => {
        setSelectedProductId(productId);
    };

    return (
        <div className='checkout-page'>
            <div className='checkout-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <Mobile_Header />
                </div>

                <div className='checkout-div-container'>
                    <div className='checkout-div'>
                        <div className='home-checkout-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a> / Checkout
                            </div>
                        </div>
                    </div>
                    <div className='backToProducts'>
                        <BackToCart />
                    </div>
                    <div className='backToMobileProducts'>
                        <BackToMobileCart />
                    </div>
                    <div className='checkout'>
                        <div className='checkout-first-div'>
                            <h1 className='roboto-bold'>
                                Checkout
                            </h1>
                        </div>

                        <div className='checkout-second-div'>
                            <div className='checkout-secondDiv-container'>
                                <div className='checkout-container-info'>

                                    <div className='checkout-info-list info-list1'>
                                        <span>
                                            1. Delivery address
                                        </span>
                                        <div id='info-header' className='checkout-textarea'>
                                            <p className='roboto-medium'>{userCheckout.user}</p>
                                            <textarea id='inpAddress' className='roboto-medium' cols="30" rows="4" placeholder='Your Address'></textarea>
                                        </div>
                                    </div>

                                    <div className='checkout-info-list info-list2'>
                                        <span>
                                            2. Payment method
                                        </span>
                                        <div id='info-header' className='checkout-select-payment'>
                                            <select id='modeOfPayment' className='roboto-medium'>
                                                <option value="">Mode of payment</option>
                                                <option value="Pay On Delivery">Pay On Delivery</option>
                                                <option value="UPI">UPI</option>
                                                <option value="Card">Card</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='checkout-info-list info-list3'>
                                        <span>
                                            3. Review items and delivery
                                        </span>

                                        <div id='info-header' className='checkout-allProduct-info'>
                                            <div className='checkout-product-grid'>
                                                {userCheckout.products && userCheckout.products.map((item, index) => (
                                                    <div key={index} onClick={() => handleImageClick(item.product._id)} className='product-gridImage'>
                                                        <img src={item.product.img && item.product.img[0].img_1} alt="product" />
                                                    </div>
                                                ))}
                                            </div>

                                            {userCheckout.products && userCheckout.products.map((item, index) => (
                                                <div key={index} className='checkout-product-gridInfo' style={{ display: selectedProductId === item.product._id ? 'block' : 'none' }}>
                                                    <h2 className='roboto-bold'>{item.product.brand} {item.product.model}</h2>
                                                    <h3 className='roboto-medium' style={{ color: '#797979' }}>Colour : {item.product.color}</h3>
                                                    <h3 className='roboto-medium'>
                                                        <div>{userCheckout.estimatedDelivery}</div>
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>

                                <div className='checkout-placeOrder-container'>
                                    <div className='checkout-placeOrder-button'>

                                        <button onClick={handlePlaceYourOrder} className='roboto-bold'>Place your order</button>

                                    </div>
                                    <div className='checkout-placeOrder-total'>
                                        <span className='checkout-span1 roboto-bold'>
                                            Order Total : ₹ {userCheckout.orderTotal}
                                        </span>
                                        <span className='checkout-span2 roboto-regular'>
                                            By placing your order, you agree to Musicart privacy notice and conditions of use.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='checkout-second-secondPart'>
                                <div className='checkout-place-your-order'>

                                    <button onClick={handlePlaceYourOrder} className='roboto-bold'>
                                        Place your order
                                    </button>

                                </div>
                                <div className='checkout-textContent'>
                                    <p className='roboto-medium'>
                                        By placing your order, you agree to Musicart privacy
                                        notice and conditions of use.
                                    </p>
                                </div>
                                <div className='checkout-order-summary'>
                                    <h2 className='roboto-bold'>
                                        Order Summary
                                    </h2>
                                </div>
                                <div className='checkout-items-delivery roboto-bold'>
                                    <p>
                                        <span>Items : </span>
                                        <span>₹ {userCheckout.total}</span>
                                    </p>
                                    <p>
                                        <span>Delivery : </span>
                                        <span>₹ {userCheckout.convenienceFee}</span>
                                    </p>
                                </div>
                                <div className='checkout-order-total roboto-bold'>
                                    <span>Order Total : </span>
                                    <span>₹ {userCheckout.orderTotal}</span>
                                </div>
                            </div>
                            <div className='checkout-place-your-Mobileorder'>
                                <button onClick={handlePlaceYourOrder} className='roboto-bold'>
                                    Place your order
                                </button>
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

export default Checkout