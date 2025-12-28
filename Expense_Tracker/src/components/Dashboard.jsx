import React from 'react';
import {
    Bell,
    Settings,
    Plus,
    Search,
    Calendar,
    Filter,
    ArrowUpDown,
    MoreVertical,
    Utensils,
    Car,
    ShoppingBag,
    Zap,
    Film,
    Wallet,
    TrendingUp,
    TrendingDown,
    PlusCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const transactions = [
        { id: 1, category: 'Food', date: 'Oct 24, 2023', description: 'Lunch at Bistro', amount: '₹350.00', icon: Utensils, iconClass: 'food' },
        { id: 2, category: 'Transport', date: 'Oct 23, 2023', description: 'Uber Home', amount: '₹240.00', icon: Car, iconClass: 'transport' },
        { id: 3, category: 'Shopping', date: 'Oct 22, 2023', description: 'New Headphones', amount: '₹2,499.00', icon: ShoppingBag, iconClass: 'shopping' },
        { id: 4, category: 'Utilities', date: 'Oct 20, 2023', description: 'Electric Bill', amount: '₹1,250.00', icon: Zap, iconClass: 'utilities' },
        { id: 5, category: 'Entertainment', date: 'Oct 18, 2023', description: 'Netflix Subscription', amount: '₹649.00', icon: Film, iconClass: 'entertainment' },
    ];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <div className="logo-box">
                        <Wallet size={20} />
                    </div>
                    <h1>ExpenseTracker</h1>
                </div>
                <div className="header-right">
                    <button className="icon-btn"><Bell size={20} /></button>
                    <button className="icon-btn"><Settings size={20} /></button>
                    <div className="user-avatar">
                        <img src="https://ui-avatars.com/api/?name=User&background=ffccbc&color=fff" alt="User" />
                    </div>
                </div>
            </header>

            <main className="dashboard-grid">
                {/* Stats row */}
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Total Spent (Oct)</span>
                            <div className="stat-icon-bg"><TrendingDown size={18} /></div>
                        </div>
                        <div className="stat-value">₹18,450.00</div>
                        <div className="stat-badge positive">+12%</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Monthly Budget</span>
                            <div className="stat-icon-bg primary"><Wallet size={18} /></div>
                        </div>
                        <div className="stat-value">₹50,000.00</div>
                        <div className="stat-meta">37% used</div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: '37%' }}></div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <span className="stat-title">Remaining</span>
                            <div className="stat-icon-bg"><Wallet size={18} /></div>
                        </div>
                        <div className="stat-value">₹31,550.00</div>
                        <div className="stat-badge negative">-5%</div>
                    </div>
                </div>

                <div className="content-layout">
                    {/* Left Panel - Add Expense */}
                    <div className="add-expense-panel">
                        <div className="panel-header">
                            <div className="icon-rounded"><PlusCircle size={20} /></div>
                            <h2>Add Daily Expense</h2>
                        </div>

                        <div className="quick-entry">
                            <div className="label-with-icon">
                                <Zap size={14} className="bolt" />
                                <span>Quick Manual Entry</span>
                            </div>
                            <div className="quick-input-wrapper">
                                <input type="text" placeholder="e.g. breakfast 40 rs" />
                                <button className="quick-submit"><Plus size={18} /></button>
                            </div>
                            <p className="input-hint">Type item & price to auto-fill details below</p>
                        </div>

                        <div className="divider-text">
                            <span>OR ENTER DETAILS</span>
                        </div>

                        <form className="add-expense-form">
                            <div className="form-group">
                                <label>Amount (INR)</label>
                                <div className="input-with-symbol">
                                    <span>₹</span>
                                    <input type="text" defaultValue="0.00" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="date-input" />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select>
                                    <option>Select Category</option>
                                    <option>Food</option>
                                    <option>Transport</option>
                                    <option>Shopping</option>
                                    <option>Utilities</option>
                                    <option>Entertainment</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Details about the expense..."></textarea>
                            </div>

                            <button type="submit" className="save-btn">
                                <Plus size={18} />
                                Save Expense
                            </button>
                        </form>
                    </div>

                    {/* Right Panel - Transactions */}
                    <div className="transactions-panel">
                        <div className="table-actions">
                            <div className="search-wrapper">
                                <Search size={18} />
                                <input type="text" placeholder="Search transactions..." />
                            </div>
                            <div className="action-buttons">
                                <button className="filter-btn"><Calendar size={16} /> Last 30 Days</button>
                                <button className="filter-btn"><Filter size={16} /> Filter</button>
                                <button className="filter-btn"><ArrowUpDown size={16} /> Sort</button>
                            </div>
                        </div>

                        <div className="transactions-list-header">
                            <h2>Recent Transactions</h2>
                            <button className="view-all">View All</button>
                        </div>

                        <div className="table-container">
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>CATEGORY</th>
                                        <th>DATE</th>
                                        <th>DESCRIPTION</th>
                                        <th className="text-right">AMOUNT (INR)</th>
                                        <th className="text-center">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t) => (
                                        <tr key={t.id}>
                                            <td>
                                                <div className="category-cell">
                                                    <div className={`category-icon ${t.iconClass}`}>
                                                        <t.icon size={16} />
                                                    </div>
                                                    <span>{t.category}</span>
                                                </div>
                                            </td>
                                            <td>{t.date}</td>
                                            <td>{t.description}</td>
                                            <td className="text-right amount-val">{t.amount}</td>
                                            <td className="text-center">
                                                <button className="action-btn-more"><MoreVertical size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="table-footer">
                            <span>Showing 1-5 of 45 transactions</span>
                            <div className="pagination-btns">
                                <button disabled>Previous</button>
                                <button>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
