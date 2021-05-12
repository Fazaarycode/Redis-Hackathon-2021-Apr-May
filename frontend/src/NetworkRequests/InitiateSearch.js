// This is a helper to make a request for every keyString supplied.
import axios from 'axios';

const InitiateSearch = async keyString => {
    // let response = await fetch(`http://localhost:4000/auto-complete-results?keyString=${keyString}`);
    // let data = await response.json();
    // return data;
    let response = await axios.get(`http://localhost:4000/auto-complete-results?keyString=${keyString}`,
    { withCredentials: true });
    return { data: response['data']['data'], status: 200}
}

export default InitiateSearch;
