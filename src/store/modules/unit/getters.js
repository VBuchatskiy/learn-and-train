const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  unit: ({ unit }) => {
    return unit;
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
