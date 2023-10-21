import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../pages/App/public";
import { landingLoader, LandingPage } from "../pages/Landing/public"; 

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
		<Route path="/" element={<LandingPage />} loader={landingLoader} />
  )
);

export type PublicRouter = typeof publicRouter;
export default publicRouter;
