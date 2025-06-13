# 🔥 Full-Stack Boilerplate Template

A modern, production-ready full-stack application boilerplate designed to get you up and running quickly without starting from scratch.

## ✨ Tech Stack

- **Frontend:** Vite + React.js
- **Backend:** Node.js + Express + Prisma ORM
- **Authentication:** Built-in auth and authorization
- **Testing:** Comprehensive test suite with coverage reports
- **Database:** SQLITE/PostgreSQL (configurable)

## 📁 Project Structure

```
.
├── client/          # Frontend - Vite + React.js
│   ├── src/
│   ├── public/
│   └── package.json
└── server/          # Backend - Node.js + Express + Prisma
    ├── src/
    ├── prisma/
    ├── tests/
    ├── server.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend development server will start at `http://localhost:5173`

### 3. Backend Setup

```bash
cd server
npm install
```

### 4. Database Configuration

1. Create a `.env` file in the `server/` directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=8000
```

2. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Start the backend server:
```bash
nodemon server.js
OR
npm server.js
```

The backend API will be available at `http://localhost:8000`

## 🧪 Testing

### Run Tests
```bash
cd server
npm test
```

### Test Coverage Report
```bash
npm run test:coverage
```

### Test Environment Setup
For testing with a separate database:
```bash
NODE_ENV=test npx prisma migrate dev --name init
```

## 📚 Available Scripts

### Frontend (`client/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (`server/`)
- `npm test` - Run test suite
- `npm run test:coverage` - Run tests with coverage report
- `npx prisma studio` - Open Prisma database browser

## ✅ Features

- ✅ **Modern Frontend:** React 18 with Vite for fast development
- ✅ **Robust Backend:** Express.js with proper middleware setup
- ✅ **Database ORM:** Prisma for type-safe database operations
- ✅ **Authentication:** JWT-based auth system ready to use
- ✅ **Authorization:** Role-based access control
- ✅ **Testing:** Jest test suite with coverage reporting
- ✅ **Hot Reload:** Both frontend and backend support hot reloading
- ✅ **Production Ready:** Optimized build configurations
- ✅ **Clean Architecture:** Modular and scalable code structure

## 🛠️ Development Workflow

1. **Start both servers** in development mode:
   ```bash
   # Terminal 1 - Frontend
   cd client && npm run dev
   
   # Terminal 2 - Backend  
   cd server && node server.js
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


**Happy coding! 🎉**
