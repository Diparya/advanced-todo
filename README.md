# Task Dashboard Application
## Overview
The Task Dashboard is a dynamic and responsive web application designed to help users manage tasks efficiently. With features such as task addition, editing, deletion, filtering, and persistent storage using localStorage, this application ensures an intuitive and effective task management experience. Authentication powered by Firebase.
## Features
1. User Authentication:
   - Displays user details such as profile picture and name (fetched from an authentication provider).
2. Task Management:
   - Add, edit, delete tasks.
   - Mark tasks as complete or pending.
   - Assign due dates to tasks.
3. Search and Filter:
   - Search tasks by title or description.
   - Filter tasks based on their status: All, Completed, Pending, or Overdue.
4. Persistence:
   - Tasks are saved in localStorage and automatically loaded upon page refresh.
6. Responsive Design:
   - Fully responsive layout for seamless usage across devices.
## Tech Stack
### Frontend:
- Next.js: Core framework for building the UI.
- Redux Toolkit: State management.
- TailwindCSS: Styling framework for a responsive and modern UI.
### Backend:
- localStorage: Used for storing tasks persistently on the client side.
### Additional Libraries:
- AuthContext: Custom context for handling user authentication.
## Installation and Setup
### Prerequisites
- Node.js and npm installed on your machine.
### Steps
1. Clone the Repository:
   ```bash
   git clone https://github.com/Diparya/advanced-todo 
   cd advanced-todo 
2. Install Dependencies:
   ```bash
   npm install
3. Run the Application:
   ```bash
   npm run dev
The app will run locally, typically accessible at http://localhost:3000/.

## Usage
### Adding a Task
- Enter the task title and optional description in the input fields.
- Assign a due date using the date picker (if needed).
- Click Add Task.
### Editing a Task
- Click the Edit button on a task.
- Update the task details in the form.
- Click Update Task.
### Deleting a Task
- Click the Delete button to remove a task permanently.
### Marking Task Status
- Use the Mark Complete or Mark Pending button to toggle task status.