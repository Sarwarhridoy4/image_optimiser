# Image Upload and Optimizer API

This is a robust and scalable API for handling image uploads, compression, and optimization. It provides a secure and efficient way to manage user profiles and associated images, with a focus on performance and developer experience.

## Features

-   **Secure User Authentication**: JWT-based authentication with access and refresh tokens.
-   **Image Compression**: Compresses uploaded images to WebP format for optimal performance.
-   **Cloudinary Integration**: Securely uploads and stores images on Cloudinary.
-   **Database Integration**: Uses MongoDB to store user and profile information.
-   **API Documentation**: Comprehensive API documentation powered by Swagger.
-   **Error Handling**: Centralized error handling for consistent and predictable error responses.
-   **Validation**: Robust request validation using Zod.
-   **Email Notifications**: Sends welcome emails to new users.

## Technologies Used

-   **Backend**: Node.js, Express.js, TypeScript
-   **Database**: MongoDB, Mongoose
-   **Authentication**: JWT (JSON Web Tokens)
-   **Image Processing**: Sharp
-   **File Uploads**: Multer
-   **Cloud Storage**: Cloudinary
-   **API Documentation**: Swagger
-   **Validation**: Zod
-   **Email**: Nodemailer, EJS

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (v18 or higher)
-   [Bun](https://bun.sh/) (optional, but recommended)
-   [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/image-optimiser.git
cd image-optimiser
```

### 2. Install dependencies

Using Bun (recommended):

```bash
bun install
```

Using npm:

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following environment variables:

```
# Server Configuration
PORT=5500
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB Configuration
MONGO_URI=your-mongodb-connection-string

# JWT Configuration
JWT_ACCESS_SECRET=your-jwt-access-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Email Configuration
EMAIL_HOST=your-email-host
EMAIL_PORT=your-email-port
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-pass
```

### 4. Run the application

Using Bun:

```bash
bun run dev
```

Using npm:

```bash
npm run dev
```

The application will be running at `http://localhost:5500`.

## API Documentation

For a detailed breakdown of API endpoints, authentication, and usage, please refer to the [API Documentation](API.md).

The API documentation is generated using Swagger and is available at:

-   **Local**: `http://localhost:5500/api-docs`
-   **Production**: `https://image-compress-upload.vercel.app/api-docs`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.