// Helper to upload file to backend
import axios from 'axios';
const fileUpload = async (formData) => {
    try {
        let response = await axios.post(`http://localhost:4000/upload-csv`,
            formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                withCredentials: true,
            }
        );
        return response.status;
    } catch (error) {
        console.log(`Error during file upload ${error}`)
    }
}
export default fileUpload;
