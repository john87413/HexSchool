export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      modal: "",
      qty: 1,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: "static",
    });
  },
  template: `<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModal"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productModal">
                    <span>
                        {{ product.title }}
                    </span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <img :src="product.imageUrl" alt="" class="img-fluid">
                    </div>
                    <div class="col-sm-6">
                        <span class="badge bg-primary rounded-pill">{{product.category}}</span>
                        <p>商品描述：{{product.description}}</p>
                        <p>商品內容：{{product.content}}</p>
                        <div class="h5" v-if="!product.price">{{product.origin_price}}</div>
                        <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
                        <div class="h5" v-if="product.price">現在只要 {{product.price}} 元</div>
                        <div>
                            <div class="input-group">
                                <input type="number" class="form-control" v-model.number="qty" min="1">
                                <button type="button" class="btn btn-primary" @click="$emit('add-to-cart', product.id, qty)">加入購物車</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
};
