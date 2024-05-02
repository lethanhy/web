<template>
    <div class="" >
      <div class="row mt-3 mb-3">
        <div class="col-lg-4 bg-light m-auto rounded bg-light">
          <h2 class="text-center pt-3">Thông tin tài khoản</h2>
          <form @submit.prevent="addUser">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control"
               v-model="docgia.ten">
            </div>
            <div class="mb-3">
              <label class="form-label">Ngày sinh</label>
              <input type="text" class="form-control"
               v-model="docgia.ngaysinh">
            </div>
            <div class="mb-3">
              <label class="form-label">Phái</label>
              <input type="text" class="form-control"
               v-model="docgia.phai">
            </div>
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control"
               v-model="docgia.dienthoai">
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
               v-model="docgia.diachi">
            </div>
            <!-- <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input type="text" class="form-control"
               v-model="docgia.password">
            </div> -->
            <div class="d-grid">
                <router-link to="/" class="btn btn-dark">Quay lại</router-link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
import DocgiaService from '@/services/docgia.service';

export default {
    data() {
        return {
            docgia: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.docgia = await DocgiaService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        // addToCart() {
        //     // Thực hiện logic thêm sản phẩm vào giỏ hàng ở đây
        //     console.log("Thêm sản phẩm vào giỏ hàng");
        //     console.log("ID sản phẩm:", this.sach.id);
        // },
    },
    // filters: {
    //     formatCurrency(value) {
    //         const formatter = new Intl.NumberFormat('vi-VN', {
    //             style: 'currency',
    //             currency: 'VND',
    //         });
    //         return formatter.format(value);
    //     },
    // },
}
</script>
