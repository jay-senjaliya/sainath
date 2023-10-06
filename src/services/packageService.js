import axios from 'axios';

const BASE_URL = 'https://sainath-api.onrender.com/api/v1/package';

class PackageService {
  GetAllPackage = async () => {
    return axios.get(BASE_URL);
  };

  GetPackage = async (id) => {
    return axios.get(`${BASE_URL}/${id}`);
  };

  CreatePackage = async (payload) => {
    return axios.post(BASE_URL, payload);
  };

  UpdatePackage = async (payload, id) => {
    return axios.patch(`${BASE_URL}/${id}`, payload);
  };

  DeletePackage = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
  };
}

// eslint-disable-next-line
export default new PackageService();
