// Setup config/headers and token
export const tokenConfig = (getState, params) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Params
  if (params) {
    config = {
      ...config,
      params: {
        ...params,
      },
    };
  }

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
