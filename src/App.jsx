import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import AddTask from './pages/AddTask';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path="/details/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
