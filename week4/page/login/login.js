import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import AuthService from "../../services/auth.service.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const res = await AuthService.login(this.user);
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )}; path=/`;
        window.location = "../product/products.html";
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  },
}).mount("#app");
