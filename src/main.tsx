import {useState,useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import privateRouter, { PrivateRouter } from "./router/private";
import publicRouter, { PublicRouter } from "./router/public";

import { Provider } from "react-redux";
import store from "./redux";

const Main = () => {
  const [router, setRouter] = useState<PrivateRouter | PublicRouter>(
    localStorage.getItem("APP_ROUTER") === "private"
      ? privateRouter
      : publicRouter
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "APP_ROUTER") {
        setRouter(e.newValue === "private" ? privateRouter : publicRouter);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Main />);
