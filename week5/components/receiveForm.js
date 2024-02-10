// services
import OrderService from "../services/order.service.js";

// Store
import loaderStore from "../store/loaderStore.js";

// utils
import sweetAlert from "../utils/sweetAlert.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  generateMessage: localize("zh_TW"),
});

const { mapActions } = Pinia;

export default {
  emits: ["get-cart"],
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    // the method control loading component
    ...mapActions(loaderStore, ["updateLoading"]),
    // create customer order
    async createOrder() {
      try {
        this.updateLoading(true);
        const order = this.form;
        const res = await OrderService.createOrder(order);
        this.$refs.form.resetForm();
        this.$emit("get-cart", () => {
          this.updateLoading(false);
          sweetAlert.popupAlert(res.data.message, "success");
        });
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, "error");
      }
    },
  },
  template: `<div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
            <label for="email" class="form-lable">Email</label>
            <v-field id="email" name="email" type="email" class="form-control" placeholder="請輸入 Email"
                rules="email|required" v-model="form.user.email" :class="{'is-invalid': errors['email']}">
            </v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="name" class="form-lable">收件人姓名</label>
            <v-field id="name" name="姓名" type="text" class="form-control" placeholder="請輸入姓名"
                rules="required" v-model="form.user.name" :class="{'is-invalid': errors['姓名']}">
            </v-field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="tel" class="form-lable">收件人電話</label>
            <v-field id="tel" name="電話" type="text" class="form-control" placeholder="請輸入電話"
                rules="required|min:8|max:10" v-model="form.user.tel" :class="{'is-invalid': errors['電話']}">
            </v-field>
            <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="address" class="form-lable">收件人地址</label>
            <v-field id="address" name="地址" type="text" class="form-control" placeholder="請輸入地址"
                rules="required" v-model="form.user.address" :class="{'is-invalid': errors['地址']}">
            </v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea class="form-control" name="" id="message" cols="30" rows="10"
                v-model="form.message"></textarea>
        </div>
        <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
    </v-form>
</div>`,
};
