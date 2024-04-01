import React, { useEffect, useState } from 'react'
import './Product.css'
import Header from '../Header/Header'
import Musicart from '../Musicart/Musicart'
import Footer from '../Footer/Footer'
import ViewCart from '../ViewCart/ViewCart'
import BackToProducts from '../BackToProducts/BackToProducts'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Link, useParams } from 'react-router-dom'
import { viewProductDetails } from '../../apis/productApis'
import { addToCart } from '../../apis/cartApis'
import PreviousBtnImg from '../../assets/icons/prev_button.png'
import NextBtnImg from '../../assets/icons/next_button.png'
import BackToMobileProducts from '../BackToMobileProducts/BackToMobileProducts'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'
import SearchIcon from '../../assets/icons/search-icon.png'

const Product = () => {

    const user_Id = localStorage.getItem('userId')
    const { brand, model, id } = useParams();
    const [productDetails, setProductDetails] = useState({})
    const [mainImgSrc, setMainImgSrc] = useState('');
    const rating = productDetails.star_ratings
    const sentences = productDetails.description && productDetails.description.split(/\. /);
    const [currentImage, setCurrentImage] = useState(1);
    const [images, setImages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const img1Value = productDetails.img && productDetails.img[0] && productDetails.img[0].img_1;
    const img2Value = productDetails.img && productDetails.img[1] && productDetails.img[1].img_2;
    const img3Value = productDetails.img && productDetails.img[2] && productDetails.img[2].img_3;
    const img4Value = productDetails.img && productDetails.img[3] && productDetails.img[3].img_4;

    useEffect(() => {
        if (img1Value) {
            setMainImgSrc(img1Value);
        }
    }, [img1Value]);

    useEffect(() => {

        const payload = {
            id: id
        }

        async function fetchProductDetails() {
            const prodDetails = await viewProductDetails(payload)
            setProductDetails(prodDetails)
        }

        fetchProductDetails()
    }, [])

    useEffect(() => {
        if (productDetails && productDetails.img) {
            const imgValues = productDetails.img.map((img, index) => img[`img_${index + 1}`]);
            setImages(imgValues);
        }
    }, [productDetails]);

    const addToCartEffect = async (redirect) => {

        if (!isLoggedIn) {
            window.location.href = '/sign-in';
            return;
        }

        const payload = {
            userId: user_Id,
            productId: id,
            quantity: 1
        };

        const addItemsToCart = async () => {
            try {
                if (!isLoggedIn) {
                    window.location.href = '/sign-in';
                    return;
                }

                const response = await addToCart(payload);
                toastr.success("Product added successfully")
                setTimeout(() => {
                    window.location.reload()
                }, 1500)

                if (redirect) {
                    window.location.href = '/view-cart';
                }
            } catch (error) {
                console.error('Error adding items to cart:', error);
            }
        };

        addItemsToCart();
    };

    const handleImageVisibility = (newSrc) => {
        setMainImgSrc(newSrc);
    };

    const handleImageChange = (index) => {
        setCurrentImage(index);
    };

    const handleNext = () => {
        setCurrentImage((prevIndex) => (prevIndex === images.length ? 1 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentImage((prevIndex) => (prevIndex === 1 ? images.length : prevIndex - 1));
    };

    return (
        <div className='product-page'>
            <div className='product-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <div className='inpMobileSearch'>
                        <img src={SearchIcon} alt="search" />
                        <input type="text" value='' placeholder='Search Musicart' />
                    </div>
                </div>

                <div className='product-div-container'>
                    <div className='product-div'>
                        <div className='home-invoice-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a> / {brand} {model}
                            </div>
                        </div>
                        <ViewCart />
                    </div>
                    <div className='backToProducts'>
                        <BackToProducts />
                    </div>
                    <div className='backToMobileProducts'>
                        <BackToMobileProducts />
                    </div>

                    <div className='product-title-main roboto-bold'>
                        <p>{productDetails['title-description']}</p>
                    </div>

                    <div className='buyNowTopBtn' style={{ paddingBottom: "1.5rem" }}>
                        <button onClick={() => addToCartEffect(true)} className='roboto-bold'>Buy Now</button>
                    </div>

                    <div className='product-body'>
                        <div className='product-body-img'>
                            <div className='product-main-img'>
                                <div className='ImgMainDiv'>
                                    <img src={mainImgSrc} alt="" />
                                </div>
                            </div>
                            <div className='product-side-img-container'>
                                <div className='product-side-img' onClick={() => handleImageVisibility(img2Value)}>
                                    <img src={img2Value} alt="" />
                                </div>
                                <div className='product-side-img' onClick={() => handleImageVisibility(img3Value)}>
                                    <img src={img3Value} alt="" />
                                </div>
                                <div className='product-side-img' onClick={() => handleImageVisibility(img4Value)}>
                                    <img src={img4Value} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='product-mobile-body-img'>
                            <div className='product-main-img'>
                                <div className='ImgMainDiv'>
                                    <img src={images[currentImage - 1]} alt="" />
                                </div>
                            </div>

                            <div className='product-img-controls'>
                                <button className='btnHandlePrevNext' onClick={handlePrevious}>
                                    <img src={PreviousBtnImg} alt="" />
                                </button>

                                <div className='product-radio-img-container'>
                                    {images.map((_, index) => (
                                        <input
                                            key={index}
                                            type="radio"
                                            name="carousel"
                                            checked={currentImage === index + 1}
                                            onChange={() => handleImageChange(index + 1)}
                                        />
                                    ))}
                                </div>

                                <button className='btnHandlePrevNext' onClick={handleNext}>
                                    <img src={NextBtnImg} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className='product-content'>
                            <div className='name-of-product'>
                                <h1 className='roboto-bold'>
                                    {productDetails.brand} {productDetails.model}
                                </h1>
                            </div>
                            <div className='ratingAndReview'>
                                <div className="rating">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            style={{ color: index < rating ? 'gold' : '#ccc', fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: "0.2rem", width: '100%', height: '100%' }}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <div className='review roboto-medium'>
                                    ({productDetails.customer_reviews_count} Customer reviews)
                                </div>
                            </div>
                            <div className='priceDiv'>
                                <h3 className='roboto-bold'>
                                    Price - ₹ {productDetails.price}
                                </h3>
                            </div>
                            <div className='typeDiv'>
                                <h3 className='roboto-regular'>
                                    {productDetails.color} | {productDetails.type} headphone
                                </h3>
                            </div>
                            <div className='aboutProductDiv'>
                                <p className='roboto-regular'>About this item</p>
                                <ul className='roboto-regular'>
                                    {sentences && sentences.map((sentence, index) => (
                                        <li key={index}>{sentence.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='availableDiv'>
                                <h3>
                                    <span className='roboto-bold'>Available </span>
                                    <span className='roboto-regular'>- {productDetails.availability}</span>
                                </h3>
                            </div>
                            <div className='brandDiv'>
                                <h3>
                                    <span className='roboto-bold'>Brand </span>
                                    <span className='roboto-regular'>- {productDetails.brand}</span>
                                </h3>
                            </div>
                            <div className='addToCartBtn'>
                                <button onClick={() => addToCartEffect(false)} className='roboto-bold'>Add to cart</button>
                            </div>
                            <div className='buyNowBtn'>
                                <button onClick={() => addToCartEffect(true)} className='roboto-bold'>Buy Now</button>
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

export default Product