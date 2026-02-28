import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', ...props }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`glass glass-hover p-6 rounded-2xl ${className}`}
        {...props}
    >
        {children}
    </motion.div>
);

export const Input = ({ label, icon: Icon, className = '', error, ...props }) => (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
        {label && <label className="text-sm font-medium text-text-muted">{label}</label>}
        <div className="relative group">
            {Icon && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim transition-colors group-focus-within:text-primary">
                    <Icon size={20} />
                </span>
            )}
            <input
                className={`w-full bg-bg-card border border-border-glass rounded-xl px-4 py-3 text-white placeholder:text-text-dim outline-none focus:border-primary transition-all ${Icon ? 'pl-12' : ''} ${error ? 'border-red-500' : ''}`}
                {...props}
            />
        </div>
        {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
);

export const Button = ({ children, variant = 'primary', className = '', loading, ...props }) => {
    const variants = {
        primary: 'btn-primary',
        glass: 'btn-glass',
    };

    return (
        <button
            className={`${variants[variant]} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                </div>
            ) : children}
        </button>
    );
};
