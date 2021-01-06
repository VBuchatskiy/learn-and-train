const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  template: ({ template }) => {
    return Object.keys(template).length ? template : null;
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
