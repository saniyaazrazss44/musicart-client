import axios from "axios";
const backendUrl = `https://musicart-server-6cjj.onrender.com/api/user`

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