import express from 'express' //tạo backend server và API
dotenv.config() //đọc env và đưa các biến vào
import cors from 'cors' // cho phép FE và BE ở khác origin giao tiếp
import dotenv from 'dotenv' // đọc file env
import authRoutes from './routes/auth.js'

import categoryRoutes from './routes/categories.js'
import expenseRoutes from './routes/expenses.js'

const app = express() //đối tượng đại diện cho express
const PORT = process.env.PORT || 5001 // dùng cổng trong env hoặc 5001

app.use(cors())
app.use(express.json()) //giúp middleware đọc body json

app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/expenses', expenseRoutes)

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})