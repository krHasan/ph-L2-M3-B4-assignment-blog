# Blogging Platform Backend

## Overview

The goal of this project is to develop a backend for a blogging platform that allows users to write, update, and delete their blogs. The system supports two roles: **Admin** and **User**. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. This backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Live Demo

Want to test your own, please use this link
https://ph-l2-m3-b4-assignment.vercel.app/

## Technologies Used

-   **TypeScript**
-   **Node.js**
-   **Express.js**
-   **MongoDB** with **Mongoose**

## Features

### User Roles

#### Admin:

-   Created manually in the database with predefined credentials.
-   Can delete any blog.
-   Can block any user by updating a property `isBlocked`.
-   Cannot update any blog.

#### User:

-   Can register and log in.
-   Can create blogs (only when logged in).
-   Can update and delete their own blogs.
-   Cannot perform admin actions.

### Authentication & Authorization

-   **Authentication:** Users must log in to perform write, update, and delete operations.
-   **Authorization:** Admin and User roles are differentiated and secured.

### Blog API

A public API is provided for reading blogs:

-   Includes blog title, content, author details, and other necessary information.
-   Supports search, sorting, and filtering functionalities.

## Data Models

### User Model

```typescript
{
    name: string; // The full name of the user.
    email: string; // The email address, used for authentication.
    password: string; // Securely stored password.
    role: "admin" | "user"; // Role of the user. Default is "user".
    isBlocked: boolean; // Indicates whether the user is blocked. Default is false.
    createdAt: Date; // Timestamp when the user was created.
    updatedAt: Date; // Timestamp of the last update.
}
```

### Blog Model

```typescript
{
    title: string; // Title of the blog post.
    content: string; // Main body or content of the blog post.
    author: ObjectId; // Reference to the User model.
    isPublished: boolean; // Indicates if the blog post is published. Default is true.
    createdAt: Date; // Timestamp when the blog post was created.
    updatedAt: Date; // Timestamp of the last update.
}
```

## API Endpoints

### 1. Authentication

#### 1.1 Register User

-   **POST** `/api/auth/register`
-   **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securepassword"
    }
    ```

#### 1.2 Login User

-   **POST** `/api/auth/login`
-   **Request Body:**
    ```json
    {
        "email": "john@example.com",
        "password": "securepassword"
    }
    ```

### 2. Blog Management

#### 2.1 Create Blog

-   **POST** `/api/blogs`
-   **Request Header:** `Authorization: Bearer <token>`
-   **Request Body:**
    ```json
    {
        "title": "My First Blog",
        "content": "This is the content of my blog."
    }
    ```

#### 2.2 Update Blog

-   **PATCH** `/api/blogs/:id`
-   **Request Header:** `Authorization: Bearer <token>`
-   **Request Body:**
    ```json
    {
        "title": "Updated Blog Title",
        "content": "Updated content."
    }
    ```

#### 2.3 Delete Blog

-   **DELETE** `/api/blogs/:id`
-   **Request Header:** `Authorization: Bearer <token>`

#### 2.4 Get All Blogs (Public)

-   **GET** `/api/blogs`
-   **Query Parameters:**
    -   `search`: Search blogs by title or content.
    -   `sortBy`: Sort blogs by specific fields (e.g., `createdAt`, `title`).
    -   `sortOrder`: Define sorting order (`asc` or `desc`).
    -   `filter`: Filter blogs by author ID.

### 3. Admin Actions

#### 3.1 Block User

-   **PATCH** `/api/admin/users/:userId/block`
-   **Request Header:** `Authorization: Bearer <admin_token>`

#### 3.2 Delete Blog

-   **DELETE** `/api/admin/blogs/:id`
-   **Request Header:** `Authorization: Bearer <admin_token>`

## Project Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/krHasan/ph-L2-M3-B4-assignment-blog.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file:
    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=<your_mongodb_connection_string>
    BCRYPT_SALT_ROUNDS=<you_number>
    JWT_ACCESS_SECRET=<your_jwt_secret>
    JWT_ACCESS_TOKEN_EXPIRES_IN=<token_expires_time>
    ```
4. Start the development server:
    ```bash
    npm run start:dev
    ```

## Feature Enhancement

-   Add support for **draft blogs**, allowing users to save blogs as drafts before publishing. Drafts can be edited and published later.

## Contribution

Contributions are welcome! Please fork the repository and create a pull request.

## License

MIT (do whatever you want to do :smile: )

Made by [krHasan](https://www.linkedin.com/in/kr-hasan/)
