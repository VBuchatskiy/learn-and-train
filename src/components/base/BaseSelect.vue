<template>
  <label class="base-selector">
    <input
      class="base-selector-select"
      v-bind="{ value: capitalCase(selected), disabled }"
      readonly
      @click="ontoggle"
    />
    <chevron-down class="base-selector-select-icon" />
    <template v-if="menu.visible">
      <ul class="base-selector-list">
        <template v-for="(label, index) of options">
          <li
            class="base-selector-list-item"
            :key="index"
            @click="onselect({ value: label, e: $event })"
          >
            <span class="base-selector-list-item-text">
              {{ capitalCase(label) }}</span
            >
          </li>
        </template>
      </ul>
    </template>
  </label>
</template>

<script>
import { capitalCase } from "capital-case";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
export default {
  name: `BaseSelect`,
  components: {
    ChevronDown
  },
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    name: {
      type: String
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      menu: {
        visible: false
      },
      selected: this.value || this.placeholder
    };
  },
  methods: {
    ontoggle() {
      this.menu.visible = !this.menu.visible;
    },
    onselect({ value, e }) {
      this.$emit(`selected`, { name: this.name, value, e });
      this.selected = this.capitalCase(value);
    },
    capitalCase
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.menu.visible = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.base-selector {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.base-selector-select {
  background-color: #fff;
  border: $base-border;
  height: 3.125em;
  border-radius: $base-border-radius;
  border: none;
  cursor: inherit;
  text-indent: 1em;
  outline: none;
  flex-grow: 1;
}

.base-selector-select:disabled {
  background-color: #cbdae3;
}

.base-selector-select-icon {
  position: absolute;
  right: 0;
  margin-right: 1em;
}

.base-selector-select::placeholder {
  font-size: 0.875em;
}

.disabled {
  background-color: aqua;
}

.base-selector-list {
  border-radius: $base-border-radius;
  background-color: $secondary-color;
  position: absolute;
  top: 3.125em;
  width: 100%;
}

.base-selector-list-item {
  cursor: pointer;
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: $base-border;
  text-indent: 1em;
}

.base-selector-list-item-text {
  font-size: 1em;
}

.base-selector-list-item:hover {
  background-color: #e6e6e6;
}

.base-selector-list-item:first-child {
  border-radius: 12px 12px 0 0;
  border-width: 0;
}

.base-selector-list-item:last-child {
  border-radius: 0 0 12px 12px;
  border-width: 0;
}
</style>
