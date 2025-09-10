import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { pushContent } from "../redux/loader/reducer";
import { LandingPage } from "../pages/Landing/public"; 
import store from "../redux";
import { setActiveRoute } from "../redux/global/reducer";

const publicRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<LandingPage />} loader={
			() => {
				store.dispatch(
					pushContent({
						content: "Reading state",
						progress: 0,
					})
				);
				store.dispatch(
					setActiveRoute("loading")
				);
				return null
			}
		}/>
	)
);

export type PublicRouter = typeof publicRouter;
export default publicRouter;
