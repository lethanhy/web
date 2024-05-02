<template>
    <div class="" >
      <div class="row mt-3 mb-3">
        <div class="col-lg-5 rounded-1 shadow mt-3 text-white" style="background-color: cornflowerblue; font-size: 20px;">
          <h2 class="text-center pt-3">Thông Tin</h2>
          <form @submit.prevent="addUser">
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control"
                v-model="username">
            </div>
            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input type="text" class="form-control"
               v-model="dienthoai">
            </div>
            <div class="mb-3">
              <label class="form-label">Địa chỉ</label>
              <input type="text" class="form-control"
              v-model="diachi">
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary center">Submit</button>
            </div>
          </form>
          <!-- <p>{{ message }}</p> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    // Sử dụng computed để lấy giá trị isLoggedIn từ store
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const userInfo = computed(() => userStore.userInfo);
    const username = computed(() => userInfo.value ? userInfo.value.ten : null);
    const userId = computed(() => userInfo.value ? userInfo.value.docgiaId : null);
    const dienthoai = computed(() => userInfo.value ? userInfo.value.dienthoai : null);
    const diachi = computed(() => userInfo.value ? userInfo.value.diachi : null);


    // Define the method to logout the user
    const logout = () => {
      userStore.clearUser(); // Call the logout method from the user store
    };

    return {
      isLoggedIn,
      username,
      dienthoai,
      diachi,
      userId,
      logout,
    };
  }
};

</script>