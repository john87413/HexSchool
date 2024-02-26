import axios from 'axios';

const { VITE_URL } = import.meta.env;

class AuthService {
  static async login(user) {
    const res = await axios.post(`${VITE_URL}/admin/signin`, user);
    return res;
  }

  static async checkLogin() {
    const res = await axios.post(`${VITE_URL}/api/user/check`);
    return res;
  }
}

export default AuthService;
