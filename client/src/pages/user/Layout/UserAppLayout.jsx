import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';


function UserAppLayout(){
    return (
       <React.Fragment>
       <div>
       <Navbar />

                <Outlet />

       </div>
        </React.Fragment>
    );
}
export default UserAppLayout;