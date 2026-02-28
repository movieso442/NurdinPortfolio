import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { Button, Input, Card } from '../components/UI';

const LoginWithCoupon = () => {
    const [formData, setFormData] = useState({ loginId: '', password: '', couponCode: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await authApi.login(formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials and coupon.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="p-10 border-white/5 backdrop-blur-2xl bg-bg-card/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ShieldCheck size={120} />
                    </div>

                    <div className="text-center mb-10 relative z-10">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-3xl font-black mb-2">Academy Access</h2>
                        <p className="text-text-muted">Enter your account details. Students require an activation coupon.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                                <Input
                                    placeholder="Username or Email"
                                    className="pl-12 h-14"
                                    value={formData.loginId}
                                    onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="pl-12 h-14"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="relative">
                                <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                <Input
                                    placeholder="Activation Coupon"
                                    className="pl-12 h-14 border-primary/30 focus:border-primary"
                                    value={formData.couponCode}
                                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold group"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : (
                                <span className="flex items-center justify-center gap-2">
                                    Enter Platform <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-text-dim">
                        <p>Not approved yet? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/register')}>Apply for Mentorship</span></p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginWithCoupon;
