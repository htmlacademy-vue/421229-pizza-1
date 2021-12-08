import { setAuth } from "../common/helpers/setAuth";

export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.User.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
