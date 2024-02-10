const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "jason-hexschool";

class ProductService {
  async getProductsByPage(page) {
    return axios.get(`${apiUrl}/api/${apiPath}/products?page=${page}`);
  }

  async getProduct(id){
    return axios.get(`${apiUrl}/api/${apiPath}/product/${id}`)
  }

}

export default new ProductService();