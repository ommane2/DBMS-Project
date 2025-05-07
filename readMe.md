---


# 🧠 MERN Quiz App – Full Stack Project

A full-stack **Quiz App** built using the **MERN Stack** (MongoDB, Express, React [Next.js], Node.js), styled with **TailwindCSS** and **ShadCN UI**.

---


## 📁 Tech Stack

| Layer     | Tech Used                          |
|-----------|------------------------------------|
| Frontend  | vite + react.js, TailwindCSS, ShadCN UI    |
| Backend   | Node.js, Express.js, MongoDB       |
| Auth      | JWT (Admin only)                   |
| Styling   | Tailwind CSS, ShadCN Components    |
| Database  | MongoDB with Mongoose              |

---

## 💡 Features

### 👨‍💼 Admin
- Secure login via email/password
- Create, edit, delete quizzes
- Set quiz start and end time
- Add/edit/delete multiple-choice questions
- View quiz results (user scores)

### 🧑‍🎓 Participant
- Join quiz using a quiz code
- Attempt quiz only during active window
- See result after submission

---

## 🧩 Project Structure

```

mern-quiz-app/
├── server/
│   ├── config/           # DB connection
│   ├── controllers/      # Logic for routes
│   ├── middleware/       # JWT Auth
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── utils/            # Helpers (e.g. code generator)
│   ├── server.js
│   └── .env
│
├── client/
│   ├── components/       # UI components (Navbar, Cards, Inputs)
│   ├── pages/            # react.js pages
│   │   ├── admin/        # Admin dashboard, create quiz, etc.
│   │   ├── quiz/         # User quiz join, attempt
│   │   ├── results/      # Result view page
│   ├── lib/              # API helper functions
│   ├── styles/           # Global styles
│   ├── utils/            # Time formatting, validation
│   └── tailwind.config.js
│
├── README.md
└── ...

````

---

## 🚀 Getting Started

### 🛠 Prerequisites
- Node.js
- MongoDB installed or MongoDB Atlas
- Git

---

### 1️⃣ Backend Setup

```bash
cd server
npm install
````

#### Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret
```

#### Start Backend Server:

```bash
npm start       # Production
```

---

### 2️⃣ Frontend Setup

```bash
cd client
npm install
```

#### Create `.env.local` in frontend:

```env
VITE_APP_URI_API=http://localhost:5000
```

#### Run Frontend:

```bash
npm run dev
```

Now visit: [http://localhost:5173](http://localhost:5173)

---

## 🎨 UI Pages Overview (vite+react.js + Tailwind + ShadCN)

### 👨‍💼 Admin Pages

| Page             | Route                       | Description               |
| ---------------- | --------------------------- | ------------------------- |
| Admin Login      | `/admin/login`              | Admin login screen        |
| Dashboard        | `/admin/dashboard`          | Quiz list + analytics     |
| Create Quiz      | `/admin/create`             | Form to create quiz       |
| Manage Questions | `/admin/quiz/:id/questions` | Add/edit/delete questions |
| View Results     | `/admin/quiz/:id/results`   | Show user attempts        |

### 🧑‍🎓 User Pages

| Page            | Route                 | Description                 |
| --------------- | --------------------- | --------------------------- |
| Home            | `/`                   | Join quiz with code         |
| Quiz Start Page | `/quiz/:code`         | Start screen (instructions) |
| Quiz Attempt    | `/quiz/:code/attempt` | Actual quiz form            |
| Result Page     | `/results/:attemptId` | After quiz is submitted     |

---

## 🔌 Backend API Endpoints

### Auth

* `POST /api/admin/login`

### Quiz

* `POST /api/quiz`
* `GET /api/quiz`
* `GET /api/quiz/:id`
* `DELETE /api/quiz/:id`

### Questions

* `POST /api/question`
* `GET /api/question/:quizId`
* `PUT /api/question/:id`
* `DELETE /api/question/:id`

### Attempts

* `POST /api/attempt/start`
* `POST /api/attempt/submit`
* `GET /api/attempt/:id`

---

## 🧪 Testing Tools

You can use:

* [Postman](https://www.postman.com/)
* [Thunder Client](https://www.thunderclient.com/)
* Or the frontend UI itself

---

## 🔐 Security

* Admin login is secured via **JWT**
* Routes are protected using middleware
* Quiz code is **unique** and **unguessable**
* Passwords are **hashed** using `bcrypt.js`

---

## 📋 Scripts

### Backend

```bash
npm run dev     # Start server with nodemon
npm start       # Start server for production
```

### Frontend

```bash
npm run dev     # Start React.js app
```

---

## 👨‍💻 Contributing

Pull requests are welcome!
Open an issue first to discuss what you want to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

> **Author:** Your Name
> **GitHub:** [@ommane2](https://github.com/ommane2)
> **Email:** [maneom543@gmail.com](mailto:maneom543@gmail.com)

---

## 🙏 Acknowledgements

* [MERN Stack](https://www.mongodb.com/mern-stack)
* [TailwindCSS](https://tailwindcss.com/)
* [ShadCN UI](https://ui.shadcn.dev/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

🧠 **Happy Coding!**


