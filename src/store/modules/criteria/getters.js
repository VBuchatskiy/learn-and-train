const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  criteria: ({ criteria }) => {
    return criteria;
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
