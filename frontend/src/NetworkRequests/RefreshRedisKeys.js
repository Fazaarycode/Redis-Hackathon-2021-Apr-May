// This file is a request to backend to refresh redis keys that arent persisted when Redis container is stopped
// Redisearch Data persistence wasn't quite clear during this implementation.
import axios from 'axios';

const RefreshRedisKeys = async () => {
    let response = await axios.get(`http://localhost:4000/refresh-redis-keys`,
    { withCredentials: true });
    return { data: response.data.message}
}

export default RefreshRedisKeys;
