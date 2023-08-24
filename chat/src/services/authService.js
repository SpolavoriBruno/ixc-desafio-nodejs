import axios from "axios"

const API_ENDPOINT = process.env.API_URL || "http://localhost:4000"

export async function login({ username, password }) {
    return (await axios({
        data: { username, password },
        method: "post",
        url: `${API_ENDPOINT}/login`,
        withCredentials: true
    })).data
}

export async function register({ name, username, password }) {
    return (await axios({
        data: { name, username, password },
        method: "post",
        url: `${API_ENDPOINT}/user`,
        withCredentials: false
    })).data
}
