# QuanLyChiTieu – Ứng dụng Quản lý Chi tiêu Cá nhân

Ứng dụng web Full Stack giúp người dùng theo dõi thu nhập và chi tiêu cá nhân một cách đơn giản, trực quan.

---

## ✨ Tính năng chính

- Đăng ký / Đăng nhập (JWT Authentication)
- Quản lý danh mục thu/chi (Categories)
- Thêm, xem, xóa giao dịch thu chi (Transactions)
- Dashboard tổng quan:
  - Tổng thu
  - Tổng chi
  - Số dư
  - Danh sách giao dịch gần đây
- Giao diện responsive, thân thiện người dùng

---

## 🛠️ Công nghệ sử dụng

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Context API (quản lý trạng thái đăng nhập)

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT + bcryptjs
- CORS, dotenv

---

## 📁 Cấu trúc thư mục

```
ChiTieuCaNhan/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── index.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── categories.js
│   │   │   └── expenses.js
│   │   └── utils/
│   │       └── generateToken.js
│   ├── .env
│   └── package.json
│
└── (frontend)/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── ...
    └── package.json
```

---

## 🚀 Cách chạy dự án

### 1. Backend

```bash
cd backend
npm install
```

Tạo file `.env` với nội dung:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

Chạy migration và khởi động server:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

Server sẽ chạy tại: `http://localhost:5001`

### 2. Frontend

```bash
cd frontend   # hoặc thư mục chứa của bạn
npm install
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint              | Mô tả              |
|--------|-----------------------|--------------------|
| POST   | `/api/auth/register`  | Đăng ký tài khoản  |
| POST   | `/api/auth/login`     | Đăng nhập          |

### Categories (cần token)
| Method | Endpoint                | Mô tả                |
|--------|-------------------------|----------------------|
| GET    | `/api/categories`       | Lấy danh sách danh mục |
| POST   | `/api/categories`       | Tạo danh mục mới     |
| DELETE | `/api/categories/:id`   | Xóa danh mục         |

### Expenses (cần token)
| Method | Endpoint              | Mô tả                  |
|--------|-----------------------|------------------------|
| GET    | `/api/expenses`       | Lấy danh sách giao dịch |
| POST   | `/api/expenses`       | Tạo giao dịch mới      |
| DELETE | `/api/expenses/:id`   | Xóa giao dịch          |

> **Lưu ý:** Các API Categories và Expenses yêu cầu header:
> ```
> Authorization: Bearer <token>
> ```

---

## 📌 Ghi chú

- Dự án được xây dựng với mục đích học tập và thực hành Full Stack.
- Có thể mở rộng thêm: chỉnh sửa giao dịch, lọc theo tháng, biểu đồ thống kê, export CSV...

---

## 👤 Tác giả

**Nguyễn Hữu Đạt**  
- GitHub: [nguyenhuudat337-hub](https://github.com/nguyenhuudat337-hub)  
- Email: nguyenhuudat337@gmail.com

---

## 📄 License

Dự án phục vụ mục đích học tập.
