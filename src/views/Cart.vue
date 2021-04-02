<template>
<div>
  <h1>Your Cart</h1>
  <ProductList :products="cart" />
</div>
</template>

<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Browse',
  components: {
    ProductList
  },
  data() {
    return {

    }
  },
  computed: {
    cart() {
      return this.$root.$data.cart;
    }
  },
  methods: {

  }
}
</script>
