<template>
  <label class="base-text-aria">
    <textarea
      class="base-text-aria-field"
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
  name: `BaseTextAria`,
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
.base-text-aria {
  display: flex;
}

.base-text-aria-field {
  padding: 1em;
  display: flex;
  box-shadow: $base-box-shadow;
  border: $base-border;
  border-radius: $base-border-radius;
  background-color: $secondary-color;
  outline: none;
  resize: none;
  width: 100%;
  height: 40vh;
}
</style>
