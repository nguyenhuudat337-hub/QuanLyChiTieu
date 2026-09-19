//kiểm tra người dùng hợp lệ không-> hợp lệ thì tìm user trong db -> gắn user vào req.user -> cho request tiếp
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client' //Dùng để giao tiếp với PostgreSQL thông qua Prisma

const prisma = new PrismaClient()
//req: request, res: response, next: Middleware tiếp theo
const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true },
      })

      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' })
  }
}

export { protect }