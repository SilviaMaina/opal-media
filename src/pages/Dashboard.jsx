
import React from 'react'
import { Link } from 'react-router-dom'
import RecommendedPosts from '../components/RecommendedPosts'
import FriendsList from '../components/FriendsList'

function Dashboard() {
  return (
    <div className='flex flex-row  gap-25'>
      <FriendsList></FriendsList>
      <RecommendedPosts></RecommendedPosts>
      

    </div>
  )
}

export default Dashboard








