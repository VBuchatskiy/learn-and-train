<template>
  <section class="base-list-container">
    <section class="base-list">
      <ul class="base-list-header">
        <template v-for="(item, index) of titles">
          <template v-if="item.title">
            <li :key="index" class="base-list-header-item">
              <h2>{{ capitalCase(item.title) }}</h2>
            </li>
          </template>
          <template v-else>
            <li :key="index" class="base-list-header-item"></li>
          </template>
        </template>
      </ul>
      <template v-for="item of collection">
        <ul class="base-list-content" :key="item.id">
          <template v-for="(title, index) of titles">
            <li :key="index" class="base-list-content-item">
              <h3 class="base-list-content-item-title">
                {{
                  Number.isNaN(+item[title.key])
                    ? capitalCase(item[title.key])
                    : item[title.key]
                }}
              </h3>
            </li>
          </template>
          <template v-if="$slots.button">
            <li
              class="base-list-content-slot"
              @click="
                () => {
                  $emit(`edit`, { item });
                }
              "
            >
              <slot name="button"></slot>
            </li>
          </template>
          <template v-if="$slots.checkbox">
            <li
              class="base-list-content-slot"
              @click="
                () => {
                  $emit(`checked`, { item });
                }
              "
            >
              <slot name="checkbox"></slot>
            </li>
          </template>
        </ul>
      </template>
    </section>
    <template>
      <footer class="base-list-pagination">
        <template v-if="totalPages !== 1">
          <template>
            <button
              class="base-list-pagination-list-button-controller"
              v-bind="{ disabled: !active }"
              @click.prevent="prev"
            >
              <chevron-left />
            </button>
          </template>
          <ul class="base-list-pagination-list">
            <template v-for="(item, index) of totalPages">
              <li
                :key="index"
                class="base-list-pagination-list-item"
                @click="toPage({ index })"
              >
                <button
                  class="base-list-pagination-list-button"
                  v-bind="{ disabled: active === index }"
                >
                  {{ index + 1 }}
                </button>
              </li>
            </template>
          </ul>
          <template>
            <button
              class="base-list-pagination-list-button-controller"
              v-bind="{ disabled: active === totalPages - 1 }"
              @click.prevent="next"
            >
              <chevron-right />
            </button>
          </template>
        </template>
      </footer>
    </template>
  </section>
</template>

<script>
import { capitalCase } from "capital-case";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

export default {
  name: `BaseList`,
  components: {
    ChevronLeft,
    ChevronRight
  },
  props: {
    titles: {
      type: Array
    },
    collection: {
      type: Array
    },
    totalPages: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    next({ index }) {
      if (index) {
        if (this.active === index) return;
        this.active = index;
      } else {
        if (this.active === this.total - 1) return;
        this.active += 1;
      }
      this.$emit("loadPage", { page: this.active });
    },
    prev({ index }) {
      if (index) {
        if (this.active === index && this.active === index) return;
        this.active = index;
      } else {
        if (!this.active) return;
        if (this.active === this.total - 1) this.active -= 1;
      }
      this.$emit("loadPage", { page: this.active });
    },
    toPage({ index }) {
      this.active = index;
      this.$emit("loadPage", { page: this.active });
    },
    getButtonQty() {
      return this.totalPages ? new Array(this.totalPages) : [];
    },
    capitalCase
  }
};
</script>

<style lang="scss" scoped>
.base-list-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: auto;
}

.base-list {
  display: flex;
  flex-grow: 1;
  background-color: $secondary-color;
  border-radius: $base-border-radius;
  flex-direction: column;
  height: auto;
}

.base-list-header {
  border-radius: 12px 12px 0 0;
  color: $secondary-color;
  background-color: $base-color;
}

.base-list-header,
.base-list-content {
  display: flex;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  height: calc(100% / 8);
  border-bottom: 1px solid #e6e6e6;
}

.base-list-header-item,
.base-list-content-item {
  text-indent: 1em;
  width: calc(100% / 3);
}

.base-list-content-item:nth-child(2) h3 {
  font-weight: 400;
}

.base-list-content {
  background-color: $secondary-color;
  border-radius: 0 0 12px 12px;
}

.base-list-content-slot {
  margin-left: auto;
}

.base-list-pagination {
  display: flex;
  align-self: flex-end;
  height: 10%;
}

.base-list-pagination-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-list-pagination-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 0.5em;
}

.base-list-pagination-list-item:first-child {
  margin-left: 0;
}

.base-list-pagination-list-button-controller:disabled {
  color: grey;
}

.base-list-pagination-list-button-controller {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-width: 0;
  outline: 0;
  color: #0075ff;
}

.base-list-pagination-list-button {
  border-radius: 3px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-width: 0;
  background-color: $secondary-color;
  outline: 0;
  height: 1.875em;
  width: 1.875em;
}

.base-list-pagination-list-button:disabled {
  background-color: #0075ff;
  color: #fff;
}
</style>
