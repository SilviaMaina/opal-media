
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';


const UserProfile = ({ currentUserId }) => {
  const { userId } = useParams(); // Assuming /user/:userId route

  const [user, setUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', story: '' });

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URl}/api/prof/profile/${userId}`);
      setUser(res.data.user);
      setIsOwnProfile(userId === currentUserId);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_URl}/api/users/follow`, {
        currentUserId,
        targetUserId: userId,
      });
      fetchProfile();
    } catch (error) {
      console.error('Follow/Unfollow failed:', error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setFormData({ name: user.name, story: user.story });
  };

  const handleSave = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_URl}/api/users/edit`, {
        userId: currentUserId,
        ...formData,
      });
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const isFollowing = user.followers.includes(currentUserId);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-2xl shadow-md">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
        />
        {editing ? (
          <>
            <input
              className="border px-2 py-1 rounded w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              className="border px-2 py-1 rounded w-full"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              maxLength={200}
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600 text-center">{user.story}</p>
          </>
        )}

        <div className="flex space-x-6 text-center">
          <div>
            <p className="font-semibold">{user.followers.length}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold">{user.following.length}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {isOwnProfile ? (
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            {editing ? 'Editing...' : 'Edit Profile'}
          </button>
        ) : (
          <button
            onClick={handleFollowToggle}
            className={`px-4 py-1 rounded text-white ${
              isFollowing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>
      <CreatePost/>
    </div>
  );
};

export default UserProfile;
