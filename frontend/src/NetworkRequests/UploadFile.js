// Helper to upload file to backend

const fileUpload = async (payload) => {
    let response = await fetch(`http://localhost:4000/upload-csv`, {
        method: 'post',
        // headers: {'Content-Type': 'multipart/form-data'},
        body: payload
    });
    return response.status;
}
export default fileUpload;
