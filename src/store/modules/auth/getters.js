const getters = {
  authorized: ({ token }) => !!token,
  status: ({ status }) => status
};

export default getters;
