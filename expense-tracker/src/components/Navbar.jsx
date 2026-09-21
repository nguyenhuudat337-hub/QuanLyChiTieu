import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Xin chào, {user?.name || 'User'} 👋
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-red-500 transition"
        >
          Đăng xuất
        </button>
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
          {user?.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
      </div>
    </header>
  )
  //{user?.name?.charAt(0)?.toUpperCase()}: dùng để lấy chữ cái đầu tiên trong tên người dùng và viết hoa nó
}