import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="mb-4">Trang không tồn tại</p>
      <Link to="/" className="text-blue-600 hover:underline">Về trang chủ</Link>
    </div>
  )
}