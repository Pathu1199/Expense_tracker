import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Signup failed');
            }

            alert("Account created! Please sign in.");
            navigate('/login');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            {/* Same Navigation Header as Login */}
            <nav className="auth-nav">
                <div className="brand">
                    <div className="brand-logo">✦</div>
                    <span className="brand-name">MoneyWise</span>
                </div>
                <button className="contact-support">Contact Support</button>
            </nav>

            <main className="auth-main">
                {/* Left Section: Form */}
                <section className="auth-form-container">
                    <div className="form-header">
                        <h1>Create Account</h1>
                        <p>Start your financial journey today.</p>
                    </div>

                    {error && <div className="error-banner">{error}</div>}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-box">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-box">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-box">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="main-submit-btn" disabled={loading} style={{ marginTop: '2rem' }}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                            {!loading && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            )}
                        </button>

                        <div className="form-divider">
                            <span>Or continue with</span>
                        </div>

                        <div className="social-row">
                            <button type="button" className="social-provider-btn">
                                <img src="https://www.google.com/favicon.ico" alt="Google" />
                                Google
                            </button>
                            <button type="button" className="social-provider-btn">
                                <span className="apple-logo"></span>
                                Apple
                            </button>
                        </div>

                        <p className="footer-link">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </section>

                {/* Right Section: Visual UI Card (Reused from Login to be consistent) */}
                <section className="auth-visual-container">
                    <div className="glass-card">
                        <div className="card-mock-content">
                            <div className="transaction income">
                                <div className="icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                </div>
                                <div className="skeleton-lines">
                                    <div className="line-lg"></div>
                                    <div className="line-sm"></div>
                                </div>
                                <div className="price">+$1,250.00</div>
                            </div>

                            <div className="transaction expense">
                                <div className="icon-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                                </div>
                                <div className="skeleton-lines">
                                    <div className="line-lg"></div>
                                    <div className="line-sm"></div>
                                </div>
                                <div className="price">-$84.20</div>
                            </div>
                        </div>

                        <div className="card-info">
                            <h2>Track your growth</h2>
                            <p>Gain insights into your spending habits and watch your savings grow in real-time.</p>
                        </div>

                        <div className="carousel-dots">
                            <div className="dot active"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Signup;
