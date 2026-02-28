import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Ticket, Info, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card } from '../components/UI';
import { authApi } from '../services/api';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        loginId: '', // Email or Username
        password: '',
        couponCode: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authApi.login(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed. Please check your credentials and coupon.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper min-h-screen flex items-center justify-center bg-bg-darker relative overflow-hidden px-4">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

            <Card className="w-full max-w-md relative z-10 border border-white/5 shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gradient">Academy Login</h1>
                    <p className="text-text-muted mt-2">Enter your credentials to access the platform.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                        label="Email or Username"
                        icon={Mail}
                        placeholder="john_doe or john@example.com"
                        value={formData.loginId}
                        required
                        onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                    />
                    <div className="relative">
                        <Input
                            label="Password"
                            icon={Lock}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[38px] text-text-dim hover:text-primary transition-colors h-10 flex items-center"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                        <Input
                            label="Registration Coupon"
                            icon={Ticket}
                            placeholder="12-CHAR-CODE"
                            value={formData.couponCode}
                            required
                            onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                        />
                        <p className="text-[10px] text-primary/70 mt-2 flex items-center gap-1">
                            <Info size={12} /> Issued via email after application approval.
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-400/10 border border-red-400/20 p-3 rounded-lg text-red-400 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button type="submit" className="w-full h-12" loading={loading}>
                        Enter Platform <LogIn size={18} className="ml-2 inline" />
                    </Button>

                    {/* DIRECT ADMIN BYPASS */}
                    <Button
                        type="button"
                        variant="glass"
                        className="w-full h-12 border-primary/50 text-tertiary mt-2"
                        onClick={() => {
                            localStorage.setItem('token', 'mock-admin-token');
                            localStorage.setItem('user', JSON.stringify({
                                id: 'admin-mock-id',
                                role: 'admin',
                                name: 'System Admin',
                                email: 'admin@nurdine.academy'
                            }));
                            navigate('/dashboard');
                        }}
                    >
                        Direct Admin Access (Debug)
                    </Button>
                </form>

                <p className="text-center text-sm text-text-dim mt-8">
                    New student? <Link to="/register" className="text-primary font-bold hover:underline">Apply for admission</Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;
