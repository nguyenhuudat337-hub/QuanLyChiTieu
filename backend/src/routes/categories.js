import express from 'express' //tạo router
import { PrismaClient } from '@prisma/client' //dùng để giao tiếp với db
import {protect} from '../middleware/auth.js'

const router = express.Router();
const prisma = new PrismaClient();

//lấy tất cả categories của user
router.get('/',protect,async(req,res)=>{
    try{
        //lấy nhiều Category
        const categories = await prisma.category.findMany({
            where: {userId: req.user.id}, //lấy categories của người dùng userId
            orderBy: {name:'asc'} //sắp xếp tăng dần
        })
        res.json(categories);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'lỗi server'})
    }
});

//tạo category mới
router.post('/', protect, async (req, res) => {
    try {
      const { name, type } = req.body //lấy dữ liệu frontend gửi lên
  
      if (!name || !type) {
        return res.status(400).json({ message: 'Vui lòng nhập tên và loại danh mục' })
      }
  
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type phải là income hoặc expense' })
      }
  
      const category = await prisma.category.create({
        data: {
          name,
          type,
          userId: req.user.id //từ middleware
        }
      })
  
      res.status(201).json(category)
    } catch (error) {
      console.error(error)
      //P2002: một user không được có 2 category cùng tên hay lỗi không được lưu 1 giá trị đã tồn tại
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Danh mục này đã tồn tại' })
      }
      res.status(500).json({ message: 'Lỗi server' })
    }
  })

// Xóa category
//':id' là tham số động, params: các tham số trên URL
router.delete('/:id', protect, async (req, res) => {
    try {
      const category = await prisma.category.findFirst({
        where: { id: req.params.id, userId: req.user.id },
        //Ngoài những thông tin chính của Category, hãy lấy thêm thông tin liên quan này.
        include: {
          _count: {
            select: { expenses: true } //yêu cầu Prisma đếm số Expense liên quan đến Category này
          }
        }
      })
  
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy danh mục' })
      }
  
      // Kiểm tra còn giao dịch liên quan không
      if (category._count.expenses > 0) {
        return res.status(400).json({
          message: `Không thể xóa danh mục này vì còn ${category._count.expenses} giao dịch liên quan`
        })
      }
  
      await prisma.category.delete({ where: { id: req.params.id } })
      res.json({ message: 'Đã xóa danh mục thành công' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi server' })
    }
  })
  
  export default router