/* eslint-disable prettier/prettier */
import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_COURSE_COLLECTION]: async (
    { commit },
    { page = 0 } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getCourseCollection({ page });
      commit(MUTATIONS_TYPES.SET_COURSE_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_COURSE]: async ({ state, commit }, { item } = {}) => {
    console.warn(state.list)
    const data = state.list.find((_item) => {
      return _item.courseId === item.courseId;
    });
    commit(MUTATIONS_TYPES.SET_COURSE, { item })
    console.warn(data);
  }
};

export default actions;
