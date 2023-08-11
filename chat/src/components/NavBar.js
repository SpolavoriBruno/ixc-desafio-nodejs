import { AppBar, Avatar, Box, Grid, IconButton, Toolbar, Typography, Divider, Badge, Container } from "@mui/material"
import { ChatBubble, Dashboard, Menu, NotificationsActive, NotificationsNone, StackedBarChart } from "@mui/icons-material";
import "./Chat.css"
import { useState } from "react";

function Chat() {
    const [notificationsCount, setNotificationsCount] = useState(0)

    function editProfile() {
        setNotificationsCount(notificationsCount + 1)
    }

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed">
                <Toolbar sx={{ pr: 8 }}>
                    <IconButton edge="start" color="success">
                        <Avatar variant="rounded">
                            <Menu color="inherit"></Menu>
                        </Avatar>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Chat
                    </Typography>

                    <Badge badgeContent={notificationsCount} color="secondary" sx={{ mr: 2, mt: 1 }}>
                        {notificationsCount > 0
                            ? <NotificationsActive></NotificationsActive>
                            : <NotificationsNone></NotificationsNone>
                        }
                    </Badge>

                    <IconButton edge="end" color="inherit" onClick={editProfile}>
                        <Avatar variant="rounded"></Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Chat
