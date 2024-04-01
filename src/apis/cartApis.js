import axios from "axios";
const backendUrl = `http://localhost:3002/api`

export const addToCart = async ({ userId, productId, quantity }) => {
    try {
        const reqUrl = `${backendUrl}/addToCart`
        const reqPayload = { userId, productId, quantity }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateCart = async ({ userId, productId, quantity }) => {
    try {
        const reqUrl = `${backendUrl}/updateCart`
        const reqPayload = { userId, productId, quantity }
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: token
            }
        };
        const response = await axios.post(reqUrl, reqPayload, config)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const viewCartCount = async ({ userId }) => {
    try {
        const reqUrl = `${backendUrl}/viewCartCount`
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
        console.log(error)
    }
}

export const viewCart = async ({ userId }) => {
    try {
        const reqUrl = `${backendUrl}/viewCart`
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

export const cartTotal = async ({ userId }) => {
    try {
        const reqUrl = `${backendUrl}/cartTotal`
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
        console.log(error)
    }
}

