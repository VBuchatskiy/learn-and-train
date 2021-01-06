<template>
  <nav class="navigation">
    <h3 class="navigation-title">Users</h3>
    <ul class="navigation-list">
      <router-link tag="li" :to="{ name: `user-view` }">
        <span>All Users</span>
      </router-link>
    </ul>
    <h3 class="navigation-title">Content</h3>
    <ul class="navigation-list">
      <router-link
        class="navigation-list-item"
        tag="li"
        :to="{ name: `template-view` }"
      >
        <span>Course Tempates</span>
      </router-link>
      <router-link
        class="navigation-list-item"
        tag="li"
        :to="{ name: `course-view` }"
      >
        <span>My Courses</span>
      </router-link>
    </ul>
    <base-button class="navigation-button" @click.prevent="exit" text>
      <span>Sing Out</span>
      <span><exit-to-app class="navigation-button-icon"/></span>
    </base-button>
  </nav>
</template>

<script>
import ACTION_TYPES from "@/store/modules/auth/actions-types";
import { mapActions } from "vuex";
import ExitToApp from "vue-material-design-icons/ExitToApp.vue";
import BaseButton from "../components/base/BaseButton";

export default {
  components: { ExitToApp, BaseButton },
  name: `Navigation`,
  props: {
    menu: {
      type: Object
    }
  },
  methods: {
    ...mapActions(`auth`, {
      logout: `${ACTION_TYPES.LOG_OUT}`
    }),
    exit() {
      this.logout();
      this.$router.push({ name: `login` });
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.menu.visible = false;
      }
    });
  },
  beforeDestroy() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.menu.visible = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  background-color: $secondary-color;
  padding-top: 2em;
  padding-left: 1.5em;
  padding-bottom: 1.5em;
  position: absolute;
  width: 30vh;
}

.navigation-title {
  margin-bottom: 0.75em;
  text-align: left;
}

.navigation-list {
  padding-left: 0;
  margin-bottom: 0.75em;
}

.navigation-list li {
  margin-bottom: 1em;
  font-family: ProductSans;
  font-size: 14px;
  line-height: 16px;
  color: #141638;
  mix-blend-mode: normal;
  opacity: 0.5;
  cursor: pointer;
}

.navigation-button {
  align-self: start;
  margin-top: auto;
}

.navigation-button-icon {
  margin-left: 0.2em;
}
</style>
