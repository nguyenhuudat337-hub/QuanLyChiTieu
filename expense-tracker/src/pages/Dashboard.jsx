export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>

      {/* Cards thống kê tạm thời */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Tổng thu tháng này</p>
          <p className="text-2xl font-bold text-green-600">0 ₫</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Tổng chi tháng này</p>
          <p className="text-2xl font-bold text-red-600">0 ₫</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Số dư</p>
          <p className="text-2xl font-bold text-blue-600">0 ₫</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Biểu đồ sắp có...</h2>
        <p className="text-gray-500 text-sm">Chúng ta sẽ thêm biểu đồ ở giai đoạn sau.</p>
      </div>
    </div>
  )
}