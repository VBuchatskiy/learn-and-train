import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.LOAD_LESSON_COLLECTION]: async (
    { commit, dispatch },
    { page, courseTemplateId } = {}
  ) => {
    try {
      const {
        collection,
        totalItems,
        totalPages,
        currentPage
      } = await api.getLessonCollection({
        page,
        courseTemplateId
      });
      commit(MUTATIONS_TYPES.SET_LESSON_COLLECTION, { collection });
      commit(MUTATIONS_TYPES.SET_TOTAL_ITEMS, { totalItems });
      commit(MUTATIONS_TYPES.SET_TOTAL_PAGES, { totalPages });
      commit(MUTATIONS_TYPES.SET_CURRENT_PAGE, { currentPage });
    } catch (error) {
      dispatch(`error`, { error }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.GET_LESSON]: async (
    { dispatch, commit },
    { lessonTemplateId } = {}
  ) => {
    try {
      const lesson = await api.getLesson({ lessonTemplateId });
      commit(MUTATIONS_TYPES.SET_LESSON, { lesson });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.ADD_LESSON]: async ({ dispatch }, { lesson = {} } = {}) => {
    try {
      await api.addLesson({ ...lesson });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.EDIT_LESSON]: async ({ dispatch }, { lesson = {} } = {}) => {
    try {
      await api.updateLesson({ ...lesson });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  },
  [ACTION_TYPES.DELETE_LESSON]: async (
    { dispatch },
    { lessonTemplateId } = {}
  ) => {
    try {
      await api.deleteLesson({ lessonTemplateId });
    } catch (error) {
      dispatch(`error`, { error: error.message }, { root: true });
      throw new Error(`${error}`);
    }
  }
};

export default actions;
