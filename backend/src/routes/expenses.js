import express from 'express'
import { PrismaClient } from '@prisma/client'
import { protect } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Lấy danh sách expenses
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: req.user.id },
      include: { category: true },
      orderBy: { date: 'desc' },
    })
    res.json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

// Tạo expense mới
router.post('/', protect, async (req, res) => {
  try {
    const { title, amount, type, date, note, categoryId } = req.body

    if (!title || !amount || !type || !categoryId) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin bắt buộc' })
    }

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        type,
        date: date ? new Date(date) : new Date(),
        note,
        categoryId,
        userId: req.user.id,
      },
      include: { category: true },
    })

    res.status(201).json(expense)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

// Xóa expense
router.delete('/:id', protect, async (req, res) => {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })

    if (!expense) {
      return res.status(404).json({ message: 'Không tìm thấy giao dịch' })
    }

    await prisma.expense.delete({ where: { id: req.params.id } })
    res.json({ message: 'Đã xóa giao dịch' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})

export default router