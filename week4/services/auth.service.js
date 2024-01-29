const apiUrl = "https://vue3-course-api.hexschool.io/v2";

class AuthService {
  async login(user) {
    return await axios.post(`${apiUrl}/admin/signin`, user);
  }

  async checkLogin() {
    return await axios.post(`${apiUrl}/api/user/check`);
  }
}

export default new AuthService();
