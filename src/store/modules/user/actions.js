import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_USER_COLLECTION]: async (
    { commit, dispatch },
    { page } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getUserCollection({
        page
      });
      commit(MUTATIONS_TYPES.SET_USER_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_USER]: async ({ dispatch, commit }, { userId } = {}) => {
    try {
      const user = await api.getUser({ userId });
      commit(MUTATIONS_TYPES.SET_USER, { user });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_USER]: async ({ dispatch }, { user = {} } = {}) => {
    try {
      await api.addUser({ ...user });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_USER]: async ({ dispatch }, { user = {} } = {}) => {
    try {
      await api.updateUser({ ...user });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_USER]: async ({ dispatch }, { userId } = {}) => {
    try {
      await api.deleteUser({ userId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ASSIGN_INSTRUCTOR]: async (
    { dispatch },
    { user = {} } = {}
  ) => {
    try {
      await api.assignUserInstructor({ ...user });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
