const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  lesson: ({ lesson }) => {
    return lesson;
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
