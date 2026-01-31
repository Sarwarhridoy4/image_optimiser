# API Documentation

This document provides a high-level overview of the API endpoints available in the Image Upload and Optimizer application. For detailed information on each endpoint, including request/response schemas, parameters, and examples, please refer to the interactive Swagger documentation.

## Base URL

`http://localhost:5500/api/v1` (for local development)
`https://image-compress-upload.vercel.app/api/v1` (for production)

## Authentication

All protected endpoints require a JSON Web Token (JWT) in the `Authorization` header with the `Bearer` scheme (e.g., `Bearer <your_jwt_token>`). Access tokens are obtained via the authentication endpoints.

## API Modules

### 1. Authentication (`/api/v1/auth`)

Handles user registration, login, token refreshing, and password management.

-   **`POST /api/v1/auth/register`**: Register a new user.
-   **`POST /api/v1/auth/login`**: Log in an existing user and receive JWT tokens.
-   **`POST /api/v1/auth/refresh-token`**: Obtain a new access token using a refresh token.
-   **`POST /api/v1/auth/change-password`**: Change user password.
-   **`POST /api/v1/auth/forgot-password`**: Initiate password reset process.
-   **`POST /api/v1/auth/reset-password`**: Reset password using a reset token.

### 2. Users (`/api/v1/users`)

Manages user-related operations.

-   **`GET /api/v1/users`**: Retrieve a list of all users (admin only).
-   **`GET /api/v1/users/:id`**: Retrieve a specific user by ID.
-   **`PATCH /api/v1/users/:id`**: Update user details by ID (admin only).
-   **`DELETE /api/v1/users/:id`**: Delete a user by ID (admin only).

### 3. Profile (`/api/v1/profile`)

Handles user profile management, including image uploads and updates.

-   **`GET /api/v1/profile`**: Retrieve the authenticated user's profile.
-   **`PATCH /api/v1/profile`**: Update the authenticated user's profile information.
-   **`POST /api/v1/profile/upload-avatar`**: Upload or update the user's avatar image.
-   **`DELETE /api/v1/profile/delete-avatar`**: Delete the user's avatar image.

---

## Detailed API Reference (Swagger)

For a complete and interactive reference of all API endpoints, including detailed request/response models, try-it-out functionality, and status codes, please visit the Swagger UI documentation:

-   **Local**: `http://localhost:5500/api-docs`
-   **Production**: `https://image-compress-upload.vercel.app/api-docs`
