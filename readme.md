# Plate Share Server

Plate Share Server is the backend API for the
[Plate Share](https://plate-share-v1.vercel.app) web application — a
food-sharing platform that connects donors with those in need, helping to reduce
food waste and support the community.

This RESTful API is built with Node.js, Express.js, MongoDB, and Firebase Admin
SDK for secure and efficient data management.

---

## Live Links

- Frontend (Client):
  [https://plate-share-v1.vercel.app](https://plate-share-v1.vercel.app)
- Backend (Server):
  [https://plate-share-serv1.vercel.app](https://plate-share-serv1.vercel.app)

---

## Features

### Authentication

- Firebase Admin SDK for verifying tokens
- Secure routes using JWT (JSON Web Token)
- User data validation and authorization

### Food Management

- Add, edit, delete, and fetch food items
- Filter by donor email, status, or expiration date
- Handle food status updates (Available / Donated)

### Request Handling

- Donors can view all requests for their listed foods
- Receivers can send food requests
- Real-time request tracking using MongoDB

---

## Technologies Used

| Category       | Technologies            |
| -------------- | ----------------------- |
| Runtime        | Node.js                 |
| Framework      | Express.js              |
| Database       | MongoDB (Atlas)         |
| Authentication | Firebase Admin SDK, JWT |
| Environment    | dotenv, cors, nodemon   |
| Hosting        | Vercel                  |
