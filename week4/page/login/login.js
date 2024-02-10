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
        window.location = `${window.location.origin}/WeekHomework/week4/index.html`;
      } catch (error) {
        sweetAlert.popupAlert(error.response.data.message, 'error')
      }
    },
  },
}).mount("#app");
