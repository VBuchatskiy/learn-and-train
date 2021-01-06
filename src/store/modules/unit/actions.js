import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_UNIT_COLLECTION]: async (
    { commit, dispatch },
    { page, lessonTemplateId } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getUnitCollection({
        page,
        lessonTemplateId
      });
      commit(MUTATIONS_TYPES.SET_UNIT_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_UNIT]: async (
    { dispatch, commit },
    { unitTemplateId } = {}
  ) => {
    try {
      const unit = await api.getUnit({ unitTemplateId });
      commit(MUTATIONS_TYPES.SET_UNIT, { unit });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_UNIT]: async ({ dispatch }, { unit = {} } = {}) => {
    try {
      await api.addUnit({ ...unit });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_UNIT]: async ({ dispatch }, { unit = {} } = {}) => {
    try {
      await api.updateUnit({ ...unit });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_UNIT]: async ({ dispatch }, { unitTemplateId } = {}) => {
    try {
      await api.deleteUnit({ unitTemplateId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
