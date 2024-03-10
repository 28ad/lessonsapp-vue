
<template>
  <div id="app">
    <button @click="showCheckout">{{ this.cart.length }}
      Checkout</button>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import LessonsList from './components/LessonsList.vue';
import Checkout from './components/Checkout.vue';

export default {
  name: "app",
  data() {

    return {
      cart: [],
      currentView: LessonsList,
      
    }
  },
  components: {LessonsList, Checkout},
  methods: {
    showCheckout() {
      if (this.currentView === LessonsList) {
        this.currentView = Checkout;
      } else {
        this.currentView = LessonsList;
      }
    }
    
  }
}
</script>

