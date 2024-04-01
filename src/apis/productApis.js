import axios from "axios";
const backendUrl = `https://musicart-server-6cjj.onrender.com/api/product`

export const viewAllProductList = async ({ search, type, brand, color, price, sort }) => {
    try {
        const reqUrl = `${backendUrl}/viewAllProductList`
        const reqPayload = { search, type, brand, color, price, sort }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const viewProductDetails = async ({ id }) => {
    try {
        const reqUrl = `${backendUrl}/viewProductDetails`
        const reqPayload = { id }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}