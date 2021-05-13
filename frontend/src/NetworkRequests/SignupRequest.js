// Helper to dispatch action to backend.

const SignUpRequest = async payload =>  {
    let response = await fetch(`http://localhost:4000/user-registration/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    let json = await response.json();
    return json;
};

// ${process.env.REACT_APP_BACKEND_DEV_ENDPOINT_URL}

export default SignUpRequest;

