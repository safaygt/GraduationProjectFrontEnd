// src/App.jsx
import React, { useEffect } from 'react'; // useEffect'i import edin
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // ProtectedRoute'u import edin
import Login from './pages/Login';
import Register from './pages/Register';
import AuthService from './services/authService'; // AuthService'i doğru şekilde import ettiğinizden emin olun
import Dashboard from './pages/Dashboard';
import Header from './layouts/Header';
import LoginHeader from './layouts/LoginHeader';
import RegisterHeader from './layouts/RegisterHeader';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './layouts/Footer';
import MyWastes from './pages/myWastes';

function App() {

  useEffect(() => {
    AuthService.initAuth();
  }, []);

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
            <ProtectedRoute>
              <Header />
              <Dashboard />
              <Footer />
            </ProtectedRoute>
          } />

          <Route path="/atiklarim" element={
            <ProtectedRoute>
              <Header />
              <MyWastes />
              <Footer />
            </ProtectedRoute>
          } />

          <Route path="/about" element={
            <ProtectedRoute>
              <Header />
              <About />
              <Footer />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate replace to="/main" />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;