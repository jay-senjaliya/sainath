import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/contact';

class ContactService {
  GetAllContact = () => {
    return axios.get(BASE_URL);
  };

  GetContact = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  };

  CreateContact = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdateContact = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeleteContact = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new ContactService();
