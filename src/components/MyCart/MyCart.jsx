import React, { useEffect, useState } from 'react'
import './MyCart.css'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import BackToProducts from '../BackToProducts/BackToProducts'
import MyCartIcon from '../../assets/icons/myCart.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import { Link } from 'react-router-dom'
import { viewCart, viewCartCount, cartTotal, updateCart } from '../../apis/cartApis'
import ViewCart2 from '../ViewCart2/ViewCart2'
import BackToMobileProducts from '../BackToMobileProducts/BackToMobileProducts'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'

const MyCart = () => {

    const user_Id = localStorage.getItem('userId')
    const [cartProducts, setCartProducts] = useState([])
    const [myCartItemCount, setMyCartItemCount] = useState(0)
    const [myCartTotal, setMyCartTotal] = useState({})

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function fetchCartProducts() {
            const response = await viewCart(payload)
            setCartProducts(response)
        }

        fetchCartProducts()
    }, [])

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function itemsCount() {

            const response = await viewCartCount(payload)
            setMyCartItemCount(response.count)
            return
        }

        itemsCount()
    }, [])

    useEffect(() => {

        let payload = {
            userId: user_Id
        }

        async function cartTotalCount() {

            const response = await cartTotal(payload)
            setMyCartTotal(response)
            return
        }

        cartTotalCount()
    }, [])

    const handleQuantityChange = async (productId, event) => {
        const newQuantity = event.target.value;

        await updateCart({
            userId: user_Id,
            productId: productId,
            quantity: newQuantity
        });

        window.location.reload()
    };

    return (
        <div className='mycart-page'>
            <div className='mycart-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <div className='inpMobileSearch'>
                        <img src={SearchIcon} alt="search" />
                        <input type="text" value='' placeholder='Search Musicart' />
                    </div>
                </div>

                <div className='mycart-div-container'>
                    <div className='mycart-div'>
                        <div className='home-viewcart-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a> / View Cart
                            </div>
                        </div>
                        <ViewCart2 />
                    </div>
                    <div className='backToProducts'>
                        <BackToProducts />
                    </div>
                    <div className='backToMobileProducts'>
                        <BackToMobileProducts />
                    </div>
                    <div className='mycart'>
                        <div className='mycart-first-div'>
                            <img src={MyCartIcon} alt="my cart" />
                            <h1 className='roboto-bold'>
                                My Cart
                            </h1>
                        </div>

                        <div className='mycart-second-div'>
                            <div className='mycart-firstPage'>
                                <div className='mycart-product-details'>
                                    {cartProducts.map((cart, index) => (

                                        <div key={index} className='mycart-all-product'>
                                            <div className='mycart-product-img'>
                                                <img src={cart.product.img[0].img_1} alt="product image" />
                                            </div>

                                            <div className='mycart-product-content newProductContent'>
                                                <div>
                                                    {cart.product.brand} {cart.product.model}
                                                </div>
                                                <div className='quantityNewPriceDiv'>
                                                    ₹ {cart.product.price}
                                                </div>
                                                <div className='mycart-product-content-subDiv'>
                                                    <span>Colour : {cart.product.color}</span>
                                                    <span className='stockAvailability'>{cart.product.availability}</span>
                                                </div>
                                                <div className='quantityNewTotalDiv'>
                                                    <div>
                                                        Total
                                                    </div>
                                                    <div>
                                                        ₹ {cart.total}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='mycart-product-content quantityPriceDiv'>
                                                <div>
                                                    Price
                                                </div>
                                                <div>
                                                    ₹ {cart.product.price}
                                                </div>
                                            </div>

                                            <div className='mycart-product-content quantityDiv'>
                                                <div>
                                                    Quantity
                                                </div>
                                                <div>
                                                    <select onChange={(event) => handleQuantityChange(cart.product._id, event)}>
                                                        <option value={cart.quantity}>{cart.quantity}</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='mycart-product-content quantityTotalDiv'>
                                                <div>
                                                    Total
                                                </div>
                                                <div>
                                                    ₹ {cart.total}
                                                </div>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                                <div className='mycart-product-count roboto-bold'>
                                    <div className='mycart-count-items'>
                                        {myCartItemCount} Item
                                    </div>
                                    <div className='mycart-count-total'>
                                        ₹ {myCartTotal.total}
                                    </div>
                                </div>
                            </div>

                            <div className='mycart-secondPage'>
                                <div className='mycart-secondDiv'>
                                    <div className='mycart-priceDetails'>
                                        <h2 className='roboto-bold'>
                                            PRICE DETAILS
                                        </h2>
                                    </div>
                                    <div className='mycart-allCharges'>
                                        <h3>
                                            <span className='roboto-regular'>
                                                Total MRP
                                            </span>
                                            <span className='roboto-bold'>
                                                ₹ {myCartTotal.total}
                                            </span>
                                        </h3>
                                        <h3>
                                            <span className='roboto-regular'>
                                                Discount on MRP
                                            </span>
                                            <span className='roboto-bold'>
                                                ₹ {myCartTotal.discount}
                                            </span>
                                        </h3>
                                        <h3>
                                            <span className='roboto-regular'>
                                                Convenience Fee
                                            </span>
                                            <span className='roboto-bold'>
                                                ₹ {myCartTotal.convenienceFee}
                                            </span>
                                        </h3>
                                    </div>
                                </div>

                                <div className='mycart-secondDiv'>
                                    <div className='mycart-totalAmount'>
                                        <h2 className='roboto-bold'>
                                            <span>
                                                Total Amount
                                            </span>
                                            <span>
                                                ₹ {myCartTotal.orderTotal}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className='mycart-placeOrder'>
                                        <Link to="/checkout">
                                            <button className='roboto-bold'>
                                                PLACE ORDER
                                            </button>
                                        </Link>
                                    </div>
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

export default MyCart