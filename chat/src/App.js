import { Container } from '@mui/material'
import './App.css'
import Chat from './interfaces/Chat'
import Login from './interfaces/Login'
import Register from './interfaces/Register'
import NavBar from "./components/NavBar"

function App() {
  return (
      <Container className="App" sx={{ display: "contents", width: "100%" }}>
          {/* 
          <Chat></Chat> */}

          <Login></Login>
          <Register></Register>
      </Container>
  )
}

export default App
