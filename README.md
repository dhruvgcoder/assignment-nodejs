# GitHub Profile Analyzer API

A backend service that fetches GitHub user profiles and repositories using the GitHub public API and stores the data in a MySQL database.

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL database (local or Railway)

### Installation

1. Clone the repository
   
   git clone https://github.com/dhruvgcoder/assignment-nodejs.git
   cd assignment-nodejs

2. Install dependencies
   
   npm install

3. Configure environment variables
   
   cp .env.example .env
   
   Update `.env` with your database URL:
   
   DB_URL=mysql://user:password@host:port/dbname

4. Create tables
   
   node db/schema.js

5. Start the server
   
   npm start

Server runs on `http://localhost:3001`

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/:username` | Fetch from GitHub and store user profile |
| GET | `/user/all` | Get all stored user profiles |
| GET | `/user/:username` | Get a single user profile |

### Repos

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/:username/repos` | Fetch from GitHub and store user repositories |
| GET | `/user/:username/repos` | Get all stored repos for a user |

## Example Requests

**Store a user profile**
POST http://localhost:3001/user/dhruvgcoder

**Get all users**
GET http://localhost:3001/user/all

**Store repos for a user**
POST http://localhost:3001/user/dhruvgcoder/repos

**Get repos for a user**
GET http://localhost:3001/user/dhruvgcoder/repos

## Database Schema

See `schema.sql` for the full database schema.

## Features Beyond Requirements

- Repositories stored with full metadata (language, stars, size, created_at)
- Foreign key constraint with CASCADE delete between users and repos
- Bulk insert for repositories for better performance
- GitHub user validation before inserting into database