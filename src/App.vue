<template>
  <section id="app" @dialog:>
    <notifications group="notification" position="top center" />
    <router-view />
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: `AdminPanel`,
  computed: {
    ...mapGetters(`auth`, {
      authorized: `authorized`
    }),
    ...mapGetters({
      error: `error`
    })
  },
  mounted() {
    if (!this.authorized) {
      if (this.$route.name === `login`) return;
      this.$router.push({ name: `login` });
    } else {
      if (this.$route.name === `user-view`) return;
      this.$router.push({ name: `user-view` });
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #c0ced7;
  height: 100vh;
  width: 100vw;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
@font-face {
  font-family: "ProductSans";
  src: local("ProductSans"),
    url(./fonts/product-sans/product-sans-regular.ttf) format("truetype");
}
</style>
