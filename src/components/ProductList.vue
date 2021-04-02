<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="product in products" :key="product.id" @click = "OpenCarViewer(product)">
      <div class="info">
        <h1>{{product.make}} {{product.model}}</h1>
      </div>
      <div class="image">
        <img :src="'/images/products/'+product.image">
      </div>
      <div class="price">
        <button class="auto">Details</button>
      </div>
    </div>
  </div>
<CarViewer v-if = "this.$root.$data.showCarViewer"/>

</div>
</template>

<script>
import CarViewer from "../components/CarViewer.vue"
export default {
  name: 'ProductList',
  data() {
    return {

    }
  },
  methods: {
    OpenCarViewer(car){
      this.$root.$data.currentCar = car;
      this.$root.$data.showCarViewer = true;
    }
  },
  props: {
    products: Array
  },
  components: {
    CarViewer
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product {
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 50px;
  width: 200px;
  justify-content: center;

}

.product img {
  height: 250px;
  width: 500px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.info {
  background: white;
  color: #000;
  padding: 0px 30px;
  height: 40px;
}

.info h1 {
  font-size: 50px;
  text-align: center;
}

.info h2 {
  font-size: 14px;
  text-align: center;
}

.info p {
  margin: 0px;
  font-size: 10px;
  text-align: center;
}


.price {
  display: flex;

}

button {
  height: 50px;
  width: 200px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}


</style>
