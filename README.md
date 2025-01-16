# Task Manager Web Application

A **Task Manager** built with **Next.js** and **Firebase** for managing personal tasks. Users can add, edit, delete, and filter tasks with a seamless and responsive user experience. Authentication and real-time database synchronization are powered by Firebase.

---

## Features

1. **User Authentication**:
   - Sign up and log in with Firebase Authentication.

2. **Task Management**:
   - Add new tasks with a title and description.
   - Edit or delete existing tasks.

3. **Search Functionality**:
   - Filter tasks dynamically by title or description using a search bar.

4. **Real-Time Updates**:
   - Data is synchronized in real time using Firebase Firestore.

5. **Responsive Design**:
   - Optimized for all devices (mobile, tablet, and desktop).

---

## Tech Stack

- **Frontend**: React.js (via Next.js)
- **Backend**: Firebase Firestore (NoSQL Database)
- **Authentication**: Firebase Authentication
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or above)
- **Firebase Account**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Diparya/task-manager-firebase
   cd task-manager-firebase
2. Install dependencies:
    ```bash
    npm install
3. Create a **.env.local** file in the root directory with the    following Firebase configuration:
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
4. Set up Firebase Firestore:
- Go to the Firebase Console.
- Create a Firestore database.
- Add a tasks collection with fields title, description, userId, and createdAt.
5. Start the development server:
    ```bash
    npm run dev
Open your browser and navigate to http://localhost:3000.

## Usage
1. **Log In**: Use Firebase Authentication to sign in or create an account.
2. **Add Tasks**: Enter a title and description to add a new task.
3. **Edit/Delete Tasks**: Use the provided buttons to edit or delete tasks.
4. **Search**: Use the search bar to filter tasks by title or description.

## Future Improvements
- Add task due dates and priorities.
- Implement drag-and-drop task sorting.
- Introduce project categories and tags.
- Add dark mode for the UI.

## Folder Structure
  ```bash
    task-manager-firebase/
    ├── components/
    │   ├── Navbar.js          # Navigation bar component
    │   └── TaskDashboard.js   # Main task manager component
    ├── utils/
    │   ├── AuthContext.js     # Firebase authentication context
    │   └── firebase.js        # Firebase configuration and initialization
    ├── styles/                # Global CSS or Tailwind configuration
    ├── pages/                 # Next.js pages
    └── public/                # Static assets


