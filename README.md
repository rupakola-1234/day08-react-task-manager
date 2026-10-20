# Day 8 — React Task Manager

## Project Overview

This project is a simple Task Manager application built using React and Vite. It allows users to manage daily tasks through an interactive user interface.

## Features

- Add new tasks.
- Mark tasks as completed using checkboxes.
- Delete tasks.
- Display the number of remaining tasks.
- Show an empty-state message when there are no tasks.
- Use React state to update the interface dynamically.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- Vite

## Project Structure

```text
day08-react-task-manager/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── README.md
```

## How to Run the Project

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open the project folder in VS Code.
3. Open the terminal in the project folder.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

**Note:** In Windows PowerShell, use `npm.cmd install` and `npm.cmd run dev` if the `npm` command is blocked by the execution policy.

## React Concepts Practiced

- Components and JSX
- Props and component composition
- `useState` for state management
- Event handling
- Controlled form inputs
- Rendering lists with unique keys
- Conditional rendering

## Data Storage

Tasks are stored in React state. They are temporary and reset when the application is refreshed.

## Learning Outcome

This project demonstrates the fundamentals of building an interactive React frontend with reusable components and state management. It uses mock data and is not yet connected to a backend API.
