
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';

const Dashboard = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');
  
    setLoading(true);
    const userId = localStorage.getItem('userId');
    const reader = new FileReader();
  
    reader.onloadend = async () => {
      try {
        
        const base64String = reader.result;
        
        const res = await axios.post('http://localhost:5000/api/posts/create', {
          headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
          file: base64String,
          caption,
          userId,
        });
  
        setMessage(res.data.message);
        setCaption('');
        setFile(null);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    reader.readAsDataURL(file);
  };
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="w-full" />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Post'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
      <PostList></PostList>
    </div>
  );
};

export default Dashboard;