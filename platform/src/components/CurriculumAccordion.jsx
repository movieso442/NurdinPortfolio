import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlayCircle, FileText, Lock } from 'lucide-react';

const CurriculumAccordion = ({ modules }) => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="space-y-3">
            {modules.map((module, idx) => (
                <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden bg-white/5">
                    <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-all text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-white">{module.title}</h4>
                                <p className="text-[10px] text-text-dim uppercase font-bold tracking-tighter mt-1">
                                    {module.lessons.length} Lessons • {module.duration}
                                </p>
                            </div>
                        </div>
                        <ChevronDown
                            size={18}
                            className={`text-text-dim transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <AnimatePresence>
                        {openIndex === idx && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-4 pt-0 space-y-2">
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lIdx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 group border border-transparent hover:border-white/10 transition-all">
                                            <div className="flex items-center gap-3">
                                                {lesson.type === 'video' ? (
                                                    <PlayCircle size={14} className="text-primary" />
                                                ) : (
                                                    <FileText size={14} className="text-accent" />
                                                )}
                                                <span className="text-xs text-text-muted group-hover:text-white transition-colors">
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-text-dim">{lesson.duration}</span>
                                                <Lock size={12} className="text-text-dim/50" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default CurriculumAccordion;
