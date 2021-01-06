const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  element: ({ element }) => {
    return Object.keys(element).length ? element : null;
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
