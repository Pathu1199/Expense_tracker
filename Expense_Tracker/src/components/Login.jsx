import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, TrendingUp, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Login failed. Please check your credentials.');
            }

            console.log("Login successful", data);
            localStorage.setItem('token', data.access_token);

            // Redirect to dashboard (or home for now)
            navigate('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-viewport">
            <nav className="auth-navbar">
                <div className="brand-identity">
                    <span className="sparkle">✦</span>
                    <span className="brand-text">MoneyWise</span>
                </div>
                <button className="support-btn">Contact Support</button>
            </nav>

            <main className="auth-flex-container">
                {/* Left Form Section */}
                <section className="form-section">
                    <div className="header-text">
                        <h1>Welcome back</h1>
                        <p>Manage your wealth wisely.</p>
                    </div>

                    {error && <div className="error-message" style={{ color: '#ff5757', background: 'rgba(255, 87, 87, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(255, 87, 87, 0.2)' }}>{error}</div>}

                    <form className="compact-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Email / Username</label>
                            <div className="field-wrapper">
                                <Mail size={16} />
                                <input
                                    type="text"
                                    id="identifier"
                                    placeholder="user@example.com"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="field-wrapper">
                                <Lock size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', color: '#8b9a91' }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="utility-links">
                            <label className="checkbox-row">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn-sign-in" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
                        </button>

                        <div className="divider"><span>Or continue with</span></div>

                        <div className="social-grid">
                            <button type="button" className="social-btn">
                                <img src="https://www.google.com/favicon.ico" alt="" /> Google
                            </button>
                            <button type="button" className="social-btn">
                                 Apple
                            </button>
                        </div>

                        <p className="signup-text">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </section>

                {/* Right Visual Card */}
                <section className="visual-section">
                    <div className="feature-card-wrapper">
                        <div className="transaction-box">
                            <div className="trans-item green">
                                <div className="icon"><TrendingUp size={20} /></div>
                                <div className="lines"><div className="l1"></div><div className="l2"></div></div>
                                <span className="amt">+$1,250.00</span>
                            </div>
                            <div className="trans-item orange">
                                <div className="icon"><ShoppingCart size={20} /></div>
                                <div className="lines"><div className="l1"></div><div className="l2"></div></div>
                                <span className="amt">-$84.20</span>
                            </div>
                        </div>
                        <div className="feature-info">
                            <h2>Track your growth</h2>
                            <p>Gain insights into your spending habits and watch your savings grow in real-time.</p>
                        </div>
                        <div className="pagination">
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

export default Login;