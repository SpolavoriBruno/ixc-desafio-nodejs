import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Grid } from "@mui/material"

import ChatList from "../components/ChatList"
import ChatWindow from "../components/ChatWindow"
import NavBar from "../components/NavBar"
import { getUsers } from "../services/userService"
import { getHistory } from "../services/messageService"
import { socket } from "../services/socketService"

export default function Chat() {
    const navigate = useNavigate()

    const [allUsers, setAllUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [activeChat, setActiveChat] = useState("global")

    useEffect(() => {
        socket.connect()
        if (!localStorage.getItem("username")) return navigate('/login')

        console.log("Bem vindo " + localStorage.getItem("username"))

        getUsers().then(setAllUsers)
        getHistory().then(setMessages)

        socket.on('message', addMesage)
        return () => {
            socket.off('message')
            socket.disconnect()
        }
    }, [])

    function addMesage(message) {
        setMessages(messages => [...messages, message])
    }

    function getMessages(chat = "global") {
        if (messages && Array.isArray(messages))
            return messages.filter(message => !message.chat || message.chat === chat)
    }

    return (
        <Container sx={{ display: "contents", width: "100%" }}>
            <NavBar></NavBar>
            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={3}  >
                    <ChatList users={allUsers} onClick={setActiveChat}></ChatList>
                </Grid>
                <Grid item xs={9} >
                    <ChatWindow messages={getMessages(activeChat)} chat={activeChat}></ChatWindow>
                </Grid>
            </Grid>
        </Container>
    )
}
