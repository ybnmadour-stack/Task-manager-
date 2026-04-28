import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, saveSession } from '../../services/api';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Fill in all fields.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const data = await api.register(form);
      saveSession(data);
      navigate('/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="TASKS-TO-DO auth-card">
        <h1>Register</h1>
        <p className="muted">Create an account to store tasks in MsSQL.</p>
        {error && <p className="error">{error}</p>}
        <form className="stacked-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />

          <button type="submit">Create Account</button>
        </form>
        <p className="small-text">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  );
}

export default Register;
