const { defineStore } = Pinia;

const loaderStore = defineStore("loader", {
  state: () => ({ isLoading: true }),
  getters: {},
  actions: {
    updateLoading(status) {
      this.isLoading = status;
    },
  },
});

export default loaderStore;
