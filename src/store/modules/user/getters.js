const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  user: ({ user }) => {
    return user;
  },
  totalPages: ({ totalPages }) => {
    return totalPages;
  },
  totalItems: ({ totalItems }) => {
    return totalItems;
  },
  currentPage: ({ currentPage }) => {
    return currentPage;
  }
};

export default getters;
