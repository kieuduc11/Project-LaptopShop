# 🛒 LaptopShop MVC

LaptopShop is a full-stack e-commerce web application built with **Node.js, Express.js, TypeScript, Prisma ORM, and MySQL**, following the **MVC (Model–View–Controller)** architecture.

The application provides a complete online shopping experience, including user authentication, product browsing, shopping cart management, and order processing, along with an administration panel for managing products and users.

---

## 🌐 Deployment

The project is fully deployed using cloud services:

* **Backend:** Render
* **Database:** Aiven Cloud (MySQL)

---

## 🚀 Live Demo

👉 https://project-laptopshop.onrender.com

---

## 🔑 Demo Account

Use the following administrator account to explore the management features:

| Role      | Email                  | Password |
| --------- | ---------------------- | -------- |
| **Admin** | `kieuduc223@gmail.com` | `123456` |

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MySQL
* Prisma ORM

### Frontend

* EJS Template Engine
* Bootstrap
* CSS

### Deployment

* Render
* Aiven Cloud

---

## 🏗 Architecture

This project follows the **MVC (Model–View–Controller)** architecture:

* **Model:** Prisma ORM with MySQL database
* **View:** EJS templates for server-side rendering
* **Controller:** Express controllers handling business logic and request processing

---

## ✨ Features

### 👤 User Features

* User registration and login
* Session-based authentication
* Browse laptop products
* Product filtering and pagination
* Add products to shopping cart
* Update or remove cart items
* Place orders

### 🔐 Admin Features

* Admin authentication
* Create, update, and delete products
* Manage product inventory
* Manage user accounts

---

## ⚙️ Installation (Run Locally)

### 1. Clone the repository

```bash
git clone https://github.com/kieuduc11/Project-LaptopShop.git
cd Project-LaptopShop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://username:password@host:port/database"
PORT=3000
NODE_ENV=development
```

### 4. Generate Prisma Client and apply migrations

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
npm run dev      # Run development server
npm run build    # Compile TypeScript project
npm start        # Start production server
```

---

## 📄 License

This project was developed for educational and portfolio purposes.
