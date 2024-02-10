// services
import CartService from "../services/cart.service.js";

// utils
import sweetAlert from "../utils/sweetAlert.js";

// Store
import loaderStore from "../store/loaderStore.js";

const { mapActions } = Pinia;

export default {
  props: ["cart"],
  emits: ["get-cart"],
  data() {
    return {
      copyCart: {},
    };
  },
  watch: {
    // watch parent props to change child data
    cart() {
      this.copyCart = JSON.parse(JSON.stringify(this.cart));
    },
  },
  mounted() {
    this.copyCart = JSON.parse(JSON.stringify(this.cart));
  },
  methods: {
    // the method control loading component
    ...mapActions(loaderStore, ["updateLoading"]),
    // remove customer cart single item
    // send callback function after $emit to handle process order
    async removeCartItem(id) {
      try {
        this.updateLoading(true);
        await CartService.removeCartItem(id);
        this.$emit("get-cart", () => {
          this.updateLoading(false);
          sweetAlert.popupAlert("刪除成功", "success");
        });
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
    // remove all cart items
    // send callback function after $emit to handle process order
    async removeAllCartItems() {
      try {
        this.updateLoading(true);
        await CartService.removeAllCartItems();
        this.$emit("get-cart", () => {
          this.updateLoading(false);
          sweetAlert.popupAlert("刪除成功", "success");
        });
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
    // update customer cart item
    // if qty haven't been change, don't update
    async updateCart(data) {
      const item = this.cart.carts.find(
        (item) => item.product_id === data.product_id
      );
      if (item.qty !== data.qty) {
        try {
          this.updateLoading(true);
          await CartService.updateCart(data);
          this.$emit("get-cart", () => {
            this.updateLoading(false);
            sweetAlert.popupAlert("更新成功", "success");
          });
        } catch (error) {
          this.updateLoading(false);
          sweetAlert.popupAlert(error.response.data.message, "error");
        }
      }
    },
  },
  template: `<div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="removeAllCartItems">清空購物車</button>
</div>
<table class="table align-middle">
    <thead>
        <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px;">數量/單位</th>
            <th>單價</th>
        </tr>
    </thead>
    <tbody>
        <template v-if="copyCart.carts">
            <tr v-for="item in copyCart.carts" :key="item.id">
                <td>
                    <button class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">x</button>
                </td>
                <td>
                    {{item.product.title}}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td>
                    <div class="input-group">
                        <input v-model.number="item.qty" type="number" min="1" @blur="updateCart(item)" class="form-control">
                        <span class="input-group-text">{{item.product.unit}}</span>
                    </div>
                </td>
                <td class="text-end">
                    <small v-if="cart.final_total !== cart.total" class="text-success">折扣價： {{}}</small>
                    {{item.final_total}}
                </td>
            </tr>
        </template>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{cart.final_total}}</td>
        </tr>
    </tfoot>
</table>`,
};
