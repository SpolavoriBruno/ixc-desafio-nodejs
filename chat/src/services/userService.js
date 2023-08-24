import axios from "./defaultService"

const API_ENDPOINT = process.env.API_URL || "http://localhost:4000"

export async function getUsers() {
    return (await axios({
        method: "get",
        url: `${API_ENDPOINT}/user`,
        withCredentials: true
    })).data
}
