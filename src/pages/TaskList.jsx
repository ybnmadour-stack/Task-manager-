import { useEffect, useState } from 'react';
import { api } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await api.getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTask = async (task) => {
    try {
      const updatedTask = {
        ...task,
        completed: !task.completed,
      };

      await api.updateTask(task.id, updatedTask);

      setTasks((prev) =>
        prev.map((item) =>
          item.id === task.id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="TASKS-TO-DO wide-card">
        <h1>Your Tasks</h1>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="tasks">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </h3>

                  <p>{task.description}</p>

                  <button onClick={() => toggleTask(task)}>
                    {task.completed ? 'Undo' : 'Done'}
                  </button>

                  <button onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No tasks yet. Add your first task.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default TaskList;