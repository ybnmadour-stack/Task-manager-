import { Link } from 'react-router-dom';

function TaskCard({ task, onDelete, onToggle }) {
  return (
    <article className="task">
      <div>
        <Link to={`/details/${task.id}`} className="task-name" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </Link>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      <div className="actions">
        <button onClick={() => onToggle(task)}>{task.completed ? 'Undo' : 'Done'}</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}

export default TaskCard;
