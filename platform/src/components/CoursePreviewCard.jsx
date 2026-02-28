import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, BookOpen, Users, X,
    CheckCircle2, Clock, PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from './UI';
import CurriculumAccordion from './CurriculumAccordion';

const CoursePreviewCard = ({ course }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mockModules = [
        {
            title: "Phase 1: Foundations",
            duration: "2h 45m",
            lessons: [
                { title: "Introduction to Industry Standards", duration: "15:00", type: "video" },
                { title: "Core Principles of the Platform", duration: "30:00", type: "video" },
                { title: "Setup and Environment Preparation", duration: "1:00:00", type: "text" },
            ]
        },
        {
            title: "Phase 2: Technical Deep-Dive",
            duration: "5h 20m",
            lessons: [
                { title: "Advanced Architecture Patterns", duration: "45:00", type: "video" },
                { title: "Secure Communication Protocols", duration: "1:15:00", type: "video" },
                { title: "Database Optimization & Scaling", duration: "1:30:00", type: "video" },
            ]
        },
        {
            title: "Phase 3: Final Lab & Review",
            duration: "4h 00m",
            lessons: [
                { title: "Mastering the Assessment Path", duration: "20:00", type: "video" },
                { title: "Final Hands-on Challenge", duration: "3:40:00", type: "text" },
            ]
        }
    ];

    return (
        <>
            <Card className="p-0 overflow-hidden border-white/10 hover:border-primary/30 transition-all group h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                    <img
                        src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-2 py-1 rounded bg-primary/80 text-white text-[10px] font-bold uppercase mb-2">
                            {course.level || 'Professional'}
                        </span>
                        <h4 className="text-lg font-bold text-white line-clamp-1">{course.title}</h4>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-text-muted mb-6 line-clamp-2">
                        {course.description || 'Master advanced technical concepts with a structured approach and expert guidance.'}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-xs text-text-dim font-medium">
                            <span className="flex items-center gap-1"><BookOpen size={14} /> 12 Modules</span>
                            <span className="flex items-center gap-1"><Users size={14} /> Limited seats</span>
                        </div>
                    </div>
                    <Button variant="glass" className="w-full mt-6 group/btn" onClick={() => setIsModalOpen(true)}>
                        Preview Details <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </Card>

            {/* Preview Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white z-10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left Side: Media & Title */}
                                <div className="h-64 lg:h-auto relative">
                                    <img
                                        src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent flex flex-col justify-end p-8">
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase mb-4 w-fit">
                                            {course.level || 'Professional Path'}
                                        </span>
                                        <h2 className="text-3xl font-black text-white mb-2">{course.title}</h2>
                                        <div className="flex items-center gap-4 text-xs text-text-muted">
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> 12.5 Hours Content</span>
                                            <span className="flex items-center gap-1.5"><PlayCircle size={14} className="text-accent" /> 24 Lessons</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Details & Curriculum */}
                                <div className="p-8 lg:p-12 overflow-y-auto max-h-[80vh]">
                                    <div className="space-y-8">
                                        <div>
                                            <h5 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Course Overview</h5>
                                            <p className="text-text-muted leading-relaxed">
                                                {course.description || 'This course provides a comprehensive deep-dive into advanced technical implementations. Designed for serious learners who want to master the craft through hands-on practice.'}
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-accent uppercase tracking-widest mb-4">What you'll achieve</h5>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3 text-sm text-text-dim">
                                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" />
                                                    Mastery of core architectural patterns and security principles.
                                                </li>
                                                <li className="flex items-start gap-3 text-sm text-text-dim">
                                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" />
                                                    Ability to design and deploy scalable, production-ready systems.
                                                </li>
                                                <li className="flex items-start gap-3 text-sm text-text-dim">
                                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" />
                                                    Direct feedback from your mentor on every module.
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Curriculum Preview</h5>
                                            <CurriculumAccordion modules={mockModules} />
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                                            <Button className="flex-1 h-14 font-black" onClick={() => navigate('/register')}>
                                                Apply to Enroll
                                            </Button>
                                            <Button variant="glass" className="flex-1 h-14" onClick={() => setIsModalOpen(false)}>
                                                Close Preview
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CoursePreviewCard;
