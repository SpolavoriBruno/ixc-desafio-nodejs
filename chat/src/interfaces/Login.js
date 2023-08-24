import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Box, Container, Typography, TextField, Link } from "@mui/material";

import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate()
    const [notify, setNotify] = useState("")
    const [data, setData] = useState({})

    function handleLogin(event) {
        event.preventDefault()
        login(data)
            .then(data => {
                if (data) {
                    localStorage.setItem("id", data.id)
                    localStorage.setItem("username", data.username)
                    navigate('/chat')
                }
            })
            .catch(data => setNotify(data.message))
    }

    function handleChange(event) {
        setData(data => ({ ...data, [event.target.name]: event.target.value }))
    }
    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ m: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                </Avatar>

                <Typography component="h1" variant="h5">Login</Typography>

                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>

                    <TextField margin="normal" required fullWidth id="username" name="username" label="Username" autoComplete="username" autoFocus onChange={handleChange}></TextField>
                    <TextField margin="normal" required fullWidth id="password" name="password" label="Password" autoComplete="current-password" type="password" autoFocus onChange={handleChange}></TextField>
                    {notify && <Container> {notify}</Container>}
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>Login</Button>
                    <Link href="/register" variant="body2">{"Create an Account"}</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
