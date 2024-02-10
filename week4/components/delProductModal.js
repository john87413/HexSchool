import ProductService from "../services/product.service.js";
import sweetAlert from "../utils/sweetAlert.js";
import loaderStore from "../store/loaderStore.js";
const { mapActions } = Pinia;

export default {
  props: ["product"],
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false,
      backdrop: "static",
    });
  },
  methods: {
    ...mapActions(loaderStore, ["updateLoading"]),
    // delete product
    async delProduct() {
      try {
        this.updateLoading(true);
        await ProductService.deleteProduct(this.product);
        this.hideModal();
        this.$emit("update");
        this.updateLoading(false);
        sweetAlert.popupAlert('刪除成功', 'success')
      } catch (error) {
        this.updateLoading(false);
        sweetAlert.popupAlert(error.response.data.message, 'error')
      }
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  template: `
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">刪除產品</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ product.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button @click="delProduct" type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    `,
};
