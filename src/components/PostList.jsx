import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedCaption, setEditedCaption] = useState('');
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URl}/api/posts/all/`);
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const userId = localStorage.getItem('userId'); 

  const handleEdit = (postId, currentCaption) => {
    setEditingPostId(postId);
    setEditedCaption(currentCaption);
  };

  const handleUpdate = async (postId) => {
    try {
        await axios.put(`${import.meta.env.VITE_URl}/api/posts/edit`, {
            postId,
            caption: editedCaption,
          });
      setEditingPostId(null);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (postId) => {
    try {
        await axios.delete(`${import.meta.env.VITE_URl}/api/posts/delete/${postId}`, {
            data: { userId },
          
      });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };


  const handleLikeDislike = async (postId, action) => {
    try {
      await axios.post(`${import.meta.env.VITE_URl}/api/posts/like-dislike`, {
        postId,
        userId,
        action,
      });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentTexts[postId];
    if (!text?.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_URl}/api/posts/comment`, {
        postId,
        userId,
        text,
      });
      setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {posts.map((post) => (
        <div key={post._id} className="border rounded p-4 shadow bg-white">
          {post.type === 'image' ? (
            <img src={post.fileUrl} alt="Post" className="w-full h-48 object-cover mb-2" />
          ) : (
            <video controls className="w-full h-48 object-cover mb-2">
              <source src={post.fileUrl} />
              Your browser does not support the video tag.
            </video>
          )}

          {editingPostId === post._id ? (
            <div className="mb-2">
              <input
                type="text"
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="border p-1 w-full"
              />
              <button
                onClick={() => handleUpdate(post._id)}
                className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="mb-2">{post.caption}</p>
          )}

          {post.userId === userId && (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post._id, post.caption)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
