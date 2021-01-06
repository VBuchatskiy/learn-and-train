<template>
  <form class="template-form" @submit.prevent="onsubmit">
    <section class="template-form-item">
      <h2 class="template-form-item-title">
        {{ capitalCase(`information`) }}
      </h2>
      <template v-if="routePrefix === 'template'">
        <template>
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `course-name`,
              type: `text`,
              name: `name`,
              value: data ? data.name : ``
            }"
          />
          <base-text-aria
            @typing="ontyping"
            v-bind="{
              placeholder: `course-description`,
              type: `text`,
              name: `description`,
              value: data ? data.description : ``
            }"
          />
        </template>
      </template>
      <template v-else-if="routePrefix === 'criteria'">
        <template>
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `${routePrefix}-name`,
              type: `text`,
              name: `name`,
              value: data ? data.name : ``
            }"
          />
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `required-grade`,
              type: `text`,
              name: `grade`,
              value: data ? data.grade : ``
            }"
          />
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `${routePrefix}-order`,
              type: `text`,
              name: `orderNumber`,
              value: data ? data.order : ``
            }"
          />
        </template>
      </template>
      <template v-else>
        <template>
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `${routePrefix}-name`,
              type: `text`,
              name: `name`,
              value: data ? data.name : ``
            }"
          />
          <base-text-field
            @typing="ontyping"
            v-bind="{
              placeholder: `${routePrefix}-order`,
              type: `text`,
              name: `orderNumber`,
              value: data ? data.order : ``
            }"
          />
        </template>
      </template>
    </section>
  </form>
</template>
<script>
import { capitalCase } from "capital-case";
import BaseTextField from "./base/BaseTextField.vue";
import BaseTextAria from "./base/BaseTextAria.vue";

export default {
  name: `TemplateForm`,
  components: { BaseTextField, BaseTextAria },
  props: {
    item: {
      type: Object
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      data: this.item ? this.item : {}
    };
  },
  methods: {
    ontyping({ text, e }) {
      this.data[e.target.name] = text;
    },
    onsubmit() {
      if (!this.data.name) {
        this.$notify({
          group: "notification",
          type: "warn",
          title: `Missing required field`,
          duration: 1000,
          speed: 1000
        });
      }
      if (this.routePrefix === `template`) {
        if (!this.data.description) {
          this.$notify({
            group: "notification",
            type: "warn",
            title: `Missing required field`,
            duration: 1000,
            speed: 1000
          });
        }
      }
      return this.data;
    },
    capitalCase
  },
  computed: {
    routePrefix() {
      return this.$route.name.split("-")[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.template-form {
  display: flex;
  flex-grow: 1;
}
.template-form-item {
  display: flex;
  flex: 1;
  padding-right: 1.5em;
  padding-left: 1.5em;
  flex-direction: column;
}

.template-form-item label {
  margin-bottom: 1em;
}

.template-form-item-title {
  margin-bottom: 1em;
}

.text-area {
  padding: 1em;
  resize: none;
  overflow: auto;
  outline: none;
  border-radius: $base-border-radius;
  border: $base-border;
  height: 100%;
  width: 100%;
}
</style>
