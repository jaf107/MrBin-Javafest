import axios from "axios";

const fetcher = async (url, method, body, options = {}) => {
  let data;
  method = method.toUpperCase();
  if (method === "GET") {
    data = await getReq(url, options);
  } else if (method === "POST") {
    data = await postReq(url, body, options);
  } else if (method === "PUT") {
    data = await putReq(url, body, options);
  } else if (method === "DELETE") {
    data = await deleteReq(url, options);
  }
  return data;
};

const getAuthorizationHeaderConfig = (options) => {
  const session = JSON.parse(localStorage.getItem("user_session"));
  let config = session
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.tokenType} ${session.accessToken}`,
        },
      }
    : null;

  if (config) {
    config.headers = Object.assign(config.headers, options);
  } else {
    config = {
      headers: {
        ...options,
      },
    };
  }
  return config;
};

const translateBody = (body) => {
  if (body instanceof FormData) {
    return Object.fromEntries(body.entries());
  } else {
    return body;
  }
};

const getReq = async (url, options) => {
  // console.log("in get req");
  const authConfig = getAuthorizationHeaderConfig(options);
  // console.log(authConfig);
  const { data } = await axios.get(url, authConfig);
  return data;
};

const postReq = async (url, body, options) => {
  const authConfig = getAuthorizationHeaderConfig(options);
  body = translateBody(body);
  const { data } = await axios.post(url, body, authConfig);
  return data;
};

const putReq = async (url, body, options) => {
  const authConfig = getAuthorizationHeaderConfig(options);
  body = translateBody(body);
  const { data } = await axios.put(url, body, authConfig);
  return data;
};

const deleteReq = async (url, options) => {
  const authConfig = getAuthorizationHeaderConfig(options);
  const { data } = await axios.delete(url, authConfig);
  return data;
};

export default fetcher;
