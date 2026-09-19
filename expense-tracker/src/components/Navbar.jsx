export default function Navbar() {
    return (
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Xin chào 👋</h2>
        </div>
  
        <div className="flex items-center gap-4">
          {/* Sau này sẽ hiện tên user + nút đăng xuất */}
          <button className="text-sm text-gray-600 hover:text-red-500 transition">
            Đăng xuất
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            U
          </div>
        </div>
      </header>
    )
  }