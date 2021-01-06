<template>
  <label class="base-text-field-label">
    <input
      class="base-text-field"
      v-bind="{ placeholder: capitalCase(placeholder), type, name }"
      v-model="text"
      @input="ontyping({ e: $event })"
      autocomplete
    />
  </label>
</template>

<script>
import { capitalCase } from "capital-case";

export default {
  name: `BaseInput`,
  props: {
    placeholder: {
      type: String
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    required: {
      type: Boolean
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      text: this.value ? this.value : ``
    };
  },
  methods: {
    ontyping({ e }) {
      this.$emit(`typing`, { text: this.text, e });
    },
    capitalCase
  }
};
</script>

<style lang="scss" scoped>
.base-text-field-label {
  display: flex;
}

.base-text-field {
  display: flex;
  flex-grow: 2;
  box-shadow: $base-box-shadow;
  border: $base-border;
  border-radius: $base-border-radius;
  background-color: $secondary-color;
  height: 3.125em;
  text-indent: 1em;
  outline: none;
}
</style>
