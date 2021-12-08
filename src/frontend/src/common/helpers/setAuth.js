export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("User/getMe");
};
