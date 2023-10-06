import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/destination';

class DestinationService {
  GetAllDestination = () => {
    return axios.get(BASE_URL);
    // .then((res) => {
    //   console.log(res.data.data);
    //   return res.data.data;
    // })
    // .catch((err) => {
    //   console.log(err.response.data.errror);
    //   return;
    // });
  };

  GetDestination = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  };

  CreateDestination = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdateDestination = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeleteDestination = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new DestinationService();
