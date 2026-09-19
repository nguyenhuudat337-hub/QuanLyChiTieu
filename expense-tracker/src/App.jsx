import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Routes , Route ,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

//ví dụ người dùng truy cập /login thì React phải hiển thị page: login
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* nếu route còn nào bên trong  được truy cập, hãy dùng layout làm khung bao bên ngoài */}
        <Route element={<Layout/>}>
          <Route path="/" element={<Dashboard/>}/> 
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App //cho phép các file khác import App
