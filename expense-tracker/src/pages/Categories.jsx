import { useState, useEffect } from 'react' //dùng để tạo state và useEfect
import api from '../api/axios' //gọi API backend
import { useNavigate } from 'react-router-dom' // điều hướng

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [type, setType] = useState('expense')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate() //khai báo điều hướng 

    //hàm lấy danh sách category
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories') //gửi request cho backend
      setCategories(res.data) //đưa data vào state
    } catch (err) {
      setError('Không thể tải danh mục')
    }
  }

//là một React Hook giúp bạn thực hiện các tác vụ phụ (side effects) bên trong functional component
  useEffect(() => {
    fetchCategories() //chạy 1 lần khi react render lại
  }, [])


  //thêm category mới
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/categories', { name, type })
      setName('')
      setType('expense')
      fetchCategories()
    } catch (err) {
      setError(err.response?.data?.message || 'Thêm danh mục thất bại')
    } finally {
      setLoading(false)
    }
  }

  //xoá 1 category
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return

    try {
      await api.delete(`/categories/${id}`)
      fetchCategories()
    } catch (err) {
      alert(err.response?.data?.message || 'Xóa thất bại')
    }
  }

  const backPage = ()=>{
    navigate('/', { replace: true })
  }

  
  return (
    <div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
                onClick={backPage} 
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {'Quay lại'}
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center  flex-1">Quản lý Danh mục</h1>
        </div>
      {/* Form thêm danh mục */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold mb-4">Thêm danh mục mới</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Tên danh mục (vd: Ăn uống)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Đang thêm...' : 'Thêm'}
          </button>
        </form>
      </div>

      {/* Danh sách danh mục */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Tên</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Loại</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  Chưa có danh mục nào
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cat.type === 'income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {cat.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
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