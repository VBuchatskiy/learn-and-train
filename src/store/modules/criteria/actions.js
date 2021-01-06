import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_CRITERIA_COLLECTION]: async (
    { commit, dispatch },
    { page, elementTemplateId } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getCriteriaCollection({
        page,
        elementTemplateId
      });
      commit(MUTATIONS_TYPES.SET_CRITERIA_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_CRITERIA]: async (
    { dispatch, commit },
    { criteriaTemplateId } = {}
  ) => {
    try {
      const criteria = await api.getCriteria({ criteriaTemplateId });
      commit(MUTATIONS_TYPES.SET_CRITERIA, { criteria });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_CRITERIA]: async ({ dispatch }, { criteria = {} } = {}) => {
    try {
      await api.addCriteria({ ...criteria });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_CRITERIA]: async (
    { dispatch },
    { criteria = {} } = {}
  ) => {
    try {
      await api.updateCriteria({ ...criteria });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_CRITERIA]: async (
    { dispatch },
    { criteriaTemplateId } = {}
  ) => {
    try {
      await api.deleteCriteria({ criteriaTemplateId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
