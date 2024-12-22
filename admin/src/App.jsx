import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListUsers from './pages/ListUsers/ListUsers';
import TransHis from './pages/TransHis/TransHis';
import Login from './pages/Login/Login';

const App = () => {
  const navigate = useNavigate();
  const url = `http://localhost:4000`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/add' element={<PrivateRoute><Add url={url} /></PrivateRoute>} />
          <Route path='/list' element={<PrivateRoute><List url={url} /></PrivateRoute>} />
          <Route path='/orders' element={<PrivateRoute><Orders url={url} /></PrivateRoute>} />
          <Route path='/listUsers' element={<PrivateRoute><ListUsers url={url} /></PrivateRoute>} />
          <Route path='/TransHis' element={<PrivateRoute><TransHis url={url} /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
