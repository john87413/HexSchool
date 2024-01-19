import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const api = `${this.apiUrl}/admin/signin`;
        const res = await axios.post(api, this.user);
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )}; path=/`;

        window.location = "../product/products.html";
      } catch (error) {
        alert(err.response.data.message);
      }
    },
  },
}).mount("#app");
