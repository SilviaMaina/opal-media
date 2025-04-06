import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
    bio: '',
    followers: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setProfile(parsed);
          setNameInput(parsed.name || '');
          setBioInput(parsed.bio || '');
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  // Persist profile to localStorage on change
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  // Save all profile changes
  const handleSave = () => {
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          name: nameInput.trim(),
          bio: bioInput.trim(),
          avatar: reader.result,
        }));
        setIsEditing(false);
      };
      reader.readAsDataURL(avatarFile);
    } else {
      setProfile((prev) => ({
        ...prev,
        name: nameInput.trim(),
        bio: bioInput.trim(),
      }));
      setIsEditing(false);
    }
  };

  const handleAddFollower = () => {
    const newFollower = `Follower ${profile.followers.length + 1}`;
    setProfile((prev) => ({
      ...prev,
      followers: [...prev.followers, newFollower],
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow text-center bg-white">
      {profile.avatar && (
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
      )}

      {isEditing ? (
        <>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name"
            className="border p-2 rounded w-full mb-3"
          />
          <textarea
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            placeholder="Your bio"
            rows={3}
            className="border p-2 rounded w-full mb-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0])}
            className="mb-3"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            disabled={!nameInput.trim()}
          >
            Save Profile
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">{profile.name || 'No name'}</h2>
          <p className="italic text-gray-600">{profile.bio || 'No bio yet'}</p>
          <p className="mt-2">👥 {profile.followers.length} followers</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 text-green-500 hover:underline flex items-center justify-center"
          >
            <FaEdit className="mr-1" /> Edit Profile
          </button>
        </>
      )}

      {!isEditing && (
        <button
          onClick={handleAddFollower}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserProfile;
