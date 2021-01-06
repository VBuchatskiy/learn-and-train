import MUTATIONS_TYPES from "./mutations-types";

const mutations = {
  [MUTATIONS_TYPES.AUTH_REQUEST]: (state, { status }) => {
    state.status = status;
  },
  [MUTATIONS_TYPES.AUTH_SUCCESS]: (state, { status, token }) => {
    state.status = status;
    state.token = token;
  },
  [MUTATIONS_TYPES.AUTH_REJECT]: (state, { status }) => {
    state.status = status;
  },
  [MUTATIONS_TYPES.LOG_OUT]: state => {
    state.token = ``;
  }
};

export default mutations;
