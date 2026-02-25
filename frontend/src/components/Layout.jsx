import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
