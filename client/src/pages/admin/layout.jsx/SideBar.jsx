import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  LayoutDashboard, Package, ShoppingCart,X, Users, Settings, User, LogOut,
  LogIn
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Login', href: '/admin/login', icon: LogIn },
];

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, Logoutuser } = useAuth();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleLogout = () => {
    Logoutuser();
    navigate('/admin/login');
  }

  return (
    // <aside className="w-64 h-full bg-white shadow-sm">
    //   <div className="p-4 text-xl font-bold text-gray-800">Admin Panel</div>
    //   <nav className="mt-4">
    //     {navigation.map((item) => {
    //       const Icon = item.icon;
    //       const isActive = location.pathname === item.href;

    //       return (
    //         <Link
    //           key={item.name}
    //           to={item.href}
    //           className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
    //             isActive
    //               ? 'bg-gray-900 text-white'
    //               : 'text-gray-700 hover:bg-gray-100'
    //           }`}
    //         >
    //           <Icon className="w-5 h-5 mr-3" />
    //           {item.name}
    //         </Link>
    //       );
    //     })}
    //             <div className="flex items-center gap-2">
    //       <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
    //         <span className="text-sm font-medium text-gray-700">{user?.name?.charAt(0) || 'A'}</span>
    //       </div>
    //       <button
    //         onClick={handleLogout}
    //         className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
    //       >
    //         <LogOut className="h-4 w-4 mr-1" />
    //         Logout
    //       </button>
    //     </div>
    //   </nav>
    // </aside>
    <>
     <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Sidebar</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</>
  );
}

export default SideBar;
