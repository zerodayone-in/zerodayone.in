import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { landingLoader, LandingPage } from "../pages/Landing/public"; 
//import { authLoader, AuthPage } from "../pages/Auth/public";

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
		<Route path="/" element={<LandingPage />} loader={landingLoader} />
		//<Route path="/auth" element={<AuthPage />} loader={authLoader} />
  )
);

export type PublicRouter = typeof publicRouter;
export default publicRouter;
