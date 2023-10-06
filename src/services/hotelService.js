import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/hotel';

class HotelService {
  GetAllHotel = () => {
    return axios.get(BASE_URL);
  };

  GetHotel = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  };

  CreateHotel = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdateHotel = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeleteHotel = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new HotelService();
