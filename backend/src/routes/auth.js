import express from 'express' //tạo router
import bcrypt from 'bcryptjs' //dùng để băm và kiểm tra password
import { PrismaClient } from '@prisma/client' //Dùng để giao tiếp với PostgreSQL thông qua Prisma
import generateToken from '../utils/generateToken.js'

const router = express.Router() //đối tượng định nghĩa các router
const prisma = new PrismaClient() // thao tác database

//API Đăng ký
//Khi nhận HTTP POST request đến /register, hãy chạy function này.
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body //lấy dữ liệu từ frontend

    //thiếu 1 trong 3 báo lỗi
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' })
    }

    const userExists = await prisma.user.findUnique({ where: { email } }) //Tìm User có email này trong database
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' }) //nếu true thì thông báo đã có tài khoản
    }

    const salt = await bcrypt.genSalt(10) //Salt giúp các password giống nhau không nhất thiết tạo ra cùng một hash
    const hashedPassword = await bcrypt.hash(password, salt) //hash pass: 12345 -> $23$$

    //thêm tài khoản vào database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    //201 nghĩa là tài nguyên mới đã được tạo
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      })
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

export default router