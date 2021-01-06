import ACTION_TYPES from "./actions-types";
import MUTATIONS_TYPES from "./mutations-types";
import { AUTH_STATUS } from "@/constants";
import { api } from "@/api";

const actions = {
  [ACTION_TYPES.AUTH_REQUEST]: async ({ commit }, { email, password }) => {
    commit(MUTATIONS_TYPES.AUTH_REQUEST, {
      status: AUTH_STATUS.REQUEST
    });
    try {
      const token = await api.auth({ email, password });
      commit(MUTATIONS_TYPES.AUTH_SUCCESS, {
        status: AUTH_STATUS.SUCCESS,
        token
      });
      localStorage.setItem(`user-token`, token);
    } catch (error) {
      localStorage.removeItem(`user-token`);
      commit(MUTATIONS_TYPES.AUTH_REQUEST, {
        status: AUTH_STATUS.REJECT,
        error
      });
    }
  },

  [ACTION_TYPES.LOG_OUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(MUTATIONS_TYPES.LOG_OUT);
      localStorage.removeItem(`user-token`);
      resolve();
    });
  }
};

export default actions;
