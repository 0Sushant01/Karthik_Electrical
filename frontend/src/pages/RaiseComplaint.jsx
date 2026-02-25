import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createComplaint } from '../api/complaints';
import { Send, CheckCircle, AlertCircle, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import AuthModals from '../components/AuthModals';

const RaiseComplaint = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        address: '',
        issue_category: '',
        issue_description: '',
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [showSplash, setShowSplash] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

    useEffect(() => {
        const phone = localStorage.getItem('userPhone');
        if (phone) {
            setIsLoggedIn(true);
            setFormData(prev => ({ ...prev, phone: phone }));
        }

        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // 3 seconds splash

        return () => clearTimeout(timer);
    }, []);

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
                phone: localStorage.getItem('userPhone') || '',
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
        <>
            {showSplash && (
                <div className={`splash-overlay ${!showSplash ? 'splash-exit' : ''}`}>
                    <h1 className="splash-logo">
                        {["Welcome", "to", "Karthik", "Electricals"].map((word, i) => (
                            <span key={i} className="word-wrapper">
                                <span className="animated-word" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h1>
                    <p className="splash-text slide-up" style={{ animationDelay: '0.8s' }}>
                        We are happy to assist you. Kindly fill the details below to continue.
                    </p>
                </div>
            )}

            <div className={`complaint-page ${!showSplash ? 'form-reveal' : ''}`} style={{ visibility: showSplash ? 'hidden' : 'visible' }}>
                {/* Premium Background Elements */}
                <div className="floating-element" style={{ width: '600px', height: '600px', top: '-15%', right: '-10%', animationDelay: '0s' }}></div>
                <div className="floating-element" style={{ width: '400px', height: '400px', bottom: '0%', left: '-5%', animationDelay: '-5s', background: 'rgba(59, 130, 246, 0.08)' }}></div>

                <div className="complaint-card">
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
                                disabled={isLoggedIn}
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

                        <div className="form-footer" style={{ marginTop: '32px' }}>
                            {isLoggedIn ? (
                                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', height: '56px', borderRadius: '16px' }}>
                                    {loading ? 'Submitting...' : (
                                        <>
                                            <Send size={20} />
                                            Submit Service Request
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="btn-group" style={{ display: 'flex', gap: '16px' }}>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        style={{ flex: 1, height: '56px', borderRadius: '16px' }}
                                        onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                                    >
                                        <LogIn size={20} />
                                        LOGIN
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-primary"
                                        style={{ flex: 1, height: '56px', borderRadius: '16px' }}
                                        onClick={() => setAuthModal({ isOpen: true, mode: 'register' })}
                                    >
                                        <UserPlus size={20} />
                                        REGISTER
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <AuthModals
                isOpen={authModal.isOpen}
                onClose={() => setAuthModal(prev => ({ ...prev, isOpen: false }))}
                initialMode={authModal.mode}
                onAuthSuccess={(user) => {
                    setIsLoggedIn(true);
                    setFormData(prev => ({ ...prev, phone: user.phone_number }));
                }}
            />
        </>
    );
};

export default RaiseComplaint;
