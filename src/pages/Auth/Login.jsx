import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, saveSession } from '../../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }

    try {
      const data = await api.login(form);
      saveSession(data);
      navigate('/list');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="page">
      <section className="TASKS-TO-DO auth-card">
        <h1>Login</h1>
        <p className="muted">Access your saved MsSQL tasks.</p>
        {error && <p className="error">{error}</p>}
        <form className="stacked-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />

          <button type="submit">Login</button>
        </form>
        <p className="small-text">No account yet? <Link to="/register">Register</Link></p>
      </section>
    </main>
  );
}

export default Login;
