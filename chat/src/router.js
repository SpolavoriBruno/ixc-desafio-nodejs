import { createBrowserRouter } from "react-router-dom"
import Register from "./interfaces/Register"
import Chat from "./interfaces/Chat"
import Login from "./interfaces/Login"
import Profile from "./interfaces/Profile"



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    }, {
        path: "/login",
        element: <Login />,
    }, {
        path: "/register",
        element: <Register />,
    }, {
        path: "/chat",
        element: <Chat />,
    }, {
        path: "/profile",
        element: <Profile />,
    },
]);
