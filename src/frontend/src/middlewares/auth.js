export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.User.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      store.$api.auth.setAuthHeader();
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
