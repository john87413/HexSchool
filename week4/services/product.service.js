const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "jason-hexschool";

class ProductService {
  async getProductsByPage(page) {
    return axios.get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`);
  }

  async createProduct(item){
    return axios.post(`${apiUrl}/api/${apiPath}/admin/product`, {data: item})
  }

  async updateProduct(item){
    return axios.put(`${apiUrl}/api/${apiPath}/admin/product/${item.id}`, {data: item})
  }

  async deleteProduct(item){
    return axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${item.id}`)
  }
}

export default new ProductService();
