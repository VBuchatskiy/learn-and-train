<template>
  <section class="user-view">
    <template v-if="dialog.visible">
      <base-dialog
        v-bind="{
          title: `Confirm Deletion`,
          message: `Please confirm, if you would like to Delete this ${routePrefix}?`,
          dialog
        }"
      >
        <template #confirm>
          <base-button v-bind="{ color: `orange` }" @click="onDeleteConfirm">
            <span>Yes, Delete</span>
          </base-button>
        </template>
        <template #cancel>
          <base-button @click="onDeleteCancel">
            <span>Cancel</span>
          </base-button>
        </template>
      </base-dialog>
    </template>
    <header class="user-view-header">
      <template v-if="menu.visible">
        <navigation class="user-view-header__navigation" v-bind="{ menu }" />
      </template>
      <base-button
        @click.stop="menu.visible = !menu.visible"
        v-bind="{ color: `green` }"
        rounded
      >
        <menu-icon />
      </base-button>
      <h1 class="user-view-header__title">
        {{ capitalCase(title) }}
      </h1>
      <template v-if="$route.name === `user-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-user`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `template-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-course`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `lesson-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-lesson`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `unit-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-unit`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `element-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-element`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `criteria-view`">
        <base-button
          @click="onAdd"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`add-critaria`) }}
            </span>
            <span></span>
          </template>
        </base-button>
      </template>
      <template v-if="$route.name === `course-view`">
        <base-button
          @click="onCourseStart"
          v-bind="{
            color: `green`
          }"
          right
        >
          <template>
            <span>
              {{ capitalCase(`start-course`) }}
            </span>
          </template>
        </base-button>
      </template>
    </header>
    <main class="user-view-content">
      <template v-if="$route.name.includes('user')">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>

        <template v-if="$route.name.includes(`add`)">
          <user-form ref="form"></user-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <user-form ref="form" @assigned="onAssign" v-bind="{ item }">
          </user-form>
        </template>
      </template>
      <template v-if="$route.name.includes(`template`)">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>
        <template v-if="$route.name.includes(`add`)">
          <template-form ref="form"></template-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <template-form
            v-bind="{ item, id: $route.params.id }"
            ref="form"
          ></template-form>
        </template>
      </template>
      <template v-if="$route.name.includes(`lesson`)">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>
        <template v-if="$route.name.includes(`add`)">
          <template-form ref="form"></template-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <template-form
            v-bind="{ item, id: $route.params.id }"
            ref="form"
          ></template-form>
        </template>
      </template>
      <template v-if="$route.name.includes(`unit`)">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>
        <template v-if="$route.name.includes(`add`)">
          <template-form ref="form"></template-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <template-form
            v-bind="{ item, id: $route.params.lessonId }"
            ref="form"
          ></template-form>
        </template>
      </template>
      <template v-if="$route.name.includes(`element`)">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>
        <template v-if="$route.name.includes(`add`)">
          <template-form ref="form"></template-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <template-form
            v-bind="{ item, id: $route.params.lessonId }"
            ref="form"
          ></template-form>
        </template>
      </template>
      <template v-if="$route.name.includes(`criteria`)">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @edit="onEdit"
            @loadPage="onLoadPage"
          >
            <template #button>
              <base-button right>
                <span>Edit</span>
              </base-button>
            </template>
          </base-list>
        </template>
        <template v-if="$route.name.includes(`add`)">
          <template-form ref="form"></template-form>
        </template>
        <template v-if="$route.name.includes(`edit`)">
          <template-form
            v-bind="{ item, id: $route.params.lessonId }"
            ref="form"
          ></template-form>
        </template>
      </template>
      <template v-if="$route.name.includes('course')">
        <template v-if="$route.name.includes(`view`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @loadPage="onLoadPage"
          >
          </base-list>
        </template>
        <template v-if="$route.name.includes(`start`) && collection">
          <base-list
            class="user-view-content"
            v-bind="{ titles, collection, totalPages, currentPage }"
            @checked="onCheck"
            @loadPage="onLoadPage"
          >
            <template #checkbox>
              <base-check-box />
            </template>
          </base-list>
        </template>
      </template>
    </main>
    <footer class="user-view-footer">
      <template v-if="$route.name.includes('add')">
        <base-button v-bind="{ color: `green` }" medium @click.prevent="onSave">
          <span>
            Save
          </span>
        </base-button>
        <base-button medium @click.passive="onCancel">
          <span>
            Cancel
          </span>
        </base-button>
      </template>
      <template v-if="$route.name.includes('edit')">
        <base-button v-bind="{ color: `green` }" medium @click.prevent="onSave">
          <span>
            Save
          </span>
        </base-button>
        <base-button medium @click.passive="onCancel">
          <span>
            Cancel
          </span>
        </base-button>
        <base-button
          left
          v-bind="{ color: `orange` }"
          @click.prevent="onDeleteRequest"
        >
          <span>
            {{ capitalCase(`delete-${this.routePrefix}`) }}
          </span>
        </base-button>
      </template>
    </footer>
  </section>
