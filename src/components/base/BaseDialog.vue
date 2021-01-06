<template>
  <div class="base-dialog">
    <section class="base-dialog-content">
      <h1 class="base-dialog-title">{{ title }}</h1>
      <p class="base-dialog-text">{{ message }}</p>
      <div class="base-dialog-group-button">
        <slot name="cancel"></slot>
        <slot name="confirm"></slot>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  naem: `BaseDialog`,
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    },
    dialog: {
      type: Object
    }
  },
  data() {
    return {
      visible: this.dialog.visible
    };
  }
};
</script>

<style lang="scss" scoped>
.base-dialog {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
}

.base-dialog-content {
  border-radius: $base-border-radius;
  background-color: $secondary-color;
  padding-left: 4em;
  padding-right: 4em;
  padding-top: 2em;
  padding-bottom: 2em;
  z-index: 20;
}

.base-dialog::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}

.base-dialog-title {
  padding-bottom: 0.5em;
  flex-grow: 2;
}
.base-dialog-text {
  text-align: center;
  padding-bottom: 2em;
  flex-grow: 2;
}
.base-dialog-button {
  align-self: end;
}
.base-dialog-group-button {
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: space-around;
  flex-grow: 2;
}
</style>
