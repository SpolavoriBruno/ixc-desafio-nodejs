import { useEffect, useState } from "react"
import { List } from "@mui/material";
import ChatListItem from "./ChatListItem";



function ListedUser(props) {
    const [users, setUsers] = useState(props.users || [])

    function addUser(newUser) {
        setUsers(users => [...users, newUser])
    }

    return (
        <List sx={{ mt: 8, bgcolor: "primary.dark", height: "93vh" }}>
            <ChatListItem onClick={props.onClick}></ChatListItem>
            {users.map((user, key) => <ChatListItem key={key} user={user} onClick={props.onClick}></ChatListItem>)}
        </List>
    )
}

export default ListedUser
