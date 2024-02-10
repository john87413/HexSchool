// components
import Loader from "./components/loader.js";
import ProductList from "./components/productList.js";
import ProductModal from "./components/productModal.js";
import Cart from "./components/cart.js";
import ReceiveForm from "./components/receiveForm.js";

// services
import ProductService from "./services/product.service.js";
import CartService from "./services/cart.service.js";

// Store
import loaderStore from "./store/loaderStore.js";

// utils
import sweetAlert from "./utils/sweetAlert.js";

const { createPinia, mapState, mapActions } = Pinia;
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      products: [],
      product: {},
      cart: {},
    };
  },
  components: {
    Loader,
    ProductList,
    ProductModal,
    Cart,
    ReceiveForm,
  },
  computed: {
    // the state control loading component
    ...mapState(loaderStore, ["isLoading"]),
  },
  methods: {
    // the method control loading component
    ...mapActions(loaderStore, ["updateLoading"]),
    // get product by page
    async getProducts(page = 1) {
      try {
        this.updateLoading(true);
        const res = await ProductService.getProductsByPage(page);
        const { products } = res.data;
        this.products = products;
        this.updateLoading(false);
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
    // set display product and open product modal
    openModal(product) {
      this.product = product;
      this.$refs.productModal.openModal();
    },
    // get customer cart information
    // callback function handle $emit async/await
    async getCart(callback = () => {}) {
      try {
        this.updateLoading(true);
        const res = await CartService.getCart();
        this.cart = res.data.data;
        this.updateLoading(false);
        callback();
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
    // add product into customer cart
    async addToCart(id, qty = 1) {
      try {
        this.updateLoading(true);
        await CartService.addToCart(id, qty);
        await this.getCart();
        this.$refs.productModal.hideModal();
        this.updateLoading(false);
        sweetAlert.popupAlert("新增成功", "success");
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
  },
  // get product & cart information
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
