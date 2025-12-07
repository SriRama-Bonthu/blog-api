# Blog API – Authors & Posts (Node.js + MySQL + Sequelize)

## 1. Project Overview

This project is a RESTful API for a simple blog platform that manages **authors** and their corresponding **posts**.  
It demonstrates how to design and implement a **one-to-many relationship** using a relational database with proper **foreign key constraints**, **cascade delete**, and **efficient database queries**.

The API allows:
- Managing authors (create, read, update, delete)
- Managing posts (create, read, update, delete)
- Linking each post to a valid author
- Automatically deleting posts when their author is deleted
- Fetching data efficiently using JOIN queries to avoid the N+1 problem

---

## 2. Development Environment Setup

### 2.1 Prerequisites

- Node.js (v16 or above)
- MySQL Server (v8 recommended)
- Git
- Postman (optional but recommended for testing)

---

### 2.2 Clone the Repository

```bash
git clone https://github.com/SriRama-Bonthu/blog-api.git
cd blog-api
```

---

## 2.3 Install Dependencies

```bash
npm install
```

---

## 2.4 Database Configuration

Open MySQL and create the database:

```sql
CREATE DATABASE blog_api_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Open the file:

```
config/db.js
```

Update it with your MySQL credentials:

```js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog_api_db", "root", "YOUR_PASSWORD", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
```

Replace `YOUR_PASSWORD` with your actual MySQL password.

---

## 2.5 Run the Application

```bash
npm run dev
```

If everything is configured correctly, you will see:

```text
✅ MySQL connection OK
✅ Models synchronized
🚀 Server running at http://localhost:3000
```

---

## 3. Database Schema & Relationship (ERD)

### 3.1 `authors` Table

| Column     | Type              | Description         |
|------------|-------------------|---------------------|
| id         | INT (PK)          | Primary Key         |
| name       | VARCHAR           | Author name         |
| email      | VARCHAR (UNIQUE)  | Author email        |
| createdAt | DATETIME          | Created timestamp  |
| updatedAt | DATETIME          | Updated timestamp  |

---

### 3.2 `posts` Table

| Column     | Type      | Description                         |
|------------|-----------|-------------------------------------|
| id         | INT (PK)  | Primary Key                         |
| title      | VARCHAR   | Post title                          |
| content    | TEXT      | Post content                        |
| authorId  | INT (FK)  | References `authors.id`            |
| createdAt | DATETIME  | Created timestamp                  |
| updatedAt | DATETIME  | Updated timestamp                  |

---

### 3.3 Entity Relationship Diagram (Text-Based)

```text
authors (1) ───────────── (∞) posts
authors.id = posts.authorId

- One Author → Many Posts
- Each Post → One Author
- Foreign Key: posts.authorId → authors.id
- ON DELETE CASCADE is enabled
```

---

## 4. API Documentation

Base URL:

```text
http://localhost:3000
```

---

## 4.1 Author APIs (`/authors`)

### Create Author  
POST /authors

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 4.2 Post APIs (`/posts`)

### Create Post  
POST /posts

```json
{
  "title": "My First Post",
  "content": "This is my first post",
  "authorId": 1
}
```

---

## 5. Error Handling

- 400 – Invalid input
- 404 – Resource not found
- 500 – Internal server error

---

## 6. Postman Collection (Optional)

```
blog-api.postman_collection.json
```

---

## 7. GitHub Repository

https://github.com/SriRama-Bonthu/blog-api
