import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  })
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/expenses')
        const expenses = res.data

        // Tính toán tổng thu / chi
        let totalIncome = 0
        let totalExpense = 0

        expenses.forEach((item) => {
          const amount = Number(item.amount)
          if (item.type === 'income') {
            totalIncome += amount
          } else {
            totalExpense += amount
          }
        })

        setSummary({
          totalIncome,
          totalExpense,
          balance: totalIncome - totalExpense,
        })

        // Lấy 5 giao dịch gần nhất
        setRecentTransactions(expenses.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const formatMoney = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>

      {/* Cards thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Tổng thu</p>
          <p className="text-2xl font-bold text-green-600">
            {formatMoney(summary.totalIncome)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Tổng chi</p>
          <p className="text-2xl font-bold text-red-600">
            {formatMoney(summary.totalExpense)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Số dư</p>
          <p
            className={`text-2xl font-bold ${
              summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {formatMoney(summary.balance)}
          </p>
        </div>
      </div>

      {/* Giao dịch gần đây */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Giao dịch gần đây</h2>
          <Link
            to="/transactions"
            className="text-sm text-blue-600 hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        {recentTransactions.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Chưa có giao dịch nào.{" "}
            <Link to="/transactions" className="text-blue-600 hover:underline">
              Thêm giao dịch ngay
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Ngày
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Tiêu đề
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Danh mục
                </th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    {new Date(item.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.category?.name || '—'}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      item.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'}
                    {formatMoney(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}