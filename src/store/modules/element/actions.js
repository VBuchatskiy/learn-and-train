import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_ELEMENT_COLLECTION]: async (
    { commit, dispatch },
    { page, unitTemplateId } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getElementCollection({
        page,
        unitTemplateId
      });
      commit(MUTATIONS_TYPES.SET_ELEMENT_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_ELEMENT]: async (
    { dispatch, commit },
    { elementTemplateId } = {}
  ) => {
    try {
      const element = await api.getElement({ elementTemplateId });
      commit(MUTATIONS_TYPES.SET_ELEMENT, { element });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_ELEMENT]: async ({ dispatch }, { element = {} } = {}) => {
    try {
      await api.addElement({ ...element });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_ELEMENT]: async ({ dispatch }, { element = {} } = {}) => {
    try {
      await api.updateElement({ ...element });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_ELEMENT]: async (
    { dispatch },
    { elementTemplateId } = {}
  ) => {
    try {
      await api.deleteElement({ elementTemplateId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
