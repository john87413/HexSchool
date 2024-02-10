const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "jason-hexschool";

class OrderService {
  async createOrder(order) {
    return await axios.post(`${apiUrl}/api/${apiPath}/order`, { data: order });
  }
}

export default new OrderService();