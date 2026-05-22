# 🛒 LaptopShop MVC

LaptopShop is a full-stack web application built with **Node.js, Express, TypeScript, Prisma, and MySQL**, following the **MVC architecture**.  
It is an e-commerce platform for selling laptops with features like product management, shopping cart, user authentication, and order processing.

---
## 🌐 Deployment

This project is fully deployed using cloud services:

- Backend: Render
- Database: Aiven (MySQL Cloud)
---
## 🚀 Live Demo

👉 https://project-laptopshop.onrender.com

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL (Cloud database - Aiven)
- EJS Template Engine
- Bootstrap / CSS
- Nodemon (development)
- Render (deployment)

---

## ✨ Features

### 👤 User Features
- User registration and login
- View product list
- Product filtering and pagination
- Add products to cart
- Update / remove cart items
- Place orders

### 🔐 Admin Features
- Admin authentication
- Create / update / delete products
- Manage product inventory
- Manage users

---
## ⚙️ Installation (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/kieuduc11/Project-LaptopShop
cd laptopshop
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup environment variables
Create a .env file:
```env
DATABASE_URL="mysql://username:password@host:port/database"
PORT=3000
NODE_ENV=development
```
### 4. Prisma setup
```bash
npx prisma generate
npx prisma migrate deploy
```
### 5. Run development server
```bash
npm run dev
```
App will run at:
```bash
http://localhost:3000
```
