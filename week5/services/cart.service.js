const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "jason-hexschool";

class CartService {
  async getCart() {
    return axios.get(`${apiUrl}/api/${apiPath}/cart`);
  }

  async addToCart(productId, qty) {
    const cart = {
      product_id: productId,
      qty,
    };

    return axios.post(`${apiUrl}/api/${apiPath}/cart`, { data: cart });
  }

  async updateCart(data) {
    const cart = {
      product_id: data.product_id,
      qty: data.qty,
    };
    
    return axios.put(`${apiUrl}/api/${apiPath}/cart/${data.id}`, {
      data: cart,
    });
  }

  async removeCartItem(id) {
    return axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`);
  }

  async removeAllCartItems() {
    return axios.delete(`${apiUrl}/api/${apiPath}/carts`);
  }
}

export default new CartService();
