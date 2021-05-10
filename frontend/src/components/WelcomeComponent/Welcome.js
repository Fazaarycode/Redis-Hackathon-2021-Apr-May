import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Welcome.css';

let style = { width: '18rem', height: '20rem', backgroundColor: "#f1ca89",
border: 'none'
}
const Welcome = () => {
    return <div className="welcomePage"
    >
        <header>
            <h1> Welcome to RunTimeTerror_ presents fastest Dataset Search</h1>
            <p> If you have an account, login. Otherwise, Register, it's free.</p>
        </header>
        <div className="login-and-register-cards">
            {/* Login Card */}
            <div className="login-container">
                <Card style={style}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Card.Text>
                            Experience lighting fast search for your custom csv data. 
                            Fuzzy included.
                        </Card.Text>
                        <div className="target-link-button">
                            <Button variant="tertiary"><Link to="/user-login">Login</Link></Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* Registration Card */}
            <div className="registration-container">
                <Card style={style}>
                    <Card.Body>
                        <Card.Title>Card Registration</Card.Title>
                        <Card.Text>
                            Sign up and upload your dataset. You will see some of the fastest search of all time, no matter the dataset size.

                        </Card.Text>
                        <div className="target-link-button">
                        <Button variant="tertiary"><Link to="/user-registration">Registration</Link></Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
        {/* Container Ends here */}

    </div>;
}

export default Welcome;