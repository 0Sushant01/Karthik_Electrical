import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquarePlus, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { name: 'Raise Complaint', path: '/raise-complaint', icon: <MessageSquarePlus size={20} /> },
        { name: 'Owner Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>KARTHIK ELECTRICAL</h2>
                <button
                    className="mobile-only"
                    onClick={onClose}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'none' }}
                >
                    <X size={24} />
                </button>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={() => { if (window.innerWidth <= 1024) onClose(); }}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <style>{`
        @media (max-width: 1024px) {
          .mobile-only { display: block !important; }
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
