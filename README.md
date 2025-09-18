# 🎓 E-learning Backend

`E-learning is a full-featured online learning platform backend built with Node.js, Express, TypeScript, and MongoDB. It supports Students and Admins with secure authentication, course management, payments, and role-based access.`

## 🚀 Features (Backend)
`🔹 Authentication & Security`

`User registration & login with JWT-based authentication`

`Role-based access control (Student, Admin)`

`Password hashing with bcrypt`

`Middleware for protecting routes`

`🔹 Student Features`

`Register & login as Student`

`View available courses`

`Purchase courses via SSLCommerz Payment`

`Access purchased courses (modules & classes)`

`View Dashboard (my courses, modules, and classes)`

`Update profile (optional)`

`🔹 Admin Features

`Login as Admin

`Add/Edit Courses (title, description, price, modules, classes)`

`Add Students manually`

`Remove Students`

`Manage Payments (view all transactions, statuses)`

`🔹 Payment Integration (SSLCommerz)`

`Initiate payment from frontend → redirect to gateway`

`Success/Fail callback updates DB`

`Store transaction details with payment status (pending, success, failed)`

`Purchased course automatically added to Student profile`

### 🗄 Database Models
`📌 User Model
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  role: "user" | "admin",
  purchasedCourses: [ObjectId] // course IDs`
}

`📌 Course Model
{
  _id: ObjectId,
  title: string,
  description: string,
  price: number,
  modules: [
    {
      moduleTitle: string,
      classes: [
        { title: string, videoUrl: string }
      ]
    }
  ]
}`

`📌 Payment Model
{
  _id: ObjectId,
  userId: ObjectId,
  courseId: ObjectId,
  amount: number,
  method: "sslcommerz",
  status: "pending" | "success" | "failed",
  transactionId: string
}`

### 🔑 API Endpoints
`Auth`

`POST /api/v1/auth/register → Register (Student)`

`POST /api/v1/auth/login → Login & get JWT`

#### Courses

`GET /api/v1/courses → Get all courses`

`POST /api/v1/courses → Add new course (Admin only)`

`PATCH /api/v1/courses/:id → Edit course (Admin only)`

#### Students

`POST /api/v1/admin/students → Add student manually`

`DELETE /api/v1/admin/students/:id → Remove student`

#### Payments

`POST /api/v1/payments/init → Initialize SSLCommerz payment`

`POST /api/v1/payments/success → Payment success callback`

`POST /api/v1/payments/fail → Payment fail callback`

`GET /api/v1/admin/payments → View all payments (Admin only)`

#### 🛠 Backend Folder Structure
`backend/
│── src/
│   ├── config/         # DB & SSLCommerz config
│   ├── models/         # User, Course, Payment
│   ├── routes/         # auth, course, payment, admin
│   ├── controllers/    # Business logic
│   ├── middlewares/    # Auth & error handling
│   ├── utils/          # JWT, bcrypt helpers
│   └── app.ts          # Express app entry
│── package.json`

#### ⚡ Development Roadmap

`✅ Phase 1: Setup → Backend setup with Express, MongoDB
✅ Phase 2: Authentication → JWT login/signup, bcrypt password hashing
✅ Phase 3: Course Management → Admin can add/edit courses
✅ Phase 4: Dashboard → Fetch purchased courses for Student
✅ Phase 5: Payment Integration → SSLCommerz full flow (init, success, fail)
✅ Phase 6: Admin Panel → Manage courses, students, and payments`

#### 🧪 Testing with Postman

`Import API collection (if provided)`

`Test login, course purchase, and payment flow`

`Use JWT in Authorization header:`

`Authorization: Bearer <your_token>`

