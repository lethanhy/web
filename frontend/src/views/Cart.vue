<template>
  <section class="h-100 h-custom shadow rounded-3">
    <div class="container mt-5 d-flex">
      <div class="row">
        <div class="col-lg-10">
          <h1 class="text-danger m-3">GIỎ HÀNG</h1>

          <!-- Lặp qua danh sách giỏ hàng -->
          <div v-for="(cart, cartIndex) in filteredCarts" :key="cartIndex._id" class="card mb-3 shadow">
            <div class="card-body">
              <!--<div v-for="(sach, sachIndex) in cart.sach" :key="sachIndex">-->
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <!-- Hiển thị hình ảnh -->
                      <img :src="cart.sach.image" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                    </div>
                    <div class="ms-3">
                      <!-- Hiển thị tên sách -->
                      <h5>{{ shortenProductName(cart.sach.tensach) }}</h5>
                      <!-- Hiển thị giá -->
                      <p class="small mb-0 text-danger ">Giá: {{ cart.sach.dongia }}</p>
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0">Số lượng: {{ cart.sach.soquyen }}</p>
                      <!-- Hiển thị số lượng -->
                      <p class="small mb-0">Tổng tiền: {{ cart.sach.dongia * cart.sach.soquyen * 1000}}</p>

                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <!-- Nút xóa sách khỏi giỏ hàng -->
                    <button @click="deleteCart(cart._id)" style="color: red;"><i class="fas fa-trash-alt"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <div class="me-auto mt-2">
              <!-- Nút tiếp tục mua sắm -->
              <button type="button" class="btn btn-primary">Tiếp tục mua sắm</button>
            </div>
            <div class="">
              <!-- Nút tiến hành đặt hàng -->
              <router-link to="/theodoimuonsach" class="btn btn-success m-2">Tiến hành đặt hàng</router-link>
              <!-- Nút thanh toán qua VNPAY -->
              <button type="button" class="btn btn-warning m-2">Thanh toán qua VNPAY</button>
            </div>
          </div>
        </div>
        
        <thongtin></thongtin>

        <!-- <div class="col-lg-5  rounded-1 shadow mt-3 text-white" style="background-color: cornflowerblue; font-size: 20px;">
          <h5 class="mt-3 text-center">Đơn hàng của bạn!</h5>
          <div class="mt-3">
                    <p>Giảm giá:</p>
                    <p>Phí vận chuyển:</p>
                    <p>Total: </p>


                </div>
                
        </div> -->
      </div>
    <!--</div>-->
  </section>
</template>





<script>
import CartService from "@/services/cart.service";
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import thongtin from "@/components/Thongtin.vue";

export default {
  components: {
thongtin,
  },
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.retrieveCarts();
  },
  computed: {
    // Tính tổng tiền cho tất cả sản phẩm trong giỏ hàng
//     total() {
//     return this.filteredCarts.reduce((total, cart) => {
//         return total + cart.sach.reduce((subtotal, product) => {
//             return subtotal + (product.dongia * product.soquyen);
//         }, 0);
//     }, 0);
// },


    filteredCarts() {
      const userStore = useUserStore();
      const userId = userStore.userInfo ? userStore.userInfo.docgiaId : '';
      return this.carts.filter((cart) => cart.userId === userId);
    },
  },
    
  methods: {

    shortenProductName(name) {
      // You can adjust the length of the product name as needed
      const maxLength = 20; // Maximum length of the product name
      if (name.length > maxLength) {
        return name.substring(0, maxLength) + '...'; // Truncate the name if it exceeds maxLength
      }
      return name;
    },
    async retrieveCarts() {
  try {
  
    this.carts = await CartService.getAll();
    console.log('Carts fetched:', this.carts);
    
  } catch (error) {
    console.log('Lỗi khi lấy giỏ hàng');
  }

    },
    formatNumber(value) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    async deleteCart(sachId) {
    if (confirm("Bạn muốn xóa sách này khỏi giỏ hàng?")) {
        try {
            // Remove the item from the specified cart and sach index
            // this.carts[cartIndex].sach.splice(sachIndex, 1);
            // console.log(cartIndex+sachIndex)
            await CartService.delete({id: sachId});
            
            
            // Optionally, you can update the total here if needed
        } catch (error) {
            console.log(error);
        }
    }
},
  },
  // computed: {
  //   Id() {
  //     const userStore = useUserStore(); // Access the user store
  //     return userStore.userInfo ? userStore.userInfo.docgiaId : ''; // Access the docgiaId from the user store
  //   }
  // }
};
</script>
