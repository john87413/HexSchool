<template lang="">
  <h2>這是前台</h2>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink to="/products">產品列表</RouterLink> |
    <RouterLink to="/cart">購物車</RouterLink> |
    <RouterLink to="/login">登入</RouterLink> |
    <RouterLink to="admin/products">後台管理</RouterLink>
  </nav>
  <router-view></router-view>
</template>

<script>

export default {
  data() {
    return {};
  },
};
</script>

<style lang=""></style>
