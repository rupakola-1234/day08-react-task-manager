
function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        <span
          className={
            task.completed ? "task-title completed" : "task-title"
          }
        >
          {task.title}
        </span>
      </label>

      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
