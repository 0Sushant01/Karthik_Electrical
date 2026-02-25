import React, { useEffect, useState } from 'react';
import { getComplaints, updateComplaintStatus } from '../api/complaints';
import {
    BarChart3,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    MoreVertical,
    FileDown
} from 'lucide-react';

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await getComplaints();
            setComplaints(response.data);
        } catch (err) {
            console.error('Failed to fetch complaints:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateComplaintStatus(id, newStatus);
            setComplaints(complaints.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            ));
        } catch (err) {
            alert('Failed to update status.');
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Pending':
                return {
                    bg: '#fffbeb',
                    text: '#b45309',
                    border: '#fde68a',
                };
            case 'In Progress':
                return {
                    bg: '#eff6ff',
                    text: '#1d4ed8',
                    border: '#bfdbfe',
                };
            case 'Completed':
                return {
                    bg: '#f0fdf4',
                    text: '#15803d',
                    border: '#bbf7d0',
                };
            default:
                return {
                    bg: '#f8fafc',
                    text: '#64748b',
                    border: '#e2e8f0',
                };
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const matchesSearch =
            c.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm) ||
            c.issue_description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'All' || c.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
        completed: complaints.filter(c => c.status === 'Completed').length,
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="fade-in" style={{ color: 'var(--text-muted)' }}>Initializing Dashboard...</div>
        </div>
    );

    return (
        <div className="fade-in">
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Owner Dashboard</h1>
                    <p>Karthik Electrical Service Management</p>
                </div>
                <div className="dashboard-actions">
                    <button className="btn btn-outline" title="Export to CSV">
                        <FileDown size={18} />
                        <span>Export CSV</span>
                    </button>
                    <button className="btn btn-primary">
                        <BarChart3 size={18} />
                        <span>Reports</span>
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                        <BarChart3 size={20} />
                    </div>
                    <div className="stat-info">
                        <h3>Total Requests</h3>
                        <div className="value">{stats.total}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#fffbeb', color: '#f59e0b' }}>
                        <Clock size={20} />
                    </div>
                    <div className="stat-info">
                        <h3>Pending</h3>
                        <div className="value">{stats.pending}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
                        <AlertCircle size={20} />
                    </div>
                    <div className="stat-info">
                        <h3>In Progress</h3>
                        <div className="value">{stats.inProgress}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: '#f0fdf4', color: '#10b981' }}>
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="stat-info">
                        <h3>Completed</h3>
                        <div className="value">{stats.completed}</div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="card toolbar" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, phone or issue..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status:</span>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{ width: 'auto', marginBottom: 0, padding: '8px 12px' }}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Category</th>
                            <th>Contact</th>
                            <th>Issue</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredComplaints.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    No service requests found.
                                </td>
                            </tr>
                        ) : (
                            filteredComplaints.map((c) => {
                                const config = getStatusConfig(c.status);
                                return (
                                    <tr key={c.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{c.customer_name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.address}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                background: '#f8fafc',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                border: '1px solid #e2e8f0',
                                                color: '#475569',
                                                fontWeight: 500
                                            }}>
                                                {c.issue_category || 'Other'}
                                            </span>
                                        </td>
                                        <td>{c.phone}</td>
                                        <td style={{ maxWidth: '200px' }}>
                                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={c.issue_description}>
                                                {c.issue_description}
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={c.status}
                                                onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                                style={{
                                                    width: 'auto',
                                                    marginBottom: 0,
                                                    padding: '4px 8px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    border: `1px solid ${config.border}`,
                                                    backgroundColor: config.bg,
                                                    color: config.text,
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '0.8125rem' }}>{new Date(c.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
