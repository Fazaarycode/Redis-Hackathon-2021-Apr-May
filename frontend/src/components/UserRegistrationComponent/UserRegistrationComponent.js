import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import './UserRegistrationComponent.css';
import SignUpRequest from '../../NetworkRequests/SignupRequest';
const UserRegistrationComponent = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [allowAccess, setAllowAccess] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      userName: fullName,
      email,
      companyName,
      password,
      confirmPassword,
    }
    let processUser = await SignUpRequest(payload);
    if(processUser.user) setAllowAccess(true);
  }
return <div className="UserRegistrationContainer">
  {
    allowAccess ? 
    <Redirect to={{pathname:'/search-arena', state: { email }}}></Redirect>
    :
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">User Registration</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                required
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name"
                required
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <div className="submit-button">
              <Button
                variant="primary"
                type="submit"
                disabled={password !== confirmPassword || !email || !password || !confirmPassword || !fullName}
              >
                Submit
            </Button>
            </div>
            {/* {isLoading && <Spinner variant="info" animation="border" />} */}
          </Form>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          Already have an account <Link to="/user-login">Login Now</Link>
        </Col>
      </Row>
    </Container>
  }
  </div>;
}

export default UserRegistrationComponent;