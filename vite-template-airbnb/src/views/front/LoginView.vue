<template lang="">
  <div class="vh-100 bg-light">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div
        class="login-form row col-10 col-lg-9 col-xl-8 shadow-lg
        col-xxl-7 p-0 rounded-3 overflow-hidden bg-white"
      >
        <!-- login left image -->
        <div class="login-form-left col-6"></div>
        <!-- login right form -->
        <div class="login-form-right col-6">
          <div class="h-100 row align-items-center justify-content-center">
            <form class="col-10" @submit.prevent="login">
              <h1 class="h3 mb-4 text-center font-weight-normal">請先登入</h1>
              <div class="form-floating mb-3">
                <input
                  v-model="user.username"
                  type="email"
                  id="username"
                  class="form-control"
                  placeholder="name@example.com"
                  required
                  autofocus
                />
                <label for="username">Email Address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="user.password"
                  type="password"
                  id="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <button type="submit" class="btn btn-lg btn-primary w-100 mb-2">
                登入
              </button>
              <p class="text-center text-muted">&copy; 2023~∞ - Jason</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/auth.service';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      try {
        const res = await AuthService.login(this.user);
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        this.$router.push('/admin/products');
      } catch (error) {
        alert('登入失敗');
      }
    },
  },
};
</script>

<style lang="scss">
.login-form {
  height: 70vh;
}

.login-form-left {
  background-image: url("../LoginBear.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  pointer-events: none;
}
</style>
