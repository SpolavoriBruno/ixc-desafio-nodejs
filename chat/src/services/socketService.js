import { io } from 'socket.io-client';

const URL = process.env.SOCKET_URL || 'http://localhost:4000';

export const socket = io(URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    withCredentials: true,
    rejectUnauthorized: false,
    autoConnect: false
});

socket.on('connect_error', err => {
    if (err.data.status === 401) return window.location = '/'
})
