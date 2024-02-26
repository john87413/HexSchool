// components
import AddEditProductModal from "./components/addEditProductModal.js";
import DelProductModal from "./components/delProductModal.js";
import Pagination from "./components/pagination.js";
import Loader from "./components/loader.js";

// Services
import AuthService from "./services/auth.service.js";
import ProductService from "./services/product.service.js";

// Store
import loaderStore from "./store/loaderStore.js";

// utils
import sweetAlert from "./utils/sweetAlert.js";

const { createPinia, mapState, mapActions } = Pinia;
const { createApp } = Vue;
const app = createApp({
  components: { AddEditProductModal, DelProductModal, Pagination, Loader },
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
      isNew: true,
    };
  },
  computed: {
    ...mapState(loaderStore, ["isLoading"]),
  },
  methods: {
    ...mapActions(loaderStore, ["updateLoading"]),
    // check account information & get products
    async checkAdmin() {
      try {
        this.updateLoading(true);
        await AuthService.checkLogin();
        await this.getData();
        this.updateLoading(false);
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
        window.location = "./page/login/login.html";
      }
    },
    // get products by page
    async getData(page = 1) {
      try {
        this.updateLoading(true);
        const res = await ProductService.getProductsByPage(page);
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination;
        this.updateLoading(false);
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
        window.location = "./page/login/login.html";
      }
    },
    // open specific modal (create/update/delete modal)
    openModal(type, item) {
      if (type === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.addEditProductModal.openModal();
      } else if (type === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.addEditProductModal.openModal();
      } else if (type === "delete") {
        this.tempProduct = { ...item };
        this.$refs.delProductModal.openModal();
      }
    },
  },
  mounted() {
    // get token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(token);
    axios.defaults.headers.common.Authorization = token;

    // check login
    this.checkAdmin();
  },
});

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
