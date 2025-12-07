# Blog API – Authors & Posts (Node.js + MySQL + Sequelize)

## Overview

This project is a RESTful API for a simple blog platform that manages **authors** and their corresponding **posts**.

It focuses on:

- Modeling a **one-to-many** relationship (one author → many posts)
- Using **foreign key constraints** with **ON DELETE CASCADE**
- Efficient queries with **JOIN / eager loading** to avoid the **N+1 problem**
- Proper validation and error handling

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MySQL
- **ORM**: Sequelize

---

## Features

- CRUD operations for **Authors** (`/authors`)
- CRUD operations for **Posts** (`/posts`)
- One-to-many relationship: each post belongs to an author
- `authorId` foreign key in `posts` table with **ON DELETE CASCADE**
- `GET /authors/:id/posts` to fetch all posts for a specific author
- `GET /posts/:id` returns post + nested author details
- `GET /posts?author_id=...` supports filtering by author
- Proper validation:
  - Cannot create a post with a non-existent `authorId`
  - 404 responses for non-existent authors/posts
- Efficient eager loading with Sequelize `include` (JOIN) to avoid N+1 queries

---
