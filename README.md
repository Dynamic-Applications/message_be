# Messaging App Database Schema

This is the database schema for a messaging application. The schema includes tables for users, roles, conversations, messages, and user-conversation relationships. Below is a description of the tables and their structure.

## Tables Overview

### 1. `users` Table
Stores information about the users registered on the platform.

| Column                   | Type           | Description                                           |
|--------------------------|----------------|-------------------------------------------------------|
| `id`                     | int            | Primary Key, unique identifier for each user          |
| `username`               | varchar        | Username of the user                                  |
| `email`                  | varchar        | Email of the user, must be unique                     |
| `password`               | varchar        | Password for the user's account                       |
| `reset_password_token`   | str            | Token used for password reset                         |
| `reset_password_token_expires` | timestamp | Expiration time of the reset password token           |
| `created_at`             | timestamp      | Date and time when the user was created               |
| `role_id`                | int            | Foreign Key referring to the `roles` table (user role) |

### 2. `roles` Table
Defines the different roles available for users (e.g., admin, user).

| Column   | Type    | Description                              |
|----------|---------|------------------------------------------|
| `id`     | int     | Primary Key, unique identifier for role  |
| `rolename` | varchar | Name of the role (e.g., "admin", "user") |

### 3. `conversations` Table
Stores information about conversations between users.

| Column        | Type      | Description                             |
|---------------|-----------|-----------------------------------------|
| `id`          | int       | Primary Key, unique identifier for conversation |
| `created_at`  | timestamp | Date and time when the conversation was created |

### 4. `messages` Table
Stores the messages sent within conversations.

| Column           | Type       | Description                                        |
|------------------|------------|----------------------------------------------------|
| `id`             | int        | Primary Key, unique identifier for the message     |
| `sender_id`      | int        | Foreign Key referencing the `users` table (sender) |
| `conversation_id`| int        | Foreign Key referencing the `conversations` table (conversation) |
| `content`        | text       | The content of the message                        |
| `sent_at`        | timestamp  | Date and time when the message was sent           |

### 5. `conversation_users` Table
Maps users to conversations, enabling many-to-many relationships between users and conversations.

| Column          | Type      | Description                                      |
|-----------------|-----------|--------------------------------------------------|
| `id`            | int       | Primary Key, unique identifier for the record    |
| `conversation_id` | int     | Foreign Key referencing the `conversations` table |
| `user_id`       | int       | Foreign Key referencing the `users` table        |

## Relationships Between Tables

- **Users and Roles**: The `users` table is related to the `roles` table by the `role_id` column. Each user has one role, and roles define what a user can do within the application.
- **Users and Messages**: The `messages` table references the `users` table through the `sender_id` column, representing the sender of the message.
- **Conversations and Users**: The `conversation_users` table maps the many-to-many relationship between users and conversations. Each record represents a user being part of a conversation.
- **Conversations and Messages**: Each message is part of a conversation, which is represented by the `conversation_id` in the `messages` table.
- **Users and Conversations**: Through the `conversation_users` table, users can be participants in multiple conversations, while a conversation can have multiple users.

## Usage

The schema is designed to support a messaging platform where users can:

- Register with unique usernames and emails.
- Reset passwords via tokens.
- Participate in multiple conversations.
- Send and receive messages within conversations.
- Have different roles (e.g., admin, regular user).

## Conclusion

This schema provides a foundational structure for a messaging application, supporting user authentication, conversation management, and message exchanges. It is scalable for further features such as user profile management, attachments, notifications, and more.

