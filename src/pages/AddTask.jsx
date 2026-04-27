import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function AddTask() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; // ✅ FIX: closing bracket added

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    try {
      await api.createTask(form);
      navigate('/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="TASKS-TO-DO">
        <h1>Add Task</h1>
        {error && <p className="error">{error}</p>}
        <form className="stacked-form" onSubmit={handleSubmit}>
          <label>Task title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Optional task notes"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">Add Task</button>
        </form>
      </section>
    </main>
  );
}

export default AddTask;