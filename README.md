# Task Manager Full-Stack Project

## Project Description
This is a full-stack Task Manager web application. Users can register, login, add tasks, view tasks, open task details, mark tasks as complete, and delete tasks. The React frontend connects to a Node.js/Express REST API, and the backend stores users and tasks in a MySQL database.

## Tech Stack
- React
- React Router
- CSS
- Node.js
- Express.js
- MySQL
- JWT authentication
- bcrypt password hashing
- CORS
- dotenv environment variables

## Main Features
- User registration and login
- Secure password storage using bcrypt
- JWT-protected task routes
- Create, read, update, and delete tasks
- MySQL database relationship: one user can own many tasks
- Responsive design for desktop, tablet, and mobile
- Frontend connected to backend API

## Folder Structure
```text
task-manager-react
├── Backend
│   ├── config
│   │   └── db.js
│   ├── middleware
│   │   └── auth.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── sql
│   │   └── schema.sql
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── src
│   ├── components
│   │   ├── Navbar
│   │   │   └── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── TaskCard.jsx
│   ├── pages
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Home
│   │   │   └── Home.jsx
│   │   ├── AddTask.jsx
│   │   ├── TaskDetails.jsx
│   │   └── TaskList.jsx
│   ├── services
│   │   └── api.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
└── README.md
```

## MySQL Setup
1. Open MySQL Workbench, phpMyAdmin, XAMPP MySQL, or MySQL command line.
2. Run the SQL file:

```sql
Backend/sql/schema.sql
```

This creates:
- `task_manager_db`
- `users` table
- `tasks` table

## Backend Setup
Open a terminal in the `Backend` folder:

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env`, then edit the database details if needed:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=change_this_to_a_long_random_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task_manager_db
DB_PORT=3306
```

Start the backend:

```bash
npm run dev
```

Expected result:

```text
Connected to MySQL database
Server running on http://localhost:5000
```

## Frontend Setup
Open another terminal in the main project folder:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## How to Link React to MySQL
React does not connect directly to MySQL. The correct link is:

```text
React frontend → Express API → MySQL database
```

The connection is already done in these files:
- Frontend API calls: `src/services/api.js`
- Backend routes: `Backend/routes/authRoutes.js` and `Backend/routes/taskRoutes.js`
- MySQL connection: `Backend/config/db.js`
- Database tables: `Backend/sql/schema.sql`

## API Endpoints
### Authentication
```text
POST /api/auth/register
POST /api/auth/login
```

### Tasks
```text
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

Task routes require a JWT token.

## Demo Steps
1. Start MySQL.
2. Run `Backend/sql/schema.sql`.
3. Start backend with `npm run dev` inside `Backend`.
4. Start frontend with `npm run dev` in the main folder.
5. Register a new account.
6. Add a task.
7. View the task list.
8. Open task details.
9. Mark task as done.
10. Delete task.

## Live URL
Not deployed yet. Add your deployment link here after hosting the frontend and backend.
