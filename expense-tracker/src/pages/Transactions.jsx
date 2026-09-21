import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Transactions() {
  const [expenses, setExpenses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [categoryId, setCategoryId] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const navigate = useNavigate()

  // Lấy danh sách giao dịch + danh mục
  const fetchData = async () => {
    try {
      const [expensesRes, categoriesRes] = await Promise.all([
        api.get('/expenses'),
        api.get('/categories'),
      ])
      setExpenses(expensesRes.data)
      setCategories(categoriesRes.data)
    } catch (err) {
      setError('Không thể tải dữ liệu')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Lọc category theo type đang chọn
  const filteredCategories = categories.filter((cat) => cat.type === type)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/expenses', {
        title,
        amount: Number(amount),
        type,
        categoryId,
        note,
        date,
      })

      // Reset form
      setTitle('')
      setAmount('')
      setNote('')
      setCategoryId('')
      setDate(new Date().toISOString().slice(0, 10))

      fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Thêm giao dịch thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa giao dịch này?')) return

    try {
      await api.delete(`/expenses/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Xóa thất bại')
    }
  }

  // Format tiền
  const formatMoney = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }
  const backPage = ()=>{
    navigate('/', { replace: true })
  }
  return (
    <div>
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
                onClick={backPage} 
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {'Quay lại'}
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center  flex-1">Quản lý giao dịch</h1>
        </div>

      {/* Form thêm giao dịch */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4">Thêm giao dịch mới</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Cơm trưa"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số tiền</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Loại</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setCategoryId('') // reset category khi đổi type
              }}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Chi tiêu</option>
              <option value="income">Thu nhập</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Chọn danh mục --</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ngày</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ghi chú</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú (không bắt buộc)"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Đang thêm...' : 'Thêm giao dịch'}
            </button>
          </div>
        </form>
      </div>

      {/* Danh sách giao dịch */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Ngày</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Tiêu đề</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Danh mục</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Loại</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Số tiền</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Chưa có giao dịch nào
                </td>
              </tr>
            ) : (
              expenses.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">
                    {new Date(item.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-sm">{item.category?.name || '—'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.type === 'income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      item.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'}
                    {formatMoney(item.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}