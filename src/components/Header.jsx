
import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/header.css';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Header() {
  // Get user from userContext for render for account
  const {user, setUser, isLoggedIn, setIsLoggedIn} = useUserContext();
    const [flag, setFlag] = useState(true);
    
    // Function to handle login/logout
    const handleLoginLogout = () => {
      if(isLoggedIn==="Login"){
        navigate("/authentication");
      }
      else {
        navigate("/");
        handleLogout();
      }
    };
    // Use for navigate page 
    const navigate = useNavigate();
    // use Effect part
    useEffect(() => {
      if(cookies.get('user')){
        setIsLoggedIn("Logout");
        setUser(cookies.get('user'));
      }
      setFlag(false);
    }, [flag]) 

    

    // All function for handling value 
    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('user');
        setUser({});
        setIsLoggedIn("Login");
    }
  return (
    <>
       <div className='header'>
      <Navbar expand="lg" className="mb-4">
        <Container>
          {/* Logo */}
          <Navbar.Brand onClick={() => navigate("/")}>Soliel Music</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link  onClick={() => navigate("/courses")}>Courses</Nav.Link>
            {user['code']&&(
              <Nav.Link  onClick={() => navigate(`/learnings/${user['code']}`)}>Learning</Nav.Link>
            )}
            <Button variant={isLoggedIn ? 'danger' : 'primary'} onClick={handleLoginLogout}>
              {isLoggedIn}
            </Button> 
          </Nav>
          {user['email']&&(
            <Nav>
              <Nav.Link  onClick={() => navigate(`/user/profile/${user['code']}`)}>Profile</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                {user['email']}
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </div>
    </>
  );
}

export default Header;