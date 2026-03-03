import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import axios from 'axios'

function Post({ post }) {
  const [comments, setComments] = useState([])

  const { author } = post

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await axios.get(`${API_URL}/comments?post=${post._id}`)
      setComments(res.data.data)
    } catch(error) {
      alert('Could not fetch posts')
      console.log(error)
    }
  }

  console.log(post)

  return (
    <Card className='mt-2'>
      <Card.Header as="h5">
        @{author.username} ({author.fullName})
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {post.content}
        </Card.Text>
        <Button variant="primary me-2">Like👍</Button>
        No. of likes: {post.likes.length}

        <p className='lead mt-2 mb-0'>Comments</p>
        <ListGroup variant="flush">
          {comments.map(c => (
            <ListGroup.Item key={c._id}>
              @{c.author.username}: {c.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Post;