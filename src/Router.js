import { createBrowserRouter } from "react-router";
import Home from "./Pages/Home";
import RootLayout from "./RootLayout";


export const router = createBrowserRouter([
    {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
    //   { path: "about", Component: About },
    ],
  },
]);