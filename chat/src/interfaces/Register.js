import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Avatar, Button, Box, Container, Typography, TextField, Link } from "@mui/material";

import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate()
    const [notify, setNotify] = useState("")
    const [data, setData] = useState({})

    function handleRegister(event) {
        event.preventDefault()
        if (data.password !== data['repeat-password'])
            return setNotify("Password don't match")

        register(data)
            .then(data => {
                if (data.id) navigate('/login')
            })
            //TODO create error notification 
            .catch(data => setNotify(data.message))
    }

    function handleChange(event) {
        setData(data => ({ ...data, [event.target.name]: event.target.value }))
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ m: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <Add />
                </Avatar>

                <Typography component="h1" variant="h5">Register</Typography>

                <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>

                    <TextField margin="normal" required fullWidth id="name" name="name" label="Name" autoFocus onChange={handleChange}></TextField>
                    <TextField margin="normal" required fullWidth id="username" name="username" label="Username" autoFocus onChange={handleChange}></TextField>
                    <TextField margin="normal" required fullWidth id="password" name="password" label="Password" type="password" autoFocus onChange={handleChange}></TextField>
                    <TextField margin="normal" required fullWidth id="repeat-password" name="repeat-password" label="Repeat Password" type="password" autoFocus onChange={handleChange}></TextField>
                    {notify && <Container> {notify}</Container>}
                    <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>Register</Button>
                    <Link href="/login" variant="body2">{"Login"}</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default Register
