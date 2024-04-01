import axios from "axios";
const backendUrl = `http://localhost:3002/api/user`

export const feedback = async ({ bugs, feedback, query }) => {
    try {
        const reqUrl = `${backendUrl}/feedback`
        const reqPayload = { bugs, feedback, query }
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