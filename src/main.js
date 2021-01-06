import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Notifications from "vue-notification";

Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  Notifications,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
