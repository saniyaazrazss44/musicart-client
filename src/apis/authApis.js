import axios from "axios";
const backendUrl = `http://localhost:3002/api`

export const register = async ({ name, mobile_number, email, password }) => {
    try {
        const reqUrl = `${backendUrl}/register`
        const reqPayload = { name, mobile_number, email, password }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const login = async ({ email, mobile_number, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`
        const reqPayload = { email, mobile_number, password }
        const response = await axios.post(reqUrl, reqPayload)
        return response.data
    } catch (error) {
        console.log(error)
    }
}