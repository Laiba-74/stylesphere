import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import AdminAppLayout from './pages/admin/layout.jsx/AdminAppLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';

import UserAppLayout from './pages/user/Layout/UserAppLayout';
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';
import UserHome from './pages/user/UserHome';
import UserProducts from './pages/user/UserProducts';
import Cart from './pages/user/Cart';
import AdminProducts from './pages/admin/AdminProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

function App() {
  const router = createBrowserRouter([
    // User routes
    {
      path: "/",
      children: [
        { path: "login", element: <UserLogin /> },
        { path: "register", element: <UserRegister /> },
        {
          element: <UserAppLayout/>,
          children:[
            { path: "", element: <UserHome /> },
            { path: "products", element: <UserProducts /> },
            { path: "cart", element: <Cart />}
          ],
        },
      ],
    },

    // Admin routes
    {
      path: "/admin",
      children: [
        { path: "login", element: <AdminLogin /> },
        { path: "register", element: <AdminRegister /> },
        {
          element: <AdminAppLayout />,
          children:[
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "products", element: <AdminProducts /> },
            { path: "product/add", element: <AddProduct />},
            { path: "product/edit/:id", element: <EditProduct />}
          ],
        },
      ],
    },
  ]);

  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true }}
    />
    </>
  );
}

export default App;
