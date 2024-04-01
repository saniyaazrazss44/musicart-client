import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './components/Home/Home';
import Sign_in from './components/Sign_in/Sign_in';
import Register from './components/Register/Register';
import Product from './components/Product/Product';
import MyCart from './components/MyCart/MyCart';
import Checkout from './components/Checkout/Checkout';
import Invoice from './components/Invoice/Invoice';
import OrderSuccessful from './components/OrderSuccessful/OrderSuccessful';
import MyAll_Invoices from './components/MyAll_Invoices/MyAll_Invoices';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Sign_in />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:brand/:model/:id' element={<Product />} />
        <Route path='/view-cart' element={<MyCart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/invoices/:invoiceId' element={<Invoice />} />
        <Route path='/my-invoices' element={<MyAll_Invoices />} />
        <Route path='/order-successful' element={<OrderSuccessful />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App