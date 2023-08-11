import { Container, Grid } from "@mui/material"
import ChatList from "../components/ChatList"
import ChatWindow from "../components/ChatWindow"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Chat() {
    const navigate = useNavigate()
    // [{id, name, online}]
    const [allUsers, setAllUsers] = useState([])

    // [{id, chat, message, user}]
    const [messages, setMessages] = useState([])

    const [activeChat, setActiveChat] = useState("global")

    useEffect(() => {
        if (localStorage.getItem("username") === undefined) navigate('/login')
        else console.log(localStorage.getItem("username"))
    }, [])

    function getMessages(chat = "global") {
        return messages.filter(message => message.chat === chat)
    }

    return (
        <Container sx={{ display: "contents", width: "100%" }}>
            <NavBar></NavBar>
            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={3}  >
                    <ChatList users={allUsers} onClick={setActiveChat}></ChatList>
                </Grid>
                <Grid item xs={9} >
                    <ChatWindow messages={getMessages()} chat={activeChat}></ChatWindow>
                </Grid>
            </Grid>
        </Container>
    )
}
