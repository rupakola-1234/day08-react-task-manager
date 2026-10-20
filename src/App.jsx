
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React components", completed: false },
    { id: 2, title: "Practice useState", completed: true },
  ]);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">DAY 08 · REACT FUNDAMENTALS</p>
        <h1>My Task Manager</h1>
        <p className="subtitle">
          Organize your day, one task at a time.
        </p>
      </header>

      <section className="task-card">
        <div className="task-summary">
          <div>
            <h2>Your tasks</h2>
            <p>{remainingTasks} tasks remaining</p>
          </div>

          <span className="task-count">{tasks.length}</span>
        </div>

        <TaskForm onAddTask={addTask} />

        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />

        <p className="footer-note">
          Your tasks are stored in React state for this session.
        </p>
      </section>
    </main>
  );
}

export default App;
