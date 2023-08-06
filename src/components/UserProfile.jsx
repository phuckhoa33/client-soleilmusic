import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Image, Button, InputGroup } from 'react-bootstrap';
import '../scss/UserProfile.css';
import { useUserContext } from '../context/UserContext';
import { update_profile } from '../api/store';
import Cookies from 'universal-cookie';
import { parseTypeArray } from '../extra/parse_type';
const cookies = new Cookies();

const UserProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {user, setUser} = useUserContext();
  const [hover, setHover] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    image: ""
  })

  useEffect(() => {
    setProfile(
      {...profile, 
        image: user['image']?user['image']:"https://via.placeholder.com/150",
      }
    )
    return () => {}
  },[])

  const {first_name, last_name, password, email, image} = profile;

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: [e.target.value]});
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    profile.code = user['code'];
    let form = parseTypeArray(profile);
    const {data} = await update_profile(form);
    alert(data.message);
    setProfile(data.user);
    setUser(data.user);
    cookies.set('user', data.user);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setProfile({...profile, iamge: reader.result})
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user-profile">
      <Container>
        <Row>
          <Col
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)} 
            md={4}
          >
            {!hover ? (
              <Image src={image} roundedCircle />
            ): (
              <Form.Group>
              <label htmlFor="file-input">
                <div className="circular-image">
                  <span>Choose Image</span>
                </div>
              </label>
              <Form.Control
                id="file-input"
                type="file"
                // accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Form.Group>
            )}
          </Col>
          <Col md={8}>
            <h2>User Profile</h2>
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='first_name' value={first_name} onChange={handleChange} placeholder={user['first_name']} />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='last_name' value={last_name} onChange={handleChange} placeholder={user['last_name']} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder={user['email']} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? 'text' : 'password'} value={password} name='password' onChange={handleChange} placeholder="Enter your password" />
                  <InputGroup.Text onClick={handleShowPassword}>
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button onClick={handleSubmit} variant="primary" type="submit">
                Luu
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
