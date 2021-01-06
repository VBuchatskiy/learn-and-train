import axios from "axios";
class Api {
  constructor({ host = `https://dev.checkandtrain.com` } = {}) {
    this.host = host;
    this.path = {
      auth: `api/auth/authenticate`
    };
  }

  async request({ method = `get`, path = ``, body = {} } = {}) {
    const token = `Bearer ${localStorage.getItem(`user-token`)}`;
    try {
      const { data } = await axios({
        method,
        url: `${this.host}/${path}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : ``
        },
        data: body
      });
      return data;
    } catch (error) {
      throw Error(error.response.data.data[`full_message`]);
    }
  }

  async auth({ email = ``, password = `` } = {}) {
    const { data } = await this.request({
      method: `post`,
      path: `api/auth/authenticate`,
      body: {
        email,
        password
      }
    });

    return data;
  }

  async getUserCollection({ page = 0, size = 7 } = {}) {
    const { data } = await this.request({
      method: `post`,
      path: `api/user/search`,
      body: {
        page,
        size
      }
    });

    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items.map(user => {
          Object.assign(user, {
            fullName: `${user.firstName}${user.lastName}`
          });
          return user;
        })
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: []
      };
    }
  }

  async getUser({ userId } = {}) {
    if (!userId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/user?userId=${userId}`
    });

    return data;
  }

  async deleteUser({ userId }) {
    if (!userId) throw Error(`missing mandatory param`);

    await this.request({
      method: `delete`,
      path: `api/user?userId=${userId}`
    });
  }

  async updateUser({
    userId,
    firstName = ``,
    lastName = ``,
    password = ``,
    email = ``,
    instructorId = ``
  } = {}) {
    if (!(userId || firstName || lastName || email))
      throw Error(`missing mandatory param`);

    await this.request({
      method: `put`,
      path: `api/user`,
      body: {
        userId,
        firstName,
        lastName,
        email,
        password,
        instructorId
      }
    });
  }

  async addUser({
    firstName = ``,
    lastName = ``,
    email = ``,
    password = ``,
    userRole = ``
  } = {}) {
    if (!(firstName || lastName || userRole || email || password))
      throw Error(`missing mandatory param`);

    await this.request({
      method: `post`,
      path: `api/user `,
      body: {
        email,
        firstName,
        lastName,
        password,
        userRole: userRole.toUpperCase()
      }
    });
  }

  async getTemplateCollection({ page = 0, size = 7 } = {}) {
    const { data } = await this.request({
      method: `post`,
      path: `api/course-template/search`,
      body: {
        page,
        size
      }
    });
    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: []
      };
    }
  }

  async getTemplate({ courseTemplateId } = {}) {
    if (!courseTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/course-template?courseTemplateId=${courseTemplateId}`
    });

    return data;
  }

  async addTemplate({ name = ``, description = `` }) {
    if (!(name, description)) throw Error(`missing mandatory param`);

    await this.request({
      method: `post`,
      path: `api/course-template`,
      body: {
        name,
        description
      }
    });
  }

  async updateTemplate({ courseTemplateId, description = ``, name = `` } = {}) {
    if (!(courseTemplateId, description, name))
      throw Error(`missing mandatory param`);

    await this.request({
      method: `put`,
      path: `api/course-template`,
      body: {
        courseTemplateId,
        name,
        description
      }
    });
  }

  async deleteTemplate({ courseTemplateId }) {
    if (!courseTemplateId) throw Error(`missing mandatory param`);

    await this.request({
      method: `delete`,
      path: `api/course-template?courseTemplateId=${courseTemplateId}`
    });
  }

  async getLessonCollection({ courseTemplateId, page = 0, size = 7 } = {}) {
    if (!courseTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `post`,
      path: `api/lesson-template/search`,
      body: {
        courseTemplateId,
        page,
        size
      }
    });
    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: {}
      };
    }
  }

  async getLesson({ lessonTemplateId } = {}) {
    if (!lessonTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/lesson-template?lessonTemplateId=${lessonTemplateId}`
    });

    return data;
  }

  async addLesson({ courseTemplateId, name = ``, orderNumber = `` }) {
    if (!courseTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `post`,
      path: `api/lesson-template`,
      body: {
        courseTemplateId,
        name,
        orderNumber
      }
    });
  }

  async updateLesson({ lessonTemplateId, name = ``, orderNumber = `` }) {
    if (!lessonTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `put`,
      path: `api/lesson-template`,
      body: {
        lessonTemplateId,
        name,
        orderNumber
      }
    });
  }

  async deleteLesson({ lessonTemplateId }) {
    if (!lessonTemplateId) throw Error(`missing mandatory param`);

    await this.request({
      method: `delete`,
      path: `api/lesson-template?lessonTemplateId=${lessonTemplateId}`
    });
  }

  async getUnitCollection({ lessonTemplateId, page = 0, size = 7 } = {}) {
    if (!lessonTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `post`,
      path: `api/unit-template/search`,
      body: {
        lessonTemplateId,
        page,
        size
      }
    });
    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: {}
      };
    }
  }

  async getUnit({ unitTemplateId } = {}) {
    if (!unitTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/unit-template?unitTemplateId=${unitTemplateId}`
    });

    return data;
  }

  async addUnit({ lessonTemplateId, name = ``, orderNumber = `` }) {
    if (!lessonTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `post`,
      path: `api/unit-template`,
      body: {
        lessonTemplateId,
        name,
        orderNumber
      }
    });
  }

  async updateUnit({ unitTemplateId, name = ``, orderNumber = `` }) {
    if (!unitTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `put`,
      path: `api/unit-template`,
      body: {
        unitTemplateId,
        name,
        orderNumber
      }
    });
  }

  async deleteUnit({ unitTemplateId }) {
    if (!unitTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `delete`,
      path: `api/unit-template?unitTemplateId=${unitTemplateId}`
    });
  }

  async getElementCollection({ unitTemplateId, page = 0, size = 7 } = {}) {
    if (!unitTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `post`,
      path: `api/element-template/search`,
      body: {
        unitTemplateId,
        page,
        size
      }
    });
    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: {}
      };
    }
  }

  async getElement({ elementTemplateId } = {}) {
    if (!elementTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/element-template?elementTemplateId=${elementTemplateId}`
    });

    return data;
  }

  async addElement({ unitTemplateId, name = ``, orderNumber = `` }) {
    if (!unitTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `post`,
      path: `api/element-template`,
      body: {
        unitTemplateId,
        name,
        orderNumber
      }
    });
  }

  async updateElement({ elementTemplateId, name = ``, orderNumber = `` }) {
    if (!elementTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `put`,
      path: `api/element-template`,
      body: {
        elementTemplateId,
        name,
        orderNumber
      }
    });
  }

  async deleteElement({ elementTemplateId }) {
    if (!elementTemplateId) throw Error(`missing mandatory param`);

    await this.request({
      method: `delete`,
      path: `api/element-template?elementTemplateId=${elementTemplateId}`
    });
  }

  async getCriteriaCollection({ elementTemplateId, page = 0, size = 7 } = {}) {
    if (!elementTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `post`,
      path: `api/criteria-template/search`,
      body: {
        elementTemplateId,
        page,
        size
      }
    });
    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: {}
      };
    }
  }

  async getCriteria({ criteriaTemplateId } = {}) {
    if (!criteriaTemplateId) throw Error(`missing mandatory param`);

    const { data } = await this.request({
      method: `get`,
      path: `api/criteria-template?criteriaTemplateId=${criteriaTemplateId}`
    });

    return data;
  }

  async addCriteria({ elementTemplateId, name = ``, orderNumber = `` }) {
    if (!elementTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `post`,
      path: `api/criteria-template`,
      body: {
        elementTemplateId,
        name,
        orderNumber
      }
    });
  }

  async updateCriteria({ criteriaTemplateId, name = ``, orderNumber = `` }) {
    if (!criteriaTemplateId) throw Error(`missing mandatory param`);
    await this.request({
      method: `put`,
      path: `api/criteria-template`,
      body: {
        criteriaTemplateId,
        name,
        orderNumber
      }
    });
  }

  async deleteCriteria({ criteriaTemplateId }) {
    if (!criteriaTemplateId) throw Error(`missing mandatory param`);

    await this.request({
      method: `delete`,
      path: `api/criteria-template?criteriaTemplateId=${criteriaTemplateId}`
    });
  }

  async getCourseCollection({ page = 0, size = 7 } = {}) {
    const { data } = await this.request({
      method: `post`,
      path: `api/course/search`,
      body: {
        page,
        size
      }
    });

    if (data) {
      return {
        totalItems: data["total_items"],
        totalPages: data["total_pages"],
        currentPage: data["current_page"],
        collection: data.items.map(course => {
          Object.assign(course, {
            studentFullName: `${course.studentFirstName}${course.studentLastName}`
          });
          return course;
        })
      };
    } else {
      return {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        collection: {}
      };
    }
  }
}

const api = new Api();

export { api };
