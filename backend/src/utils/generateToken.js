//phục vụ chức năng đăng nhập/xác thực người dùng
import jwt from 'jsonwebtoken'

//tạo cho userID: abc123 một token
//cú pháp: jwt.sign(payload, secret, options)
const generateToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_SECRET,{ expiresIn: '7d'})
}

export default generateToken