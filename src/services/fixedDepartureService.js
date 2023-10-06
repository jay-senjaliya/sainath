import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/fixed-departure';

class FixedDepartureService {
  GetAllFixedDeparture = () => {
    return axios.get(BASE_URL);
  };

  GetFixedDeparture = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  };

  CreateFixedDeparture = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdateFixedDeparture = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeleteFixedDeparture = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new FixedDepartureService();
