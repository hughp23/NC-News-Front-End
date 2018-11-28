import axios from "axios";

const BASE_URL = "https://hidden-escarpment-81683.herokuapp.com/api";

export const getArticles = async topic => {
  console.log(topic, "topic api");
  if (topic) {
    const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
    return data;
  } else if (topic === undefined) {
    console.log(topic, "inside api call");
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

export const getUsers = async username => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const login = async username => {
  // console.log(username);
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  console.log(data);
  return data.user;
};

export const updateVote = async (dataType, id, change) => {
  const { data } = await axios.patch(
    `${BASE_URL}/${dataType}/${id}?votes=${change}`
  );
  return data;
};

export const addArticle = async (topic, dataToAdd) => {
  const { data } = await axios.post(
    `${BASE_URL}/topics/${topic}/articles`,
    dataToAdd
  );
  return data;
};

export const addComment = async (article_id, dataToAdd) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    dataToAdd
  );
  return data.article;
};
