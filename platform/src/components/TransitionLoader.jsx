import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const TransitionLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-bg-dark flex flex-col items-center justify-center p-6"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8 p-6 bg-primary/10 rounded-3xl border border-primary/20 text-primary"
            >
                <GraduationCap size={64} className="animate-pulse" />
            </motion.div>

            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Accessing Academy Portal</h2>
            <p className="text-text-muted text-sm mb-12 uppercase tracking-widest font-bold">Secure Environment Initialization</p>

            <div className="w-full max-w-xs h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
                />
            </div>

            <div className="mt-4 flex justify-between w-full max-w-xs text-[10px] font-bold text-text-dim uppercase tracking-tighter">
                <span>Loading Assets</span>
                <span>{progress}%</span>
            </div>
        </motion.div>
    );
};

export default TransitionLoader;
