import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await api.getTask(id);
        setTask(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTask();
  }, [id]);

  return (
    <main className="page">
      <section className="TASKS-TO-DO">
        <h1>Task Details</h1>
        {error && <p className="error">{error}</p>}
        {task ? (
          <div className="details-box">
            <h2>{task.title}</h2>
            <p>{task.description || 'No description added.'}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            <p>Created: {new Date(task.created_at).toLocaleString()}</p>
            <Link to="/list"><button>Back to Tasks</button></Link>
          </div>
        ) : !error && <p>Loading task...</p>}
      </section>
    </main>
  );
}

export default TaskDetails;
