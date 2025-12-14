# Auth & User API Documentation

This document describes all available authentication and user-related API endpoints, including request formats, validation rules, and example responses.

---

## Swagger Docs

```

http://localhost:5500/api-docs
https://image-compress-upload.vercel.app/api-docs
```

## Base URL

```
/api/v1
```

---

## Authentication Endpoints

### 1. Register User

**Endpoint**

```
POST /auth/register
```

**Description**
Registers a new user with a profile picture and certificate PDF. Also creates a user profile and sends a welcome email after successful registration.

**Request Type**
`multipart/form-data`

**Required Fields**

| Field          | Type           | Description          |
| -------------- | -------------- | -------------------- |
| name           | string         | User full name       |
| email          | string (email) | Unique email address |
| password       | string         | User password        |
| profilePic     | file (image)   | Profile picture      |
| certificatePdf | file (PDF)     | Certificate document |

**Example Request (cURL)**

```bash
curl -X POST /api/v1/auth/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=123456" \
  -F "profilePic=@profile.jpg" \
  -F "certificatePdf=@certificate.pdf"
```

**Success Response**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "_id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "profile": "profileId"
  }
}
```

**Error Responses**

* `400` Validation error or missing files
* `409` Email already registered
* `500` Server error

---

### 2. Login User

**Endpoint**

```
POST /auth/login
```

**Description**
Authenticates a user using email and password and returns access & refresh tokens.

**Request Type**
`application/json`

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Success Response**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User Login Success",
  "data": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "user": {
      "_id": "userId",
      "name": "John Doe",
      "email": "john@example.com",
      "profile": "profileId"
    }
  }
}
```

**Error Responses**

* `400` Email does not exist
* `400` Incorrect password

---

## User Endpoints

### 3. Get All Users

**Endpoint**

```
GET /users
```

**Description**
Returns a list of all registered users along with their profile information. Passwords are excluded.

**Authentication**
Required (Access Token)

**Headers**

```
Authorization: Bearer <accessToken>
```

**Success Response**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully",
  "data": [
    {
      "_id": "userId",
      "name": "John Doe",
      "email": "john@example.com",
      "profile": {
        "profilePic": "https://cloudinary.com/...",
        "certificatePdf": "https://cloudinary.com/..."
      }
    }
  ]
}
```

**Error Responses**

* `401` Unauthorized
* `500` Server error

---

## Common Response Format

All APIs follow a standard response format:

```json
{
  "success": boolean,
  "statusCode": number,
  "message": string,
  "data": any
}
```

---

## Notes

* Passwords are hashed using **bcrypt**
* Files are uploaded to **Cloudinary**
* Emails are sent using **Nodemailer + EJS templates**
* MongoDB transactions are used for data consistency

---

## Future Enhancements

* Email verification
* Password reset
* Role-based access control (RBAC)
* Pagination & filtering for users list

---

**Maintained By:** Backend Team

---

## ▶️ Running the Project

You can run this project using **Bun** or **npm**.

---

### 🔹 Using Bun (Recommended)

#### 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal after installation.

#### 2. Install dependencies

```bash
bun install
```

#### 3. Setup environment variables

```bash
cp .env.example .env
```

Fill in required values (MongoDB, Cloudinary, JWT, Email SMTP).

#### 4. Run in development

```bash
bun run dev
```

#### 5. Run in production

```bash
bun run build
bun run start
```

---

### 🔹 Using npm

#### 1. Install dependencies

```bash
npm install
```

#### 2. Setup environment variables

```bash
cp .env.example .env
```

#### 3. Run in development

```bash
npm run dev
```

#### 4. Build & run in production

```bash
npm run build
npm run start
```

---

### 🔹 Default Scripts

```json
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---
