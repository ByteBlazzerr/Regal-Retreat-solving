# 🏨 Regal-Retreat

A full-stack hotel booking platform where users can discover and reserve rooms, and hotel owners can manage listings. It includes secure payments, real-time availability, and image management.

## ✨ Features

### 👤 User (Guest)

* Sign up / Log in
* Browse and search hotels by city or availability
* View detailed hotel and room listings
* Book rooms with live availability checks
* Pay securely using **Stripe**
* View and manage bookings
* Cancel reservations (as per cancellation policy)

### 🏨 Hotel Owner

* Owner registration and login
* Add hotel listings with name, location, amenities, etc.
* Upload hotel and room images using **Cloudinary**
* Add/edit/delete rooms, set pricing and availability
* View all bookings for their hotel
* Dashboard to track booking stats

### 💳 Payments

* **Stripe integration** for secure card payments
* Transaction confirmation on successful booking

---

## 🔧 Tech Stack

### Frontend

* React.js
* Redux
* Tailwind CSS
* Axios

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cloudinary (image upload)
* Stripe API (payment handling)

---

## 🚀 Getting Started

### Prerequisites

* Node.js v14+
* MongoDB Atlas or local instance
* Stripe account
* Cloudinary account

### Installation

```bash
git clone https://github.com/ByteBlazzerr/Hotel_booking.git
cd Hotel_booking
```

#### Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `/server`

```bash
npm start
```

#### Frontend Setup

```bash
cd ../client
npm install
npm start
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

---

## 📁 Project Structure

```
Hotel_booking/
├── client/           # React frontend
│   └── src/
├── server/           # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
```

---

## 📦 API Overview

**Auth**

* `POST /api/auth/register`
* `POST /api/auth/login`

**Hotels**

* `GET /api/hotels`
* `POST /api/hotels` (owner only)

**Rooms**

* `POST /api/rooms/:hotelId`
* `GET /api/rooms/:hotelId`

**Bookings**

* `POST /api/bookings`
* `GET /api/bookings/user`
* `DELETE /api/bookings/:id`

**Payments**

* `POST /api/create-checkout-session` (Stripe)

---

## 🖼️ Screenshot

![image](https://github.com/user-attachments/assets/ce9c8c70-62f8-4ea0-8a6e-20d8396339a8)

---

## 🙋‍♂️ Author

**ByteBlazzerr**
🔗 [GitHub Profile](https://github.com/ByteBlazzerr)


