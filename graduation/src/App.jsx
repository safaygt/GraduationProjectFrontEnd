import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import Login from './pages/Login';
import Register from './pages/Register';
import AuthService from './services/authService';
import Dashboard from './pages/Dashboard';
import Header from './layouts/Header';
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
              <Login />
            </>
          } />
          <Route path="/register" element={
            <>
         
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