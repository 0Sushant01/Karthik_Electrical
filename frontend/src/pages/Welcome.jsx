import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Phone } from 'lucide-react';

const Welcome = () => {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (phone.length >= 10) {
            // In a real app, we'd verify with backend. 
            // For now, we'll store the phone and redirect.
            localStorage.setItem('userPhone', phone);
            // Redirect to dashboard or complaint page as "Existing User"
            navigate('/dashboard');
        } else {
            alert('Please enter a valid phone number');
        }
    };

    return (
        <div className="welcome-page">
            {/* Premium Background Elements */}
            <div className="floating-element" style={{ width: '400px', height: '400px', top: '-10%', right: '-5%', animationDelay: '0s' }}></div>
            <div className="floating-element" style={{ width: '300px', height: '300px', bottom: '5%', left: '-10%', animationDelay: '-5s' }}></div>
            <div className="floating-element" style={{ width: '200px', height: '200px', top: '20%', left: '20%', background: 'rgba(37, 99, 235, 0.05)', animationDelay: '-2s' }}></div>

            <div className="welcome-marquee">
                <div className="marquee-content">
                    We undertake all kinds of electrical sales and service • Quality Work • Trusted Professionals • 24/7 Support • We undertake all kinds of electrical sales and service • Quality Work • Trusted Professionals • 24/7 Support
                </div>
            </div>

            <div className="welcome-content fade-in">
                <h1 className="welcome-headline">
                    {["Welcome", "to", "Karthik", "Electricals"].map((word, i) => (
                        <span key={i} className="word-wrapper">
                            <span className="animated-word" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                <div className="welcome-card slide-up" style={{ animationDelay: '0.8s' }}>
                    <p className="welcome-instruction">We are happy to assist you. Kindly fill the details below to continue.</p>

                    <div className="welcome-actions">
                        <section className="register-section">
                            <h3>New user?</h3>
                            <Link to="/raise-complaint" className="btn-register" style={{ position: 'relative', overflow: 'hidden' }}>
                                <UserPlus size={20} style={{ marginRight: '10px' }} />
                                REGISTER
                            </Link>
                        </section>

                        <section className="login-section">
                            <h3>Existing User</h3>
                            <form onSubmit={handleLogin} className="phone-input-group">
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Phone size={18} style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#718096',
                                        zIndex: 2
                                    }} />
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{
                                            paddingLeft: '40px',
                                            background: 'rgba(255, 255, 255, 0.5)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(37, 99, 235, 0.2)'
                                        }}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary" style={{
                                    borderRadius: '12px',
                                    height: '48px',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                                }}>
                                    <LogIn size={18} />
                                    LOGIN
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
