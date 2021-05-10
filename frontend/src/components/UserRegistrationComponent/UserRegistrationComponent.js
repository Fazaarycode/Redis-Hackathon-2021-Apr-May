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
  import {Link} from 'react-router-dom';
  import './UserRegistrationComponent.css';
const UserRegistrationComponent = () => {
    return <div className ="UserRegistrationContainer">
        <Container>
            <Row>
                <Col>
                <h1 className="text-info">User Registration</h1>
                </Col>
            </Row>
            <Row>
        <Col>
          <Form onSubmit={''}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                // value={}
                // onChange={}
                placeholder="Your name"
                required
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                // value={}
                // onChange={}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                // value={}
                // onChange={}
                placeholder="Company name"
                required
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                // value={}
                // onChange={}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                // value={}
                // onChange={}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <div className="submit-button">
            <Button
              variant="primary"
              type="submit"
            //   disabled={}
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
    </div>;
}
 
export default UserRegistrationComponent;