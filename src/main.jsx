import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Router';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux'
import Store from './Components/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
