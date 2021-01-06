import MUTATIONS_TYPES from "./mutations-types";

const mutations = {
  [MUTATIONS_TYPES.SET_ELEMENT_COLLECTION]: (state, { collection }) => {
    state.collection = collection;
  },
  [MUTATIONS_TYPES.SET_ELEMENT]: (state, { element }) => {
    state.element = element;
  },
  [MUTATIONS_TYPES.SET_TOTAL_ITEMS]: (state, { totalItems }) => {
    state.totalItems = totalItems;
  },
  [MUTATIONS_TYPES.SET_TOTAL_PAGES]: (state, { totalPages }) => {
    state.totalPages = totalPages;
  },
  [MUTATIONS_TYPES.SET_CURRENT_PAGE]: (state, { currentPage }) => {
    state.currentPage = currentPage;
  }
};

export default mutations;
