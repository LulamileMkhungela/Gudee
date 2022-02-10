import axios from 'axios'

const apiUrl = 'http://localhost:5000/api/';

export const singleFileUpload = async (data) => {
    try {
        await axios.post(apiUrl, + 'singleFile', data);
    } catch (error) {
        throw error
    }
}