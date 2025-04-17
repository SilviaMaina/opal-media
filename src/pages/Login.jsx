import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/user/login', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const data = res.data;
      const user = data.user;

      document.cookie = `token=${data.token}; path=/;`;
      setIsAuthenticated(true);
      setMessage('✅ Login successful!');
      console.log("Logged in user:", user);
      localStorage.setItem('userId',(user._id) );// setting the user id after login


      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <p className="text-center text-sm mb-4">
          Don't have an account? <Link to="/signup" className="text-cyan-500">Sign Up</Link>
        </p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />
        {message && <p className="text-center text-sm mb-3 text-red-600">{message}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-cyan-500 text-white rounded hover:bg-cyan-400"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

