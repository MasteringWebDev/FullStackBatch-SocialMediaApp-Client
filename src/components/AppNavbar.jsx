import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.png'
import axios from 'axios'

import { NavLink, useNavigate } from 'react-router';

function AppNavbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate()

  async function logoutUser() {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      await axios.post(`${API_URL}/users/signout`)
      setCurrentUser(null)
      navigate('/login')
    } catch (error) {
      alert('Something went wrong')
      console.log('Something went wrong', error)
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          SocialConnect
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <>
                <Nav.Link href="#features">Followers</Nav.Link>
                <Nav.Link href="#pricing">Following</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!currentUser ? (
              <>
                <Nav.Link as={NavLink} to='/register'>
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to='/login'>
                  Login
                </Nav.Link>
              </>
            ) : (
             <>
              <Nav.Link as={NavLink} to='/profile'>
                <img
                  alt=""
                  src={currentUser.profilePic}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  style={{ borderRadius: '50%' }}
                />{' '}
                @{currentUser.username}
              </Nav.Link>
              <Button variant='light' size='sm' 
                style={{ height: '2.5em' }}
                className='mt-1'
                onClick={logoutUser}
              >
                Logout
              </Button>
             </> 
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;