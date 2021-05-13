// Helper to dispatch action to backend.
import axios from 'axios';

const TotalDatasetsCount = async () => {
    let response = await axios.get(`http://localhost:4000/total-datasets`,
        { withCredentials: true });
    return { count: response.data.count, dataSetNames: response.data.files }
};
export default TotalDatasetsCount;

