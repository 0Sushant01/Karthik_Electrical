import React, { useState } from 'react';
import { createComplaint } from '../api/complaints';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const RaiseComplaint = () => {
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        address: '',
        issue_category: '',
        issue_description: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const issueCategories = [
        'Repair',
        'Installation',
        'Maintenance',
        'Wiring Issue',
        'Other'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await createComplaint(formData);
            setStatus('success');
            setFormData({
                customer_name: '',
                phone: '',
                address: '',
                issue_category: '',
                issue_description: '',
            });
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="complaint-page">
            <div className="complaint-card fade-in">
                <header>
                    <h1>Karthik Electrical</h1>
                    <div className="subtitle">Electrical Service & Repair</div>
                </header>

                {status === 'success' && (
                    <div style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        color: '#166534',
                        marginBottom: '18px',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <CheckCircle size={16} />
                        <span>Request submitted successfully!</span>
                    </div>
                )}

                {status === 'error' && (
                    <div style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fee2e2',
                        color: '#991b1b',
                        marginBottom: '18px',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AlertCircle size={16} />
                        <span>Error submitting request.</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="customer_name">Full Name</label>
                        <input
                            id="customer_name"
                            type="text"
                            name="customer_name"
                            placeholder="e.g., John Doe"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="Enter your contact number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Service Address</label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Address where service is needed"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="issue_category">Issue Category</label>
                        <select
                            id="issue_category"
                            name="issue_category"
                            value={formData.issue_category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Category --</option>
                            {issueCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="issue_description">Describe the problem</label>
                        <textarea
                            id="issue_description"
                            name="issue_description"
                            placeholder="Tell us what needs to be fixed..."
                            value={formData.issue_description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Service Request'}
                        {!loading && <Send size={18} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RaiseComplaint;
