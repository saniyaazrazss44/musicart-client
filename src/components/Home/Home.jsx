import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from '../Footer/Footer'
import Musicart from '../Musicart/Musicart'
import Header from '../Header/Header'
import HomeMainBg from '../../assets/images/home-main-bg.png'
import HomeMain from '../../assets/images/home-main.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import GridIcon from '../../assets/icons/grid-icon.png'
import ListIcon from '../../assets/icons/list-icon.png'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { viewAllProductList } from '../../apis/productApis'
import ViewCart from '../ViewCart/ViewCart'
import AddToCart from '../../assets/icons/addToCart.png'
import FeedbackIcon from '../../assets/icons/feedback.png'
import { Link } from 'react-router-dom'
import filterSortData from '../../utils/filterSort'
import { addToCart } from '../../apis/cartApis'
import { feedback } from '../../apis/feedbackApis'
import Mobile_Footer from '../Mobile_Footer/Mobile_Footer'

const Home = () => {

    const user_Id = localStorage.getItem('userId')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [feedbackType, setFeedbackType] = useState('')
    const [feedbackText, setFeedbackText] = useState('')
    const [typeErrorMsg, setTypeErrorMsg] = useState('')
    const [textErrorMsg, setTextErrorMsg] = useState('')
    const [name, setName] = useState(localStorage.getItem('name'));
    const [initials, setInitials] = useState('');
    const [products, setProducts] = useState([])
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isGridView, setIsGridView] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [selectedFilter, setSelectedFilter] = useState({
        type: '',
        brand: '',
        color: '',
        price: '',
        sort: ''
    });

    useEffect(() => {

        window.scrollTo(0, 0);
        const handleScroll = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener('beforeunload', handleScroll);

        return () => {
            window.removeEventListener('beforeunload', handleScroll);
        };
    }, []);

    useEffect(() => {
        async function fetchProducts() {

            try {
                const response = await viewAllProductList(selectedFilter, { search: searchInput });
                setProducts(response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [selectedFilter, searchInput])

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleFeedbackClick);

        return () => {
            document.removeEventListener('click', handleFeedbackClick);
        };
    }, []);

    useEffect(() => {
        setName(localStorage.getItem('name'));
        const myName = localStorage.getItem('name');

        if (myName) {
            const words = myName.split(' ');

            let initials = '';
            for (let i = 0; i < Math.min(words.length, 2); i++) {
                initials += words[i].charAt(0).toUpperCase();
            }

            setInitials(initials);
        }
    }, []);

    const openDetails = () => {
        setDetailsVisible(true);
    };

    const closeDetails = () => {
        setDetailsVisible(false);
    };

    const handleDivClick = () => {
        if (detailsVisible) {
            closeDetails();
        } else {
            openDetails();
        }
    };

    const handleDocumentClick = (event) => {
        if (!event.target.closest('.home-loginUser-container')) {
            closeDetails();
        }
    };

    const openFeedbackBox = () => {
        setIsOpen(true);
    };

    const closeFeedbackBox = () => {
        setIsOpen(false);
    };

    const handleFeedbackDivClick = () => {
        if (isOpen) {
            closeFeedbackBox();
        } else {
            openFeedbackBox();
        }
    };

    const handleFeedbackClick = (event) => {
        if (!event.target.closest('.feedback-container')) {
            closeFeedbackBox();
        }
    };

    const handleFilterChange = (category, value) => {
        setSelectedFilter(prevState => ({
            ...prevState,
            [category]: value
        }));
    };

    const handleSearchInputChange = (event) => {
        const { value } = event.target;
        setSearchInput(value);
    };

    const addToCartByIcon = async (productId) => {

        const payload = {
            userId: user_Id,
            productId: productId,
            quantity: 1
        };

        const addItemsToCart = async () => {
            try {
                const response = await addToCart(payload);
                toastr.success("Product added successfully")
                setTimeout(() => {
                    window.location.reload()
                }, 1500)

            } catch (error) {
                console.error('Error adding items to cart:', error);
            }
        };

        addItemsToCart();
    };

    const handleLogout = () => {
        window.location.reload()
        localStorage.clear();
        setName(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        if (token && name) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleFeedbackSubmit = async () => {
        if (feedbackType === '') {
            setTypeErrorMsg('* Required Field')
            return
        } else if (feedbackText === '') {
            setTextErrorMsg('* Required Field')
            return
        }

        try {
            const feedbackPayload = {
                bugs: { bugs: [feedbackText] },
                feedback: { feedback: [feedbackText] },
                query: { query: [feedbackText] }
            };

            const payload = feedbackPayload[feedbackType];

            const response = await feedback(payload);

            toastr.success("Feedback submitted successfully")

            setTimeout(() => {
                window.location.reload()
            }, 1200)

            setFeedbackType('');
            setFeedbackText('');
            setTypeErrorMsg('');
            setTextErrorMsg('');

        } catch (error) {
            console.log("Error while sending feedback")
        }
    }

    const handleFeedbackTypeChange = (event) => {
        setFeedbackType(event.target.value);
        setTypeErrorMsg('');
    };

    const handleFeedbackTextChange = (event) => {
        setFeedbackText(event.target.value);
        setTextErrorMsg('');
    };

    return (
        <div className='home-page'>
            <div className='home-main'>
                <div className='website-header'>
                    <Header />
                </div>

                <div className='mobile-Header'>
                    <div className='inpMobileSearch'>
                        <img src={SearchIcon} alt="search" />
                        <input type="text" value={searchInput}
                            onChange={handleSearchInputChange} placeholder='Search Musicart' />
                    </div>
                </div>

                <div className='home-div'>
                    <div className='home-music-div'>
                        <div className='home-invoice-link'>
                            <Musicart />
                            <div>
                                <a href="/">Home</a>
                            </div>
                            {isLoggedIn && (
                                <div>
                                    <a href="/my-invoices">Invoice</a>
                                </div>
                            )}
                        </div>
                        <div className='home-login-user'>
                            {isLoggedIn && (
                                <ViewCart />
                            )}
                            {name && (
                                <div className='home-loginUser-container'>
                                    <div className='home-loginUser-div' onClick={handleDivClick}>
                                        {initials}
                                    </div>
                                    {detailsVisible && (
                                        <div className='home-loginUser-details'>
                                            <p>{name}</p>
                                            <hr />
                                            <p onClick={handleLogout}>Logout</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='home-header-bg'>
                        <div className='home-header-container'>
                            <img src={HomeMainBg} alt="main bg" />
                        </div>
                        <div className='home-header-content'>
                            <div className='home-header-text'>
                                <h1 className='roboto-bold'>
                                    Grab upto 50% off on
                                    Selected headphones
                                </h1>
                            </div>
                            <div className='home-header-img'>
                                <img src={HomeMain} alt="main" />
                            </div>
                        </div>
                    </div>

                    <div className='inpSearch'>
                        <img src={SearchIcon} alt="search" />
                        <input type="text" value={searchInput}
                            onChange={handleSearchInputChange} placeholder='Search by Product Name' />
                    </div>

                    <div className='filterDiv roboto-regular'>
                        <div className='filterDivMain'>
                            <div className='filterFirstDiv'>
                                <div className='filterByGridView' onClick={() => setIsGridView(true)}>
                                    <img src={GridIcon} alt="grid" />
                                </div>
                                <div className='filterByListView' onClick={() => setIsGridView(false)}>
                                    <img src={ListIcon} alt="list" />
                                </div>
                            </div>

                            <div className='filterSecondDiv'>
                                {/* Headphone Type */}
                                <div className='selectFilter'>
                                    <select
                                        value={selectedFilter['Headphone type']}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                        className='roboto-bold'
                                    >
                                        <option value="" selected>Headphone type</option>
                                        {filterSortData[0]['Headphone type'].map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Company */}
                                <div className='selectFilter'>
                                    <select
                                        value={selectedFilter['Company']}
                                        onChange={(e) => handleFilterChange('brand', e.target.value)}
                                        className='roboto-bold'
                                    >
                                        <option value="" selected>Company</option>
                                        {filterSortData[1]['Company'].map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Color */}
                                <div className='selectFilter'>
                                    <select
                                        value={selectedFilter['Color']}
                                        onChange={(e) => handleFilterChange('color', e.target.value)}
                                        className='roboto-bold'
                                    >
                                        <option value="" selected>Color</option>
                                        {filterSortData[2]['Color'].map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price */}
                                <div className='selectFilter'>
                                    <select
                                        value={selectedFilter['Price']}
                                        onChange={(e) => handleFilterChange('price', e.target.value)}
                                        className='roboto-bold'
                                    >
                                        <option value="" selected>Price</option>
                                        {filterSortData[3]['Price'].map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='filterThirdDiv'>
                            <div className='sortByDiv'>
                                <span className='sortByDivText'>
                                    Sort by :&nbsp;
                                </span>
                                <select
                                    value={selectedFilter.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className='roboto-regular'
                                >
                                    <option value="" selected>Featured</option>
                                    {filterSortData.length > 0 && filterSortData[filterSortData.length - 1].hasOwnProperty('Featured') && (
                                        filterSortData[filterSortData.length - 1].Featured.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={isGridView ? 'products-div-container grid-view' : 'products-div-container list-view'}>
                        {products.length > 0 ? (products.map((prod, index) => (

                            <div className={isGridView ? 'product-div-main' : 'product-div-main2'} key={index}>

                                <Link to={`/product/${prod.brand}/${prod.model}/${prod._id}`} style={isGridView ? { width: '100%' } : {}}>
                                    <div className={isGridView ? 'product-img' : 'product-img2'}>
                                        <img src={prod.img[0].img_1} alt="music" />
                                    </div>
                                </Link>

                                <div className={isGridView ? 'product-cart' : 'product-cart2'}>
                                    {isLoggedIn && (
                                        <div onClick={() => addToCartByIcon(prod._id)} className='add-product-to-cart'>
                                            <img src={AddToCart} alt="add" />
                                        </div>
                                    )}
                                </div>

                                <div className='product-details'>
                                    <span style={!isGridView ? { fontSize: '1.5rem' } : {}}>{prod.brand} {prod.model}</span>
                                    <span style={!isGridView ? { fontWeight: '500' } : {}}>₹ {prod.price}</span>
                                    <span style={!isGridView ? { fontWeight: '500' } : {}}>{prod.color} | {prod.type}</span>
                                    {!isGridView && <span style={!isGridView ? { fontWeight: '500' } : {}}>{prod['title-description']}</span>}
                                    {!isGridView &&
                                        <Link to={`/product/${prod.brand}/${prod.model}/${prod._id}`}>
                                            <button className='details-btn roboto-bold'>Details</button>
                                        </Link>
                                    }
                                </div>
                            </div>
                        ))) : (
                            <div>No products found for the selected filters.</div>
                        )}
                    </div>

                </div>
                {isLoggedIn && (
                    <div className='feedback-container'>
                        {isOpen && (
                            <div className='feedback-box'>
                                <div className='type-of-feedback'>
                                    <h6 className='roboto-bold'>Type of feedback</h6>
                                    <select value={feedbackType} onChange={handleFeedbackTypeChange} className='roboto-medium'>
                                        <option value="" selected>Choose the type</option>
                                        <option value="bugs">Bugs</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="query">Query</option>
                                    </select>
                                    <p className='roboto-medium' style={{ color: 'red', fontSize: '0.75rem' }}>{typeErrorMsg}</p>
                                </div>
                                <div className='type-your-feedback'>
                                    <h6 className='roboto-bold'>Feedback</h6>
                                    <textarea value={feedbackText} onChange={handleFeedbackTextChange} className='roboto-medium' cols="30" rows="5" placeholder='Type your feedback'></textarea>
                                    <p className='roboto-medium' style={{ color: 'red', fontSize: '0.75rem' }}>{textErrorMsg}</p>
                                </div>
                                <div className='btnFeedbackSubmit'>
                                    <button onClick={handleFeedbackSubmit} className='roboto-bold'>Submit</button>
                                </div>
                            </div>
                        )}
                        <div className='feedback-div' onClick={handleFeedbackDivClick}>
                            <img src={FeedbackIcon} alt="feedback" />
                        </div>
                    </div>
                )}
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

export default Home