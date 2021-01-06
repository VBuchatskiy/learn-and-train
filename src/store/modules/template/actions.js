import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_TEMPLATE_COLLECTION]: async (
    { commit, dispatch },
    { page } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getTemplateCollection({
        page
      });
      commit(MUTATIONS_TYPES.SET_TEMPLATE_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_TEMPLATE]: async (
    { dispatch, commit },
    { courseTemplateId } = {}
  ) => {
    try {
      const template = await api.getTemplate({ courseTemplateId });
      commit(MUTATIONS_TYPES.SET_TEMPLATE, { template });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_TEMPLATE]: async ({ dispatch }, { template = {} } = {}) => {
    try {
      await api.addTemplate({ ...template });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_TEMPLATE]: async (
    { dispatch },
    { template = {} } = {}
  ) => {
    try {
      await api.updateTemplate({ ...template });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_TEMPLATE]: async (
    { dispatch },
    { courseTemplateId } = {}
  ) => {
    try {
      await api.deleteTemplate({ courseTemplateId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
