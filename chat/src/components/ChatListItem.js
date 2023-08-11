import { Button, ListItem, Typography } from "@mui/material"
import { useEffect, useState } from "react"


function ChatListItem(props) {
    const [user, setUser] = useState(props.user)

    useEffect(() => {
        setUser(props.user)
    }, [props])

    return (
        <ListItem >
            {user && user.name
                ? (
                    <Button sx={{ bgcolor: "blueviolet" }} variant="contained">
                        <Typography>{user.name}</Typography>
                        <Typography>{user.status ? "Online" : "Offline"}</Typography>
                        <Typography>{user.username}</Typography>
                    </Button>
                )
                : <Button sx={{ bgcolor: "blueviolet" }} variant="contained"><Typography>{"Global Chat"}</Typography></Button>
            }
        </ListItem>
    )
}

export default ChatListItem
