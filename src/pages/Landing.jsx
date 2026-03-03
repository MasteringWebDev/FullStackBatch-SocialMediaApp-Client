import { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios'

function Landing() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await axios.get(`${API_URL}/posts`)
      setPosts(res.data.data)
    } catch(error) {
      alert('Could not fetch posts')
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="display-4">Posts</h1>
      {posts.map(p => (
        <Post
          key={p._id}
          post={p}
        />
      ))}
    </div>
  );
}

export default Landing;