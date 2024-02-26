<template lang="">
    <h2>這是後台</h2>
    <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/cart">訂單列表</RouterLink> |
    <RouterLink to="/">回到前台</RouterLink>
  </nav>
    <router-view></router-view>
</template>
<script>
import axios from 'axios';
import AuthService from '../../services/auth.service';

export default {
  data() {
    return {

    };
  },
  methods: {
    async checkAdmin() {
      try {
        await AuthService.checkLogin();
      } catch (error) {
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    // get token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;

    // check login
    this.checkAdmin();
  },
};
</script>
<style lang="">

</style>
