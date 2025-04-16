
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/user/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setMessage('✅ Signup successful! You can now log in.');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <p className="text-center text-sm mb-4">
          Already have an account? <Link to="/login" className="text-cyan-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
