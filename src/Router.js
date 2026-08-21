import { createBrowserRouter } from "react-router";
import Home from "./Pages/Home";
import RootLayout from "./RootLayout";
import ShopByCategory from "./Components/ShopByCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";


export const router = createBrowserRouter([
    {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "ShopByCategory", Component: ShopByCategory },
      { path: "productDetails/:id", Component: ProductDetails },
      { path: "cartPage", Component: Cart },
    ],
  },
]);