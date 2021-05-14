import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from "react-bootstrap";

import { Link, Redirect } from 'react-router-dom';
import SignInRequest from "../../NetworkRequests/SignInRequest";
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("user@runtimeterror.com");
    const [password, setPassword] = useState("123");
    const [allowAccess, setAllowAccess] = useState(false); 

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let payload = { email, password };
        let {status}  = await SignInRequest(payload);
        if(status === 304) alert('Could not find suitable user');
        else {
            setAllowAccess(true);
        }
    }
    return (
        <div className="loginContainer">
            {
                allowAccess ?
                <Redirect to={{pathname:'/search-arena', state: { email }}}></Redirect>
                :
                <Container>
                <Row>
                    <Col>
                        <h1 className="text-info text-center">Client Login</h1>
                        <hr />
                        <Form autoComplete="off" onSubmit={handleOnSubmit}>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email"
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
            }
        </div >
    );
};

export default Login;