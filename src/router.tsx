import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Beats from './pages/Beats/Beats'
import Header from './components/Header/Header'
import Beat from './pages/Beat/Beat'
import Kit from './pages/Kit/Kit'
import Kits from './pages/Kits/Kits'
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login'
import Settings from './pages/Settings/Settings'
import Articles from './pages/Articles/Articles'
import Article from './pages/Article/Article'
import History from './pages/History/History'
import Upload from './pages/Upload/Upload'
import Profile from './pages/Profile/Profile'
import Notifications from './pages/Notifications/Notifications'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import {AuthProvider} from './context/AuthContext'
import {ThemeProvider} from './context/ThemeContext'
import User from './pages/User/User'
import UploadOther from "./pages/UploadOther/UploadOther";

const AppRouter: React.FC = () => {
    const [currentId, setCurrentId] = useState<number | undefined>(undefined)
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/beats" element={<Beats setCurrentId={setCurrentId} setIsPlaying={setIsPlaying}/>}/>
                        <Route path="/beats/:id" element={<Beat setCurrentId={setCurrentId} setIsPlaying={setIsPlaying}/>}/>
                        <Route path="/kits" element={<Kits/>}/>
                        <Route path="/kits/:id" element={<Kit/>}/>
                        <Route path="/articles" element={<Articles/>}/>
                        <Route path="/articles/:id" element={<Article/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/history" element={<History/>}/>
                        <Route path="/upload-beat" element={<Upload/>}/>
                        <Route path="/upload-other" element={<UploadOther/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/notifications" element={<Notifications/>}/>
                    </Routes>
                    <AudioPlayer id={currentId} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default AppRouter
