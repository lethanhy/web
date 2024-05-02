<template>
    <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-sm-3 mt-5">
        <h4 class="mb-4">Danh Mục</h4>
        <div class="list-group" v-for="(item, index) in nhaxuatban" :key="item._id">
          <a href="#" class="list-group-item list-group-item-action"  @click="findCategory(item)">{{ item.ten }}</a>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-sm-9">
        <Product :sach="sach"  @click="addToCart(sach)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import SachService from "@/services/sach.service";
import InputSearch from '../components/InputSearch.vue';
import NhaxuatbanService from '@/services/nhaxuatban.service';
export default {
    components: {
        Product,
        InputSearch,
       
    },
    data() {
        return {
            sach: [],
            nhaxuatban: [],
            selectCategoryId: null,
            cart: [],
            // activeIndex: -1,
            // searchText: "",
        };
    },
    created() {
        this.retrieveProducts();
        this.retrieveCategory();
        
    },
    methods: {
        async retrieveProducts() {
            try {
                this.sach = await SachService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveCategory() {
            try {
                this.nhaxuatban = await NhaxuatbanService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

    },
    // computed: {
    //   filteredProducts() {
    //     if(!this.selectCategoryId) {
    //       return this.products;
    //     } else {
    //       return this.products.filter(product => product.category === this.selectCategoryId);
    //     }
    //   }
    // }

}
</script>

<style scoped>
.container-fluid {
  padding: 20px 0;
}

.list-group-item-action {
  cursor: pointer;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #777;
}

.btn-dark {
  width: 100%;
}
</style>

<!-- <style scoped>
.container-fluid {
  padding: 20px 0;
}

.list-group-item-action {
  cursor: pointer;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style> -->