import React from 'react';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StoreProvider from './store/store';

const router=createBrowserRouter([{path:"/",element:<App/>}])
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <RouterProvider router={router}/>
  </StoreProvider>
);

reportWebVitals();
