# Rick & Morty Character Management System

A secure REST API built with Node.js, Express.js, MongoDB, Passport.js, and JWT Authentication for managing Rick & Morty characters. Users can register, log in, and perform CRUD operations on their own characters while accessing public character data.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Passport.js JWT Strategy
* Password Hashing using bcryptjs
* Protected Routes
* User-specific Authorization

### Character Management

* Create Characters
* View All Characters
* View Single Character
* Update Characters
* Delete Characters
* Store Character Images using URLs
* Track Character Creator

### Security

* Password Encryption
* JWT-based Access Control
* Protected API Endpoints
* Ownership Validation for Updates and Deletion
* Environment Variable Configuration

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport JWT
* JSON Web Tokens (JWT)
* bcryptjs

### Other Tools

* dotenv
* cors

---

## Project Structure

```text
BackendTask/
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── Middleware/
│   └── auth.js
│
├── Models/
│   ├── user.js
│   └── charecter.js
│
├── Routes/
│   ├── authRoutes.js
│   └── charecterRoutes.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/MPRT1/rick-and-morty-character-system.git
cd rick-and-morty-character-system
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### Start Application

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

#### Current User

```http
GET /api/auth/me
```

---

### Characters

#### Get All Characters

```http
GET /api/characters
```

#### Get Character By ID

```http
GET /api/characters/:id
```

#### Create Character

```http
POST /api/characters
```

#### Update Character

```http
PUT /api/characters/:id
```

#### Delete Character

```http
DELETE /api/characters/:id
```

#### Get My Characters

```http
GET /api/characters/user/my-characters
```

---

## Sample Character Payload

```json
{
  "name": "Rick Sanchez",
  "species": "Human",
  "status": "Alive",
  "gender": "Male",
  "origin": "Earth C-137",
  "location": "Citadel of Ricks",
  "description": "Genius scientist and inventor",
  "imageUrl": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
}
```

---

## Authentication Example

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Deployment

This application is deployment-ready and can be hosted on:

* Render
* Railway
* Cyclic
* VPS Hosting

### Required Environment Variables

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=5000
```

---

## Security Features

* Password Hashing with bcryptjs
* JWT Token Authentication
* Passport JWT Strategy
* Protected Routes
* Resource Ownership Validation
* Environment Variable Protection

---

## Future Enhancements

* Search & Filtering
* Pagination
* Character Favorites
* User Profile Management
* Admin Dashboard
* Character Categories
* API Rate Limiting

---

## Author

**Munagala Poorna Ravi Teja**

GitHub: https://github.com/MPRT1

---

## License

ISC License

---

Built using Node.js, Express.js, MongoDB, Passport.js, and JWT Authentication.
