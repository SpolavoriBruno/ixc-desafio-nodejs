import { useEffect, useState, useRef } from "react"
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { Send } from "@mui/icons-material"

import { socket } from "../services/socketService"

export default function ChatWindow(props) {
    const [messages, setMessages] = useState(props.messages || [])

    const [input, setInput] = useState(props.input || "")

    const scrollRef = useRef(null)

    useEffect(() => {
        if (props.messages) setMessages(props.messages)
        if (props.input) setInput(props.input)
        scrollToBottom()
    }, [props])

    function handleInputChange(event) {
        setInput(event.target.value)
    }

    function scrollToBottom() {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    function handleSend(event) {
        event.preventDefault()
        const data = {
            id: Date.now(),
            content: input,
            user: localStorage.getItem('username'),
            chat: props.chat,
        }
        socket.timeout(5000).emit(`message`, data)
        setInput("")
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexGrow: 1, overflow: "auto", p: 2, mt: 8 }}>
                {messages.map(message => (
                    <Message key={message.id} message={message}></Message>
                ))}
                <div ref={scrollRef} style={{ margin: '3rem' }} />
            </Box>
            <Box component="form" onSubmit={handleSend} noValidate sx={{ p: 1, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField fullWidth placeholder="Type your message" value={input} onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={2} sx={{ margin: "auto", p: 0 }}>
                        <Button type="submit" fullWidth size="large" color="primary" variant="contained" endIcon={<Send />}>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}


const Message = ({ message }) => {
    const isOutMessage = () => message.user === localStorage.getItem('username')
    const activeMessageStyle = (prefix = "") => (prefix + (isOutMessage() ? "end" : "start"))
    return (
        < Box key={message.id} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: activeMessageStyle("flex-")
        }}>
            <Paper variant="outlined" sx={{
                p: 1, m: 1,
                maxWidth: "75vh",
                textAlign: activeMessageStyle(),
                backgroundColor: isOutMessage()
                    ? "primary.light"
                    : "secondary.light",
            }}>
                <Typography variant="body1">{message.content}</Typography>
            </Paper>
        </Box >
    )
}
