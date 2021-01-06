import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import auth from "./modules/auth";
import user from "./modules/user";
import template from "./modules/template";
import lesson from "./modules/lesson";
import unit from "./modules/unit";
import element from "./modules/element";
import criteria from "./modules/criteria";
import course from "./modules/course";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    auth,
    user,
    template,
    lesson,
    unit,
    course,
    element,
    criteria
  }
});
