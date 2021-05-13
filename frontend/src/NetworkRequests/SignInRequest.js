// Helper to dispatch action to backend.
import axios from 'axios';

const SignInRequest = async payload =>  {
    let response = await axios.post(`http://localhost:4000/user-login`, { payload }, { withCredentials: true });
    console.log(response)
    return { userData: response, status: response.status}
};
export default SignInRequest;
