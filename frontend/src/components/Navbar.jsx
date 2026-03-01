import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isDashboard = location.pathname.includes('/owner_dashbord') || location.pathname.includes('/admin') || location.pathname.includes('/complaints/');

    return (
        <nav className="navbar" style={isDashboard ? { justifyContent: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' } : {}}>
            <div className="navbar-container" style={isDashboard ? { width: '100%', justifyContent: 'center' } : {}}>
                <NavLink
                    to={isDashboard ? "/owner_dashbord" : "/"}
                    className="navbar-brand"
                    style={isDashboard ? {
                        fontSize: '1.5rem',
                        letterSpacing: '1px',
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'uppercase'
                    } : {}}
                >
                    KARTHIK ELECTRICAL
                </NavLink>

                {!isDashboard && (
                    <div className="navbar-nav">
                        <NavLink
                            to="/raise-complaint"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Raise Complaint
                        </NavLink>
                        <NavLink
                            to="/owner_dashbord"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            Owner Dashboard
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
