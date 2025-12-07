ChatGPT said:

Perfect — below is a clean, evaluation-ready README.md written exactly based on your given instructions.
You can directly copy–paste this into your README.md file in your GitHub project.

✅ FINAL README.md (COPY–PASTE THIS AS IT IS)
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

Make sure you have the following installed:

- **Node.js** (v16 or above)
- **MySQL Server** (v8 recommended)
- **Git**
- **Postman** (optional but recommended for testing)

---

### 2.2 Clone the Repository

bash
git clone https://github.com/SriRama-Bonthu/blog-api.git
cd blog-api

2.3 Install Dependencies
npm install

2.4 Database Configuration

Open MySQL and create the database:

CREATE DATABASE blog_api_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;


Open the file:

config/db.js


Update it with your MySQL credentials:

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog_api_db", "root", "YOUR_PASSWORD", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;


Replace YOUR_PASSWORD with your actual MySQL password.

2.5 Run the Application
npm run dev


If everything is configured correctly, you will see:

✅ MySQL connection OK
✅ Models synchronized
🚀 Server running at http://localhost:3000

3. Database Schema & Relationship (ERD)
3.1 authors Table
Column	Type	Description
id	INT (PK)	Primary Key
name	VARCHAR	Author name
email	VARCHAR (UNIQUE)	Author email
createdAt	DATETIME	Created timestamp
updatedAt	DATETIME	Updated timestamp
3.2 posts Table
Column	Type	Description
id	INT (PK)	Primary Key
title	VARCHAR	Post title
content	TEXT	Post content
authorId	INT (FK)	References authors.id
createdAt	DATETIME	Created timestamp
updatedAt	DATETIME	Updated timestamp
3.3 Entity Relationship Diagram (Text-Based)
authors (1) ───────────── (∞) posts
authors.id = posts.authorId

- One Author → Many Posts
- Each Post → One Author
- Foreign Key: posts.authorId → authors.id
- ON DELETE CASCADE is enabled


This ensures that when an author is deleted, all their corresponding posts are automatically deleted.

4. API Documentation

Base URL:

http://localhost:3000

4.1 Author APIs (/authors)
✅ Create Author

POST /authors

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com"
}


Response (201):

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

✅ Get All Authors

GET /authors

[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]

✅ Get Author by ID

GET /authors/1

{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}

✅ Update Author

PUT /authors/1

{
  "name": "Updated Name",
  "email": "updated@example.com"
}

✅ Delete Author

DELETE /authors/1

{
  "message": "Author deleted successfully"
}

✅ Get Posts of an Author

GET /authors/1/posts

[
  {
    "id": 1,
    "title": "My First Post",
    "content": "Post content"
  }
]

4.2 Post APIs (/posts)
✅ Create Post

POST /posts

{
  "title": "My First Post",
  "content": "This is my first post",
  "authorId": 1
}

✅ Get All Posts

GET /posts

[
  {
    "id": 1,
    "title": "My First Post",
    "content": "This is my first post",
    "author": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]

✅ Get Post by ID

GET /posts/1

{
  "id": 1,
  "title": "My First Post",
  "content": "This is my first post",
  "author": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}

✅ Update Post

PUT /posts/1

{
  "title": "Updated Title",
  "content": "Updated content"
}

✅ Delete Post

DELETE /posts/1

{
  "message": "Post deleted successfully"
}

5. Efficient Query Handling (N+1 Problem)

The API uses Sequelize eager loading (include) to fetch posts along with their authors in a single SQL JOIN query.
This avoids the N+1 query problem and ensures optimal performance.

6. Error Handling

The API returns proper HTTP status codes and error messages:

400 – Invalid input (missing fields, invalid authorId)

404 – Resource not found (author/post)

500 – Internal server error

Example error response:

{
  "error": "Author not found"
}
