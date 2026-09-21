import { Navigate } from 'react-router-dom' //điều hướng người dùng bằng code/logic
import { useAuth } from '../context/AuthContext' //lấy dữ liệu

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth() //Lấy dữ liệu từ AuthContext

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace /> //chưa đăng nhập thì chuyển trang login
  }

  return children
}