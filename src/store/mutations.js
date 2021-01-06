import MUTATIONS_TYPES from "./mutations-types";

const mutations = {
  [MUTATIONS_TYPES.SET_ERROR_MESSAGE]: (state, { error }) => {
    state.error = error;
  }
};

export default mutations;
