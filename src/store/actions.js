import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";

const actions = {
  [ACTION_TYPES.SET_ERROR_MESSAGE]: async ({ commit }, { error }) => {
    commit(MUTATIONS_TYPES.SET_ERROR_MESSAGE, { error });
  }
};

export default actions;
