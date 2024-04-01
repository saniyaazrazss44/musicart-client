import React, { useEffect, useState } from 'react'
import './Sign_in.css'
import Footer from '../Footer/Footer'
import Musicart from '../Musicart/Musicart'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { login } from '../../apis/authApis'
import { Link } from 'react-router-dom'
import Mobile_Header from '../Mobile_Header/Mobile_Header';

const Sign_in = () => {

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

  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailOrMobileChange = (event) => {
    const value = event.target.value;

    if (/^\S+@\S+\.\S+$/.test(value)) {
      setEmail(value);
      setMobile('');
    } else {
      setMobile(value);
      setEmail('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = async () => {
    if (!email && !mobile) {
      toastr.error("Please enter your email or mobile number");
      return;
    } else if (!password) {
      toastr.error("Please enter your password");
      return;
    }

    try {

      let payload;

      if (email) {
        payload = {
          email: email,
          password: password
        };
      } else {
        payload = {
          mobile_number: mobile,
          password: password
        };
      }

      const response = await login(payload);
      toastr.success(response.message)

      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name);
      localStorage.setItem('userId', response.userId);

      setTimeout(() => {
        window.location.href = '/'
      }, 1200)

    } catch (error) {
      console.error("Error logging in:", error);
      toastr.error("Failed to log in. Please try again later.");
    }
  };

  return (
    <div className='signin'>
      <div className='signInMobileHeader'>
        <Mobile_Header />
      </div>
      <div className='signinPage'>
        <div className='signinMain'>
          <div className='signinMusicCartDiv'>
            <Musicart />
          </div>
          <div className='signinWelcomeDiv'>
            Welcome
          </div>
          <div className='signinForm'>
            <div>
              <h1 className='roboto-bold signinFormText'>Sign in <span className='signin-mobile-text'>Already a customer?</span></h1>
            </div>
            <div className='formField roboto-medium'>
              <label>Enter your email or mobile number</label>
              <input value={email ? email : mobile} onChange={handleEmailOrMobileChange} type="text" />
            </div>

            <div className='formField roboto-medium'>
              <label>Password</label>
              <input value={password} onChange={handlePasswordChange} type="password" />
            </div>

            <div className='continueButton'>
              <button onClick={userLogin} className='roboto-medium'>Continue</button>
            </div>
            <div>
              <h6 className='roboto-regular signinInfoText'>By continuing, you agree to Musicart privacy notice and conditions of use.</h6>
            </div>
          </div>

          <div className='newToMusicartDiv'>
            <div className='borderHorizontal'></div>
            <div className='textNewToMusicart roboto-regular'>New to Musicart ?</div>
            <div className='borderHorizontal'></div>
          </div>

          <div className='createAccount'>
            <Link to="/register" style={{ color: '#000000', width: "100%" }}>
              <button className='roboto-medium'>Create your Musicart account</button>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Sign_in