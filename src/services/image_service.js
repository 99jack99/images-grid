import api from "./api";

export default {
  get_images(page, limit) {
    return api().get(`?page=${page}&limit=${limit}`);
  },
};