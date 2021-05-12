// This is a helper to quit the session.
// Helper to dispatch action to backend.

import axios from 'axios';

const Logout = async payload =>  {
    let response = await axios.post(`http://localhost:4000/user-logout`, { payload }, { withCredentials: true });
    console.log('RES ' , response.data)
    return response;
};

export default Logout;


// ${process.env.REACT_APP_BACKEND_DEV_ENDPOINT_URL}