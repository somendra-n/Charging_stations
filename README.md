
# Charging Stations Management

A full-stack web application for managing electric vehicle charging stations — built with **Node.js, Express, and Vue.js**.

---

## 🚀 Project Overview

This app allows users to **register/login**, and **manage charging stations** with details such as name, location, status, power output, and connector type. It supports CRUD operations and provides a map view of charging stations.

---

## 🛠️ Features

### Backend (Node.js + Express)
- REST API with full CRUD for charging stations
- JWT-based User Authentication (Signup/Login)
- Protected routes requiring authentication
- Charging station data: Name, Location (lat/lng), Status, Power Output (kW), Connector Type
- Database: *Your choice (MongoDB/PostgreSQL/MySQL)*

### Frontend (Vue.js)
- User login screen
- Charger listing with filters (status, power, connector type)
- Add, Edit, Delete chargers
- Interactive map view using Google Maps/OpenStreetMap with clickable markers

---

## 📋 Prerequisites

- Node.js v14+
- npm or yarn
- Running database instance (MongoDB/PostgreSQL/MySQL)

---

## 🏁 Getting Started

### Backend Setup

```bash
# Navigate to backend directory (adjust if combined)
cd backend

# Install dependencies
npm install

# Create a .env file with your environment variables
# Example .env:
# PORT=5000
# DB_URI=your_database_connection_string
# JWT_SECRET=your_jwt_secret

# Start backend server
npm start
````

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run serve
```

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | Login & receive JWT |

### Charging Stations (Protected)

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | `/api/stations`     | Create charging station |
| GET    | `/api/stations`     | List all stations       |
| PUT    | `/api/stations/:id` | Update station details  |
| DELETE | `/api/stations/:id` | Delete a station        |

---

## 🎥 Demo Video

Check out the demo video showcasing the key features of this app:

[![Watch Demo](https://img.youtube.com/vi/Rl4Gm544PmE?feature=shared/0.jpg)](https://youtu.be/Rl4Gm544PmE?feature=shared)


---


## ⚙️ Technologies Used

* Node.js & Express
* MongoDB/PostgreSQL/MySQL
* JSON Web Tokens (JWT)
* Vue.js
* Google Maps or OpenStreetMap API

---

## 👤 Author

**Somendra N**

---



## 💬 Contact

You can reach me via GitHub or email.

---

```

