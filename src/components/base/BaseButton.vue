<template>
  <router-link
    class="base-button"
    :class="styling"
    tag="button"
    v-if="to"
    :to="to"
    @click="
      e => {
        this.$emit('click', e);
      }
    "
  >
    <slot></slot>
  </router-link>
  <button
    v-else
    class="base-button"
    :class="styling"
    @click="
      e => {
        this.$emit('click', e);
      }
    "
  >
    <slot></slot>
  </button>
</template>

<script>
import { capitalCase } from "capital-case";

export default {
  name: `BaseButton`,
  props: {
    title: {
      type: String
    },
    icon: {
      type: Boolean
    },
    color: {
      type: String
    },
    to: {
      type: Object
    },
    right: {
      type: Boolean
    },
    left: {
      type: Boolean
    },
    rounded: {
      type: Boolean
    },
    text: {
      type: Boolean
    },
    block: {
      type: Boolean
    },
    medium: {
      type: Boolean
    }
  },
  methods: {
    capitalCase
  },
  computed: {
    styling() {
      const prefix = `${this.$options._componentTag}`;
      return {
        [`${prefix}--${this.color}`]: this.color,
        [`${prefix}--${this.size}`]: this.size,
        [`${prefix}--right`]: this.right,
        [`${prefix}--left`]: this.left,
        [`${prefix}--rounded`]: this.rounded,
        [`${prefix}--text`]: this.text,
        [`${prefix}--block`]: this.block,
        [`${prefix}--medium`]: this.medium
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $base-border-radius;
  border: $secondary-border;
  background-color: transparent;
  cursor: pointer;
  color: $base-font-color;
  outline: none;
  height: 2.5em;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-right: 2em;
  padding-left: 2em;
}
.base-button-title {
  margin-right: 0.4em;
}
.base-button--white {
  background-color: $secondary-color;
}
.base-button--orange {
  background-color: $accent-color;
  border-style: none;
  color: $secondary-font-color;
}
.base-button--green {
  background-color: $base-color;
  border-style: none;
  color: $secondary-font-color;
}
.base-button--grey {
  background-color: rgba(20, 22, 56, 0.100279);
  border-style: none;
  color: #141638;
}
.base-button::first-letter {
  text-transform: uppercase;
}
.base-button--block {
  height: 3.125em;
  width: 100%;
}

.base-button--medium {
  margin-left: 1em;
  width: 100px;
}
.base-button--right {
  margin-left: auto;
}
.base-button--left {
  margin-right: auto;
}
.base-button--rounded {
  color: #0275ff;
  background-color: rgba(0, 116, 255, 0.05);
  border-radius: 50%;
  padding: 0;
  height: 50px;
  width: 50px;
}
.base-button--text {
  font-size: 16px;
  line-height: 0.825em;
  border-width: 0em;
}
</style>
