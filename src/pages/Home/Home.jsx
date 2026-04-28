import { Link } from 'react-router-dom';
import { getUser } from '../../services/api';

function Home() {
  const user = getUser();

  return (
    <main className="home">
      <section className="TASKS-TO-DO home-content">
        <h1>Welcome to Task Manager</h1>
        <p>Manage your daily tasks efficiently with React, Express and MsSQL.</p>
        {user && <p className="muted">Logged in as {user.name}</p>}

        <div className="home-buttons">
          <Link to="/list"><button>View Tasks</button></Link>
          <Link to="/add"><button>Add Task</button></Link>
          {!user && <Link to="/register"><button>Create Account</button></Link>}
        </div>
      </section>
    </main>
  );
}

export default Home;
