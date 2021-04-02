<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('Toyota')" href="#" class="pure-menu-link">Toyota</a></li>
      <li class="pure-menu-item"><a @click="select('Volkswagen')" href="#" class="pure-menu-link">Volkswagen</a></li>
      <li class="pure-menu-item"><a @click="select('BMW')" href="#" class="pure-menu-link">BMW</a></li>
      <li class="pure-menu-item"><a @click="select('Ford')" href="#" class="pure-menu-link">Ford</a></li>
    </ul>
  </div>
  <ProductList :products="products" />
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
      make: '',
      used: '',
    }
  },
  computed: {
    products() {
      return this.$root.$data.products.filter(product => product.make === this.make);
    },
    products1() {
      return this.$root.$data.products.filter(product => product.used === this.used);
    }

    //products: function(){ return this.$root.$data.products.filter(product => product.make === this.make); },
    //products1: function(){ return this.products.filter(product => product.used === this.used); }
  },
  methods: {
    select(make) {
      this.make = make;
    },
    selectUsed(used) {
      this.used = used;
    }
  }
}
</script>
