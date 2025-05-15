import axios from "axios";

const API_KEY = "G9MfGOj4_tiPvkoQycOWROoWNweM4biyC3W4ZQTmOhg";
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImagesWithTopic = async (topic, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: topic,
      per_page: 12,
      page: page,
      client_id: API_KEY,
    },
  });
  return {
    images: response.data.results,
    loadMore: response.data.total_pages > page,
  };
};
