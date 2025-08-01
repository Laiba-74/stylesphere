// import { useState } from 'react';
// import { Route, Routes, BrowserRouter } from "react-router-dom";
// import AddProduct from "./pages/AddProduct";
// import './App.css';
// import AdminDashboard from './pages/Dashboard';

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/admin/add-product" element={<AddProduct />} />
//         <Route path="/admin/" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/Dashboard';
function App() {
  const router = createBrowserRouter([
  
      // {
      //       path: '/register',
      //       element: <Register />
      //     },
         
       
          {
            path: "/admin/",
            element: <AdminLayout />,
            children: [
           {
            index: true,
            element: <AdminDashboard />
          },
        ]}
          
     
    
 ])
  return (
<RouterProvider
      router={router}
      future={{ v7_startTransition: true }} // Enable the future flag for v7_startTransition
    >  </RouterProvider>
  );
}

export default App;