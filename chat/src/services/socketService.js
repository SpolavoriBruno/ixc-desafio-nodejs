import { io } from 'socket.io-client';

const URL = process.env.SOCKET_URL || 'http://localhost:4000';

export const socket = io(URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});
