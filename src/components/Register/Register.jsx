import React, { useEffect, useState } from 'react'
import './Register.css'
import Footer from '../Footer/Footer'
import Musicart from '../Musicart/Musicart'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Link } from 'react-router-dom'
import { register } from '../../apis/authApis'
import Mobile_Header from '../Mobile_Header/Mobile_Header';

const Register = () => {

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
        const token = localStorage.getItem('token');

        if (token) {
            window.location.href = '/';
        }
    }, []);

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const userRegistration = async () => {
        if (!name) {
            toastr.error("Please enter your name");
            return;
        } else if (!mobileNumber) {
            toastr.error("Please enter your mobile number");
            return;
        } else if (!email) {
            toastr.error("Please enter your email");
            return;
        } else if (!password) {
            toastr.error("Please enter your password");
            return;
        }

        try {
            const payload = {
                name: name,
                mobile_number: mobileNumber,
                email: email,
                password: password
            };

            const response = await register(payload);
            toastr.success(response.message);

            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.name);
            localStorage.setItem('userId', response.userId);

            setTimeout(() => {
                window.location.href = '/'
            }, 1200)

        } catch (error) {
            console.error("Error registering user:", error);
            toastr.error("Failed to register user. Please try again later.");
        }
    };

    return (
        <div className='register'>
            <div className='registerMobileHeader'>
                <Mobile_Header />
            </div>
            <div className='registerPage'>
                <div className='registerMain'>
                    <div className='registerMusicCartDiv'>
                        <Musicart />
                    </div>
                    <div className='registerWelcomeDiv'>
                        Welcome
                    </div>
                    <div className='registerForm'>
                        <div>
                            <h1 className='roboto-bold formText'>Create Account <span className='register-mobile-text'>Don’t have an account?</span></h1>
                        </div>
                        <div className='formField roboto-medium'>
                            <label>Your name</label>
                            <input value={name} onChange={handleNameChange} type="text" />

                        </div>
                        <div className='formField roboto-medium'>
                            <label>Mobile number</label>
                            <input value={mobileNumber} onChange={handleMobileNumberChange} type="number" />

                        </div>
                        <div className='formField roboto-medium'>
                            <label>Email Id</label>
                            <input value={email} onChange={handleEmailChange} type="email" />

                        </div>
                        <div className='formField roboto-medium'>
                            <label>Password</label>
                            <input value={password} onChange={handlePasswordChange} type="password" />

                        </div>
                        <div>
                            <h6 className='roboto-medium registerInfoText'>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.
                            </h6>
                        </div>
                        <div className='continueButton'>
                            <button onClick={userRegistration} className='roboto-medium'>Continue</button>
                        </div>
                        <div>
                            <h6 className='roboto-regular registerInfoText'>By continuing, you agree to Musicart privacy notice and conditions of use.</h6>
                        </div>
                    </div>
                    <div className='roboto-regular signInLink'>
                        <h6>Already have an account ? <Link to="/sign-in" style={{ color: '#000000' }}>Sign in</Link></h6>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register