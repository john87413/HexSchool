import ProductService from "../services/product.service.js";
import sweetAlert from "../utils/sweetAlert.js";
import loaderStore from "../store/loaderStore.js";
const { mapActions } = Pinia;


export default {
  props: ["product", "isNew", "productModal", "isLoading"],
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.addEditProductModal, {
      keyboard: false,
      backdrop: "static",
    });
  },
  methods: {
    ...mapActions(loaderStore, ["updateLoading"]),
    // create or update product
    async updateProduct() {
      try {
        this.updateLoading(true);
        const res = this.isNew
          ? await ProductService.createProduct(this.product)
          : await ProductService.updateProduct(this.product);

        this.hideModal();
        await this.$emit("update");
        this.updateLoading(false);
        sweetAlert.popupAlert(res.data.message, 'success')
      } catch (error) {
        this.updateLoading(false);
        alert(error.response.data.message);
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
    <div id="addEditProductModal" ref="addEditProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header bg-primary-subtle">
            <h5 id="addEditProductModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
            <div class="row">
                <div class="col-6">
                <label class="form-label" for="imageUrl">主要圖片</label>
                <input id="imageUrl" v-model="product.imageUrl" class="form-control mb-2" type="text"
                    placeholder="請輸入圖片連結">
                <img class="img-fluid" :src="product.imageUrl" alt="">
                </div>
                <div class="col-6">
                <div class="mb-3">
                    <label for="title" class="form-label">動物名稱</label>
                    <input id="title" v-model="product.title" class="form-control" type="text" placeholder="請輸入動物名稱">
                </div>

                <div class="row mb-3">
                    <div class="col-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" v-model="product.category" class="form-control" type="text"
                        placeholder="請輸入分類">
                    </div>
                    <div class="col-6">
                    <label for="unit" class="form-label">單位</label>
                    <input id="unit" v-model="product.unit" class="form-control" type="text" placeholder="請輸入單位">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" v-model="product.origin_price" class="form-control" type="number"
                        min="0" placeholder="請輸入原價">
                    </div>
                    <div class="col-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" v-model="product.price" class="form-control" type="number" min="0"
                        placeholder="請輸入售價">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" v-model="product.description" type="text" class="form-control"
                    placeholder="請輸入產品描述"></textarea>
                </div>

                <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="content" v-model="product.content" type="text" class="form-control"
                    placeholder="請輸入說明內容"></textarea>
                </div>

                <div class="mb-3">
                    <div class="form-check">
                    <input id="is_enabled" v-model="product.is_enabled" type="checkbox" class="form-check-input"
                        :true-value="1" :false-value="0">
                    <label for="is_enabled" class="form-check-label">是否啟用</label>
                    </div>
                </div>
                </div>
            </div>

            <hr>

            <h4 class="mb-2">多圖新增</h4>
            <button class="btn btn-outline-primary mb-3"
                @click="product.imagesUrl ? product.imagesUrl.push('') : product.imagesUrl = ['']">新增圖片</button>
            <div class="row" v-if="Array.isArray(product.imagesUrl) && product.imagesUrl.length > 0">
                <div class="col-6" v-for="(image, index) in product.imagesUrl" :key="index">
                <label :for="'imageUrl-' + index" class="form-label">圖片網址</label>
                <input :id="'imageUrl-' + index" v-model="product.imagesUrl[index]" class="form-control mb-2"
                    type="text" placeholder="請輸入圖片連結">
                <img class="img-fluid" :src="image" alt="">
                <button class="btn btn-outline-danger btn-sm mt-3"
                    @click="product.imagesUrl.splice(index, 1)">刪除圖片</button>
                </div>
            </div>
            </div>

            <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
        </div>
        </div>
    </div>
    `,
};
