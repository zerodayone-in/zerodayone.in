import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../pages/App/public";

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes go here */}
    </Route>
  )
);

export type PublicRouter = typeof publicRouter;
export default publicRouter;
