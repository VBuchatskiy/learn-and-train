<template>
  <form class="user-form" @submit.prevent="onsubmit">
    <section class="user-form-item">
      <h2 class="user-form-item-title">
        {{ capitalCase(`information`) }}
      </h2>
      <base-text-field
        @typing="ontyping"
        v-bind="{
          placeholder: `First Name`,
          type: `text`,
          name: `firstName`,
          value: data ? data.firstName : ``
        }"
      />
      <base-text-field
        @typing="ontyping"
        v-bind="{
          placeholder: `Last Name`,
          type: `text`,
          name: `lastName`,
          value: data ? data.lastName : ``
        }"
      />
    </section>
    <section class="user-form-item">
      <section class="user-for-authentication">
        <h2 class="user-form-item-title">
          {{ capitalCase(`authentication`) }}
        </h2>
        <base-select
          v-bind="{
            placeholder: `User Type`,
            options: ['student', `instructor`],
            disabled: $route.name.includes(`edit`),
            name: `userRole`,
            value: data ? data.userRole : ``
          }"
          @selected="onselect"
        >
        </base-select>
        <base-text-field
          @typing="ontyping"
          v-bind="{
            placeholder: `Email Address`,
            type: `email`,
            name: `email`,
            value: data ? data.email : ``
          }"
        />
        <base-text-field
          @typing="ontyping"
          v-bind="{
            placeholder: `New Password`,
            type: `password`,
            name: `password`
          }"
        />
        <base-text-field
          @typing="ontyping"
          v-bind="{
            placeholder: `Confirm New Password`,
            type: `password`,
            name: `confirmPassword`
          }"
        />
      </section>
      <template v-if="data && data.userRole === `STUDENT`">
        <section>
          <h2 class="user-form-item-title">
            {{ capitalCase(`assign instructor`) }}
          </h2>
          <base-select
            @selected="onselect"
            v-bind="{
              placeholder: `Select Instructor`,
              name: `instructor`,
              options: data.assignedInstructors.length
                ? assignedInstructors
                : [],
              disabled: !data.availableInstructors.length ? true : false
            }"
          >
          </base-select>
          <base-button right v-bind="{ color: `grey` }" @click="onassign">
            <span>Add Another Instructor</span>
          </base-button>
        </section>
      </template>
    </section>
  </form>
</template>

<script>
import { capitalCase } from "capital-case";
import BaseTextField from "./base/BaseTextField.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseSelect from "./base/BaseSelect.vue";

export default {
  name: `UserFrom`,
  components: { BaseTextField, BaseSelect, BaseButton },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      data: this.item ? this.item : {}
    };
  },
  mounted() {
    console.warn(this.data.availableInstructors.length);
  },
  methods: {
    ontyping({ text, e }) {
      this.data[e.target.name] = text;
    },
    onselect({ value, name }) {
      this.data[name] = value;
    },
    onsubmit() {
      if (!this.data.firstName) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
        return;
      }
      if (!this.data.lastName) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
        return;
      }
      if (!this.data.email) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
        return;
      }
      if (!this.data.password) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
        return;
      }
      if (!this.data.userRole) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
        return;
      }
      if (this.data.password !== this.data.confirmPassword) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Password dont match`,
          duration: 1000,
          speed: 1000
        });
        return;
      }

      return this.data;
    },
    onassign() {
      this.$emit(`onassign`, this.data);
    },
    capitalCase
  }
};
</script>

<style lang="scss" scoped>
.user-form {
  display: flex;
  flex-grow: 1;
}
.user-form-item {
  display: flex;
  flex: 1;
  padding-right: 1.5em;
  padding-left: 1.5em;
  flex-direction: column;
}

.user-form-item label {
  margin-bottom: 1em;
}

.user-form-item-title {
  margin-bottom: 1em;
}
.user-for-authentication {
  margin-bottom: 2em;
}
</style>
