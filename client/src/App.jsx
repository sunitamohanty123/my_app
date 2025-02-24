import React from 'react'
import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Error from './pages/Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import CreatePost from './components/Layout/CreatePost'
import PrivateRoute from "./pages/PrivateRoute"
import EditProfile from './components/Layout/EditProfile'
import Profile from './pages/Profile'
import EditPost from './components/Layout/EditPost'
import Modal from 'react-modal';
Modal.setAppElement('#root');
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Error />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/editpost" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App