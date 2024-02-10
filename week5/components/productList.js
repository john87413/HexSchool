// services
import ProductService from "../services/product.service.js";

// utils
import sweetAlert from "../utils/sweetAlert.js";

// Store
import loaderStore from "../store/loaderStore.js";

const { mapActions } = Pinia;

export default {
  props: ["products"],
  methods: {
    // the method control loading component
    ...mapActions(loaderStore, ["updateLoading"]),
    // get product by id and display product modal
    async getProduct(id) {
      try {
        this.updateLoading(true);
        const res = await ProductService.getProduct(id);
        this.$emit('openModal', res.data.product)
        this.updateLoading(false);
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },

  },
  template: `<table class="table align-middle">
    <thead>
        <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in products" :key="item.id">
            <td style="width: 200px;">
                <div style="height: 100px; background-size: cover; background-position: center;"
                    :style="{backgroundImage: 'url(' + item.imageUrl + ')'}"></div>
            </td>
            <td>{{item.title}}</td>
            <td>
                <div class="h5" v-if="!item.price">{{ item.origin_price }}</div>
                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
                <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger" @click="$emit('add-to-cart', item.id)">
                        加到購物車
                    </button>
                </div>
            </td>
        </tr>
    </tbody>
</table>`,
};
