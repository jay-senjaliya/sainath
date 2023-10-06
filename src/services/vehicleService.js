import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/vehicle';

class VehicleService {
  GetAllVehicle = () => {
    return axios.get(BASE_URL);
  };

  GetVehicle = async (id) => {
    return await axios.get(`${BASE_URL}/${id}`);
  };

  CreateVehicle = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdateVehicle = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeleteVehicle = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new VehicleService();
