import axios from "axios";
import { FetchImagesResponse, Image } from "./types";

const API_KEY = "G9MfGOj4_tiPvkoQycOWROoWNweM4biyC3W4ZQTmOhg";
axios.defaults.baseURL = "https://api.unsplash.com/";


type Response = {
  results: Image[];
  total_pages: number;
};

export const fetchImagesWithTopic = async (
  topic: string,
  page: number
): Promise<FetchImagesResponse> => {
  const response = await axios.get<Response>("/search/photos", {
    params: {
      query: topic,
      per_page: 12,
      page,
      client_id: API_KEY,
    },
  });
  return {
    images: response.data.results,
    loadMore: response.data.total_pages > page,
  };
};