</template>

<script>
import { capitalCase } from "capital-case";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseList from "@/components/base/BaseList.vue";
import BaseCheckBox from "@/components/base/BaseCheckBox.vue";
import BaseDialog from "@/components/base/BaseDialog.vue";
import Navigation from "@/components/Navigation.vue";
import UserForm from "@/components/UserForm.vue";
import TemplateForm from "@/components/TemplateForm.vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";

export default {
  components: {
    BaseButton,
    BaseList,
    BaseDialog,
    BaseCheckBox,
    Navigation,
    UserForm,
    TemplateForm,
    MenuIcon
  },
  name: `UserViews`,
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: {
        visible: false
      },
      menu: {
        visible: false
      }
    };
  },
  methods: {
    async load({ page }) {
      if (this.$route.name === `course-start`) {
        this.$store.dispatch(`template/load`, {
          page
        });
      }
      this.$store.dispatch(`${this.routePrefix}/load`, {
        page,
        ...this.$route.params
      });
    },
    async onLoadPage({ page }) {
      this.load({ page });
    },
    async onCheck({ item }) {
      this.$store.dispatch(`${this.routePrefix}/add`, { item });
    },
    async onEdit({ item }) {
      await this.$store.dispatch(`${this.routePrefix}/get`, { ...item });

      switch (this.routePrefix) {
        case `user`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              userId: item.userId
            }
          });
          return;
        }
        case `template`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              courseTemplateId: item.courseTemplateId
            }
          });
          return;
        }
        case `lesson`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              lessonTemplateId: item.lessonTemplateId
            }
          });
          return;
        }
        case `unit`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              unitTemplateId: item.unitTemplateId
            }
          });
          return;
        }
        case `element`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              elementTemplateId: item.elementTemplateId
            }
          });
          return;
        }
        case `criteria`: {
          this.$router.push({
            name: `${this.routePrefix}-edit`,
            params: {
              criteriaTemplateId: item.criteriaTemplateId
            }
          });
          return;
        }
      }
    },
    async onSave() {
      const data = this.$refs.form.onsubmit();

      if (this.$route.name.includes("add")) {
        await this.$store.dispatch(`${this.routePrefix}/add`, {
          [`${this.routePrefix}`]: {
            ...this.$route.params,
            ...data
          }
        });

        this.$router.push({ name: `${this.routePrefix}-view` });
        return;
      }

      if (this.$route.name.includes("edit")) {
        await this.$store.dispatch(`${this.routePrefix}/edit`, {
          [`${this.routePrefix}`]: {
            ...data
          }
        });

        if (this.routePrefix === `user`) {
          this.$router.push({ name: `user-view` });
          return;
        }

        if (this.routePrefix === `template`) {
          this.$router.push({ name: `lesson-view` });
          return;
        }

        if (this.routePrefix === `lesson`) {
          const { courseTemplateId } = this.$route.params;

          this.$router.push({
            name: `unit-view`,
            params: {
              courseTemplateId
            }
          });
          return;
        }

        if (this.routePrefix === `unit`) {
          const { lessonTemplateId } = this.$route.params;

          this.$router.push({
            name: `element-view`,
            params: {
              lessonTemplateId
            }
          });
          return;
        }
        if (this.routePrefix === `element`) {
          const { unitTemplateId } = this.$route.params;

          this.$router.push({
            name: `criteria-view`,
            params: {
              unitTemplateId
            }
          });
          return;
        }
        if (this.routePrefix === `criteria`) {
          const { criteriaTemplateId } = this.$route.params;
          this.$router.push({
            name: `criteria-view`,
            params: {
              criteriaTemplateId
            }
          });
          return;
        }
      }
    },
    async onDeleteConfirm() {
      this.dialog.visible = false;

      await this.$store.dispatch(`${this.routePrefix}/delete`, {
        ...this.$route.params
      });

      this.$router.push({
        name: `${this.routePrefix}-view`
      });
    },
    async onAssign() {
      await this.$store.dispatch(`${this.routePrefix}/assign`, {
        user: this.$refs.form.data.user
      });
    },
    onDeleteRequest() {
      this.dialog.visible = true;
    },
    onDeleteCancel() {
      this.dialog.visible = false;
    },
    onAdd() {
      this.$router.push({
        name: `${this.routePrefix}-add`
      });
    },
    onCancel() {
      this.$router.push({
        name: `${this.routePrefix}-view`
      });
    },
    onCourseStart() {
      this.$router.push({
        name: `course-start`
      });
    },
    capitalCase
  },
  computed: {
    routePrefix() {
      return this.$route.name.split("-")[0];
    },
    item() {
      return this.$store.getters[`${this.routePrefix}/${this.routePrefix}`];
    },
    collection() {
      return this.$store.getters[`${this.routePrefix}/collection`];
    },
    totalPages() {
      return this.$store.getters[`${this.routePrefix}/totalPages`];
    },
    totalItems() {
      return this.$store.getters[`${this.routePrefix}/totalItems`];
    },
    currentPage() {
      return this.$store.getters[`${this.routePrefix}/currentPage`];
    },
    titles() {
      const { name } = this.$route;
      switch (name) {
        case `user-view`: {
          return [
            { key: `fullName`, title: `name` },
            { key: `userRole`, title: `type` }
          ];
        }
        case `template-view`:
        case `lesson-view`:
        case `unit-view`:
        case `element-view`:
        case `criteria-view`:
        case `course-start`:
          return [{ key: `name`, title: `title` }];
        case `course-view`:
          return [
            { key: `name`, title: `title` },
            { key: `studentFullName`, title: `student` }
          ];
        default:
          return null;
      }
    },
    courseList() {
      return this.$store.getters[`course/courseList`];
    },
    error() {
      return this.$store.getters[`error`];
    }
  },
  watch: {
    $route: {
      handler: async function(to, from) {
        this.menu.visible = false;

        if (from) {
          if (to.name === from.name && !this.$route.name.includes(`view`))
            return;
          try {
            await this.load({ page: 0, ...this.$route.params });
          } catch (error) {
            throw new Error(`${error}`);
          }
          return;
        }

        try {
          await this.load({ page: 0 });
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
      immediate: true
    },
    error(message) {
      this.$notify({
        group: "notification",
        type: "error",
        title: `${message}`,
        duration: 1000,
        speed: 1000
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-view {
  display: flex;
  border-radius: $base-border-radius;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: relative;
}

.user-view-header {
  display: flex;
  position: relative;
  background-color: $secondary-color;
  align-items: center;
  padding-left: 2em;
  padding-right: 2em;
  height: 10vh;
}

.user-view-header__navigation {
  top: 10vh;
  left: 0;
  height: 90vh;
}

.user-view-header__title {
  text-indent: 0.5em;
}

.user-view-content {
  display: flex;
  margin: auto;
  height: 60vh;
  width: 55vw;
}

.user-view-footer {
  display: flex;
  flex-wrap: wrap;
  padding-left: 2em;
  padding-right: 2em;
  flex-direction: row-reverse;
  align-items: center;
  height: 10vh;
}

.crumb {
  color: black;
  height: 100%;
  width: 100%;
}
</style>
