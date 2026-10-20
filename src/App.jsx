
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");

  // Load tasks from FastAPI when the component starts
  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load tasks from the server.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // Add a new task through FastAPI
  async function addTask(title) {
    setRequestError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Could not add task. Check the task title.");
      }

      const newTask = await response.json();

      setTasks((currentTasks) => [...currentTasks, newTask]);
    } catch (err) {
      setRequestError(err.message || "Unable to add task.");
    }
  }

  // Update task completion through FastAPI
  async function toggleTask(id) {
    setRequestError("");

    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not update task.");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === id ? updatedTask : item
        )
      );
    } catch (err) {
      setRequestError(err.message || "Unable to update task.");
    }
  }

  // Delete a task through FastAPI
  async function deleteTask(id) {
    setRequestError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete task.");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setRequestError(err.message || "Unable to delete task.");
    }
  }

  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">DAY 09 · FULL-STACK TASK MANAGER</p>
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

        {loading ? (
          <p role="status">Loading tasks...</p>
        ) : error ? (
          <div role="alert">
            <p>{error}</p>
            <button onClick={loadTasks}>Try again</button>
          </div>
        ) : (
          <>
            <TaskForm onAddTask={addTask} />

            {requestError && (
              <p role="alert">{requestError}</p>
            )}

            {tasks.length === 0 ? (
              <p>No tasks yet. Add your first task!</p>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            )}
          </>
        )}

        <p className="footer-note">
          Tasks are saved in PostgreSQL through the FastAPI backend.
        </p>
      </section>
    </main>
  );
}

export default App;
