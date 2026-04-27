import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { api } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
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
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTask = async (task) => {
    try {
      const updated = await api.updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map((item) => (item.id === task.id ? updated : item)));
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
            {tasks.length > 0 ? tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={deleteTask} onToggle={toggleTask} />
            )) : <p>No tasks yet. Add your first task.</p>}
          </div>
        )}
      </section>
    </main>
  );
}

export default TaskList;
