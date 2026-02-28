import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './UI';

const AcademyNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Mentorship', path: '/mentorship' },
        { name: 'How It Works', path: '/#how-it-works' },
    ];

    const activeLinkClass = "text-primary font-bold";
    const idleLinkClass = "text-text-muted hover:text-white transition-colors";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${isScrolled ? 'py-4 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <GraduationCap size={24} />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">NURDINE<span className="text-primary">.ACADEMY</span></span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium uppercase tracking-widest ${location.pathname === link.path ? activeLinkClass : idleLinkClass}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="text-sm font-bold text-text-muted hover:text-white transition-colors mr-2">Login</Link>
                    <Button onClick={() => navigate('/register')} className="px-6 py-2.5 text-sm font-black">
                        Apply Now
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-bg-card border-b border-white/5 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-black ${location.pathname === link.path ? 'text-primary' : 'text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/5" />
                            <Link to="/login" className="text-xl font-bold text-text-muted">Login</Link>
                            <Button onClick={() => navigate('/register')} className="w-full h-14 text-lg font-black">
                                Apply for Mentorship
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default AcademyNavbar;
