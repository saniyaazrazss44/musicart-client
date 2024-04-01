import axios from "axios";
const backendUrl = `https://musicart-server-6cjj.onrender.com/api`

export const viewCheckout = async ({ userId }) => {
    try {
        const reqUrl = `${backendUrl}/viewCheckout`
        const reqPayload = { userId }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        window.location.href = '/'
        console.log(error)
    }
}

export const createInvoice = async ({ userId, address, mode_of_payment }) => {
    try {
        const reqUrl = `${backendUrl}/createInvoice`
        const reqPayload = { userId, address, mode_of_payment }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        window.location.href = '/'
        console.log(error)
    }
}

export const viewInvoice = async ({ invoiceId }) => {
    try {
        const reqUrl = `${backendUrl}/viewInvoice`
        const reqPayload = { invoiceId }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        window.location.href = '/'
        console.log(error)
    }
}

export const viewAllInvoices = async ({ userId }) => {
    try {
        const reqUrl = `${backendUrl}/viewAllInvoices`
        const reqPayload = { userId }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}