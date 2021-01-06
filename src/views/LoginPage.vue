<template>
  <section class="login">
    <header class="login-header">
      <logo class="login-logo" />
      <h3>Check & Train</h3>
    </header>
    <section class="login-content">
      <h1 class="login-content-title">Sing In</h1>
      <form class="login-form" @submit.prevent="login">
        <base-text-field
          class="login-form-text-field"
          v-bind="{
            placeholder: `Email`,
            type: `email`
          }"
          @typing="
            ({ text }) => {
              this.email = text;
            }
          "
        />
        <base-text-field
          class="login-form-text-field"
          v-bind="{
            placeholder: `Password`,
            type: `password`
          }"
          @typing="
            ({ text }) => {
              this.password = text;
            }
          "
        />
        <base-button
          v-bind="{
            color: `green`
          }"
          block
          ><span>Log In</span>
        </base-button>
      </form>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AUTH_ACTION_TYPES from "@/store/modules/auth/actions-types";
import BaseTextField from "@/components/base/BaseTextField.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import Logo from "@/components/icons/Logo.vue";

export default {
  name: `Login`,
  components: {
    BaseTextField,
    BaseButton,
    Logo
  },
  data() {
    return {
      email: ``,
      password: ``
    };
  },
  methods: {
    ...mapActions(`${AUTH_ACTION_TYPES.NAMESPACE}`, {
      authRequest: `${AUTH_ACTION_TYPES.AUTH_REQUEST}`
    }),
    async login() {
      const { email, password } = this;
      if (!email || !password) return;
      try {
        await this.authRequest({
          email,
          password
        });
        this.$router.push({ name: `user-view` });
      } catch (error) {
        console.warn(error);
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      status: `status`
    })
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}

.login-content-title {
  margin-bottom: 1.25em;
}

.login-content {
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
  background: #ffffff;
  box-shadow: 0px 22px 34px rgba(174, 181, 190, 0.0936954);
  border-radius: 12px;
  width: 483px;
  height: 346px;
}

.login-form-text-field {
  margin-bottom: 1.25em;
}

.login-logo {
  margin-bottom: 1em;
}
</style>
