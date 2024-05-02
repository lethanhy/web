<template>
    <div class="container mt-5 mb-5 ">
        <div class="row">
            <div class="col-lg-6   d-flex justify-content-center align-items-center">
                <img class="anh" :src="sach.image" alt="">
            </div>
            <div class="col-lg-6 bg-light ">
                <div>
                    <h2>{{ sach.tensach }}</h2>
                    <p>Nhà xuất bản: {{ sach.manxb }}<br>
                        <p>Tác giả: {{ sach.tacgia }}</p>
                    </p>
                    <p class="text-warning">Kho hàng: {{ sach.soquyen }} / Đã bán: 0</p>
                    <h1>{{ sach.dongia }} VND</h1>

                    <div class="d-flex">
                        <div>
                            <input class="number" type="number" name="" id="" min="1" max="10" placeholder="Số lượng" required step="1">
                        </div>
                        <!-- <select name="size" id="size">
                            <option value="small">S</option>
                            <option value="medium">M</option>
                            <option value="large">L</option>
                        </select> -->
                        
                        
                    </div>

                    <button type="button" class="btn btn-success mt-3"  >Thêm vào giỏ hàng</button>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import SachService from '@/services/sach.service';

export default {
    data() {
        return {
            sach: [], // Đổi từ mảng products thành đối tượng product
        };
    },
    created() {
        this.showProduct(); // Gọi phương thức showProduct khi component được tạo
    },
    methods: {
        async showProduct() {
            try {
                // const productId = 'your_product_id'; // Thay 'your_product_id' bằng id sản phẩm cần hiển thị
                this.sach = await SachService.get(this.$route.params.id); // Lưu thông tin sản phẩm vào biến product
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sản phẩm");
            }
        },
        addToCart() {
            // Thực hiện logic thêm sản phẩm vào giỏ hàng ở đây
            console.log("Thêm sản phẩm vào giỏ hàng");
            console.log("ID sản phẩm:", this.sach.id);
        },
    },
    filters: {
        formatCurrency(value) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            });
            return formatter.format(value);
        },
    },
}
</script>



<style scoped>

.d-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.number {
    width: 100px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

select {
    width: 120px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
/* CSS hiển thị ảnh */
.anh {
  max-width: 100%; /* Ảnh không vượt quá chiều rộng của cột */
  height: 400px; /* Duy trì tỷ lệ khung hình */
}

</style>