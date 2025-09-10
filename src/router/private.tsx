import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../pages/App/private";

const privateLoader = async () => {
  const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");

  if (!accessToken) {
    localStorage.setItem("APP_ROUTER", "public");
  }

  return false;
};

const privateRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={privateLoader}>
      <Route path="/" element={<App />} />
    </Route>
  ),
  {
    basename: process.env.NODE_ENV === 'production' ? '/zerodayone.in' : undefined
  }
);

export type PrivateRouter = typeof privateRouter;
export default privateRouter;
