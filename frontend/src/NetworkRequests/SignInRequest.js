// Helper to dispatch action to backend.

const SignInRequest = async payload =>  {
    console.log(' ..payload' , JSON.stringify(payload), process.env)
    let response = await fetch(`http://localhost:4000/user-login`, {
        method: 'post',
        withCredentials: true, // Don't forget to specify this if you need cookies
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    let userData =  await response.json();
    return userData;
};

export default SignInRequest;


// ${process.env.REACT_APP_BACKEND_DEV_ENDPOINT_URL}