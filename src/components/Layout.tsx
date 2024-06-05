import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
    return (
        <>
            <Navbar />
            <div className="left-navbar absolute bottom-0 right-0 top-0">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
