import axios from "axios";

const BASE_URL = "https://hidden-escarpment-81683.herokuapp.com/api";

export const getArticles = async info => {
  if (info === "topic") {
    const { data } = await axios.get(`${BASE_URL}/topics/${info}/articles`);
    return data;
  }
  if (info === "id") {
    const { data } = await axios.get(`${BASE_URL}/articles/${info}`);
    return data;
  } else {
    const { data } = await axios.get(`${BASE_URL}/articles`);
    return data;
  }
};

export const getArticleById = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data;
};
