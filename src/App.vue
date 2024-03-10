<template>
  <div id="app">
    <!-- header of the page  -->
    <div class="header">
      <h1 v-if="showCheckout">BOOK YOUR LESSONS !</h1>
      <h1 v-else>CART</h1>
      <button id="checkoutBtn" class="checkout-btn" v-on:click="showCheckout">{{ cartCounter }}&nbsp;Checkout</button>
    </div>

    <component :is="currentView" :subjects="subjects" @add-to-cart="addToCart" :cart="cart"></component>
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
      subjects: [],
      serverURL: "https://webstore-restapi.onrender.com/collections/products/",
    }
  },
  components: { LessonsList, Checkout },
  created: function () {
    this.startSW();

    // Fetch data as soon as the homepage loads
    fetch('https://webstore-restapi.onrender.com/collections/products')
      .then(response => response.json())
      .then(data => {
        console.log('Data from MongoDB:', data);
        // Use the data in your front-end application
        this.subjects = data;

        console.log('Data from MongoDB:', this.subjects);
      })
      .catch(error => console.error('Error fetching data:', error));

  },

  methods: {
    startSW() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
      }
    },
    showCheckout() {
      if (this.currentView === LessonsList) {
        this.currentView = Checkout;
      } else {
        this.currentView = LessonsList;
      }
    },
    // function which adds items to the cart array
    addToCart: function (subject, index) {

      // search if item is already present in the cart array
      let lessonIndex = this.cart.findIndex((ct) => ct.product_id === subject.product_id);

      // if not
      if (lessonIndex == -1) {

        // add subject properties to cart
        this.cart.push({
          ...subject,
          quantity: 1,
        });

      } else {

        // add to cart quantity 
        this.cart[lessonIndex].quantity++;
      }

      // subtract from the available inventory 
      this.subjects[index].invQuantity--;

      // enable cart button after item has been added
      let checkoutBtn = document.getElementById("checkoutBtn");
      if (checkoutBtn) {
        checkoutBtn.removeAttribute("disabled");
      }

    },


  },

  computed: {
        // updates cart count real time - shows empty string if cart is empty
        cartCounter: function () {

            let cartCount = 0;

            for (const item of this.cart) {
                cartCount += item.quantity;
            }

            return cartCount || "";
        },
}
}
</script>

