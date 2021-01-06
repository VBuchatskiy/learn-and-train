const getters = {
  collection: ({ collection }) => {
    return collection.length ? collection : null;
  },
  course: ({ course }) => {
    return course;
  },
  totalPages: ({ totalPages }) => {
    return totalPages;
  },
  totalItems: ({ totalItems }) => {
    return totalItems;
  },
  currentPage: ({ currentPage }) => {
    return currentPage;
  },
  courseList: ({ list }) => {
    return list;
  }
};

export default getters;
