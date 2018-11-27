import axios from "axios";

const BASE_URL = "https://hidden-escarpment-81683.herokuapp.com/api";

export const getArticles = async topic => {
  // console.log(topic, "topic");
  if (topic) {
    const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
    return data;
  } else if (topic === undefined) {
    const { data } = await axios.get(`${BASE_URL}/articles`);
    return data;
  }
  // if (info === "id") {
  //   const { data } = await axios.get(`${BASE_URL}/articles/${info}`);
  //   return data;
  // }
};

export const getArticleById = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data;
};

export const getComments = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}/comments`);
  return data;
};
