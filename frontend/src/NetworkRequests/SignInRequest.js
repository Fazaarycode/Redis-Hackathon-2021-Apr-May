// Helper to dispatch action to backend.
import axios from 'axios';

const SignInRequest = async payload =>  {
    let response = await axios.post(`http://localhost:4000/user-login`, { payload }, { withCredentials: true });
    return { userData: response, status: 200}
};

export default SignInRequest;


// ${process.env.REACT_APP_BACKEND_DEV_ENDPOINT_URL}