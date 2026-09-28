import { createBrowserRouter } from "react-router";
import Home from "./Pages/Home";
import RootLayout from "./RootLayout";
import ShopByCategory from "./Components/ShopByCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import SearchResults from "./Pages/SearchResults";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import MyAccount from "./Pages/MyAccount";


export const router = createBrowserRouter([
    {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "ShopByCategory", Component: ShopByCategory },
      { path: "productDetails/:id", Component: ProductDetails },
      { path: "cartPage", Component: Cart },
      { path: "wishlist", Component: Wishlist },
      { path: "search", Component: SearchResults },
      { path: "contact", Component: Contact },
      { path: "about", Component: About },
      { path: "signup", Component: SignUp },
      { path: "login", Component: SignUp },
      { path: "account", Component: MyAccount },
    ],
  },
]);