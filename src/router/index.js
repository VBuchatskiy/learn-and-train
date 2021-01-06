import Vue from "vue";
import store from "../store";
import VueRouter from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import MainPage from "@/views/MainPage.vue";

const ifNotAuthorized = (to, from, next) => {
  if (!store.getters[`auth/authorized`]) {
    next();
    return;
  }
  next(process.env.BASE_URL);
};

const ifAuthorized = (to, from, next) => {
  if (store.getters[`auth/authorized`]) {
    next();
    return;
  }
  next("/login");
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/login`,
      name: `login`,
      component: LoginPage,
      beforeEnter: ifNotAuthorized,
      props: { title: `login` }
    },
    {
      path: `/users`,
      name: `user-view`,
      component: MainPage,
      beforeEnter: ifAuthorized,
      props: {
        title: `view-users`
      }
    },
    {
      path: `/users/user/add`,
      name: `user-add`,
      component: MainPage,
      props: { title: `add-user` }
    },
    {
      path: `/users/user/:userId/edit`,
      name: `user-edit`,
      component: MainPage,
      props: { title: `edit-user` }
    },
    {
      path: `/templates`,
      name: `template-view`,
      component: MainPage,
      props: {
        title: `course-templates`
      },
      meta: {
        breadcrumb() {
          return {
            to: `template-view`,
            title: `All Courses`
          };
        }
      }
    },
    {
      path: `/templates/template/add`,
      name: `template-add`,
      component: MainPage,
      props: {
        title: `add-course`
      },
      meta: {
        breadcrumb() {
          return {
            to: `template-add`,
            title: `Add Course`
          };
        }
      }
    },
    {
      path: `/templates/template/:courseTemplateId/edit`,
      name: `template-edit`,
      component: MainPage,
      props: {
        title: `edit-course`
      },
      meta: {
        breadcrumb() {
          return {
            to: `template-edit`,
            title: store.getters[`template/template`].name,
            courseTemplateId:
              store.getters[`template/template`].courseTemplateId
          };
        }
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lessons`,
      name: `lesson-view`,
      component: MainPage,
      props: {
        title: `lessons`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/add`,
      name: `lesson-add`,
      component: MainPage,
      props: {
        title: `add-lesson`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/edit`,
      name: `lesson-edit`,
      component: MainPage,
      props: {
        title: `edit-lesson`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/units`,
      name: `unit-view`,
      component: MainPage,
      props: {
        title: `units`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/add`,
      name: `unit-add`,
      component: MainPage,
      props: {
        title: `add unit`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/edit`,
      name: `unit-edit`,
      component: MainPage,
      props: {
        title: `edit unit`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/elements`,
      name: `element-view`,
      component: MainPage,
      props: {
        title: `elements`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/element/add`,
      name: `element-add`,
      component: MainPage,
      props: {
        title: `add element`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/element/:elementTemplateId/edit`,
      name: `element-edit`,
      component: MainPage,
      props: {
        title: `edit element`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/element/:elementTemplateId/criteria`,
      name: `criteria-view`,
      component: MainPage,
      props: {
        title: `criteria`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/element/:elementTemplateId/criteria/add`,
      name: `criteria-add`,
      component: MainPage,
      props: {
        title: `add criteria`
      }
    },
    {
      path: `/templates/template/:courseTemplateId/lesson/:lessonTemplateId/unit/:unitTemplateId/element/:elementTemplateId/criteria/:criteriaTemplateId/edit`,
      name: `criteria-edit`,
      component: MainPage,
      props: {
        title: `edit criteria`
      }
    },
    {
      path: `/courses`,
      name: `course-view`,
      component: MainPage,
      props: {
        title: `view-courses`
      }
    },
    {
      path: `/courses/course-start/assign-student`,
      name: `course-start`,
      component: MainPage,
      props: {
        title: `course-select`
      }
    }
  ]
});

export default router;
