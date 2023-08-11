
import axios from "axios"


const API_ENDPOINT = process.env.API_URL || "http://localhost:4000"

export async function login({ username, password }) {
    return (await axios({
        data: { username, password },
        method: "post",
        url: `${API_ENDPOINT}/login`,
        withCredentials: false
    })).data
}

export async function register(user) {
    return (await axios({
        data: user,
        method: "post",
        url: `${API_ENDPOINT}/user`,
        withCredentials: false
    })).data
}
