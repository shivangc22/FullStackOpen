// phonebook.js
import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const phonebookRequest = async (method, url, data = null) => {
    try {
        const response = await axios.request({
            method,
            url: `${baseURL}/${url}`,
            data
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};

const getAll = async () => {
    return phonebookRequest('GET', '');
};

const create = async (newObject) => {
    return phonebookRequest('POST', '', newObject);
};

const update = async (id, newObject) => {
    return phonebookRequest('PUT', id, newObject);
};

const deleteEntry = async (id) => {
    return phonebookRequest('DELETE', id);
};

const updateEntry = async (id, newObject) => {
    return phonebookRequest('PUT', id, newObject);
};

export default { getAll, create, update, deleteEntry, updateEntry };
