import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import AuthService from "../../services/auth.service.js";
import ProductService from "../../services/product.service.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
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
  methods: {
    // check account information & get products
    async checkAdmin() {
      try {
        await AuthService.checkLogin();
        await this.getData();
      } catch (error) {
        alert(error.response.data.message);
        window.location = "../login/login.html";
      }
    },
    // get products by page
    async getData(page = 1) {
      try {
        const res = await ProductService.getProductsByPage(page);
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination;
      } catch (error) {
        alert(error.response.data.message);
        window.location = "../login/login.html";
      }
    },
    // open specific modal (create/update/delete modal)
    openModal(type, item) {
      if (type === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (type === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (type === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
  },
  mounted() {
    // get token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    // check login
    this.checkAdmin();
  },
});

app.component("createUpdateProductModal", {
  template: "#createUpdateProductModal",
  props: ["product", "isNew"],
  data() {
    return {};
  },
  mounted() {
    productModal = new bootstrap.Modal(
      document.getElementById("createUpdateProductModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  },
  methods: {
    // create or update product
    async updateProduct() {
      try {
        const res = this.isNew
          ? await ProductService.createProduct(this.product)
          : await ProductService.updateProduct(this.product);

        alert(res.data.message);
        this.hideModal();
        this.$emit("update");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    openModal() {
      productModal.show();
    },
    hideModal() {
      productModal.hide();
    },
  },
});

app.component("delProductModal", {
  template: "#delProductModal",
  props: ["product"],
  data() {
    return {};
  },
  mounted() {
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  },
  methods: {
    // delete product
    async delProduct() {
      try {
        await ProductService.deleteProduct(this.product);
        this.hideModal();
        this.$emit("update");
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    openModal() {
      delProductModal.show();
    },
    hideModal() {
      delProductModal.hide();
    },
  },
});

app.component("pagination", {
  template: "#pagination",
  props: ["pages"],
  methods: {
    emitPages(page) {
      this.$emit("emit-pages", page);
    },
  },
});

app.mount("#app");
