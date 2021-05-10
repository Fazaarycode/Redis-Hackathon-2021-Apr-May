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

import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("e2@e.com");
    const [password, setPassword] = useState("password#1F");

    return (
        <div className="loginContainer">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-info text-center">Client Login</h1>
                        <hr />
                        {/* {error && <Alert variant="danger">{error}</Alert>} */}
                        {/* onSubmit={handleOnSubmit} */}
                        <Form autoComplete="off" >
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"

                                    placeholder="Enter Email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"

                                    placeholder="password"
                                    required
                                />
                            </Form.Group>

                            <div className="submit-button">
                                <Button type="submit">Login</Button>
                            </div>
                            {/* {isLoading && <Spinner variant="primary" animation="border" />} */}
                        </Form>
                        <hr />
                    </Col>
                </Row>


                <Row className="py-4">
                    <Col>
                        Are you new here? <Link to="/user-registration">Register Now</Link>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default Login;