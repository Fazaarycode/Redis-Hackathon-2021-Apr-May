// Helper to dispatch action to backend.
import axios from 'axios';

const SignInRequest = async payload =>  {
    console.log(' ..23payload' , JSON.stringify(payload), process.env)
    let response = await axios.post(`http://localhost:4000/user-login`, { payload }, { withCredentials: true });
    console.log('RES ' , response.data)
    let userData = {};
    return { userData, status: 200}
};

export default SignInRequest;


// ${process.env.REACT_APP_BACKEND_DEV_ENDPOINT_URL}