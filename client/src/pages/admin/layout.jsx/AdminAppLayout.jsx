// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './Header';
// import SideBar from './SideBar';

// function AdminAppLayout() {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar (fixed width) */}
//       <SideBar />

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col">
//         {/* Header at the top of main area */}
//         <Header />

//         {/* Page content below the header */}
//         <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminAppLayout;


import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import SideBar from './SideBar';
import Header from './Header';

function AdminAppLayout () {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin-panel/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin-panel/products', icon: Package },
    { name: 'Orders', href: '/admin-panel/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin-panel/users', icon: Users },
    { name: 'Profile', href: '/admin-panel/profile', icon: User },
    { name: 'Settings', href: '/admin-panel/settings', icon: Settings },
  ];



  return (
    <div className="min-h-screen bg-gray-100">
    <SideBar/>
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Top bar */}
        <Header/>

        {/* Page content */}
        <main className="flex-1">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminAppLayout;