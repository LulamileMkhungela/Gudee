import axios from 'axios'

export const singleFileUpload = async (data) => {
    try {
        await axios.post('/api/singleFile', data);
    } catch (error) {
        throw error
    }
}

export const getSingleFiles = async () => {
    try {
        const {data} = await axios.get('/api/getSingleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}