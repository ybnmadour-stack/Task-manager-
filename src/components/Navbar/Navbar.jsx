import { Link, useNavigate } from 'react-router-dom';
import { clearSession, getUser } from '../../services/api';

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>Tasks To Do</h2>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/list">Tasks</Link>
        <Link to="/add">Add Task</Link>
        {user ? <button className="nav-button" onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
