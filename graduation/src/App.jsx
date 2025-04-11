// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthService from './services/authService';
import Dashboard from './pages/Dashboard';
import Header from './layouts/Header';
import LoginHeader from './layouts/LoginHeader';
import RegisterHeader from './layouts/RegisterHeader';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './layouts/Footer'; // Footer'ı içe aktar

function App() {
  const user = AuthService.getCurrentUser();

  return (
    <Router>
      <>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          limit={3}
        />
        <Routes>
          <Route path="/login" element={
            <>
              <LoginHeader />
              <Login />
            </>
          } />
          <Route path="/register" element={
            <>
              <RegisterHeader />
              <Register />
            </>
          } />
          <Route path="/main" element={
            <>
              <Header />
              {user ? <Dashboard /> : <Navigate to="/login" />}
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              {user ? <About /> : <Navigate to="/login" />}
              <Footer />
            </>
          } />
        </Routes>
      </>
    </Router>
  );
}

export default App;