import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, BookOpen, GraduationCap, ShieldCheck,
    Zap, Target, Users, PlayCircle, ChevronRight,
    Star, CheckCircle2, Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI';
import CoursePreviewCard from '../components/CoursePreviewCard';
import AcademyNavbar from '../components/AcademyNavbar';
import { courseApi } from '../services/api';

const AcademyHome = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await courseApi.getAll();
                setCourses(res.data.slice(0, 3)); // Show top 3 for preview
            } catch (err) {
                console.error('Failed to fetch courses', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="bg-bg-dark min-h-screen text-white font-inter">
            <AcademyNavbar />
            {/* SECTION 1 — Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/20 to-transparent -z-10" />
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                            Structured Growth System
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            Structured Mentorship for <br />
                            <span className="text-gradient">Serious Learners</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                            A premium learning ecosystem designed to take you from a curious enthusiast to
                            a high-performing professional through structured paths and direct support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={() => navigate('/register')} className="h-14 px-8 text-lg font-bold group">
                                Apply Now <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="glass" onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 text-lg font-bold">
                                Browse Courses
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2 — How Mentorship Works */}
            <section id="how-it-works" className="py-24 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">How Mentorship Works</h2>
                        <p className="text-text-muted">Your path to mastering technical skills with professional guidance.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/5 -z-0" />

                        <StepCard
                            num="01"
                            icon={Users}
                            title="Apply"
                            desc="Submit your detailed application for selection."
                        />
                        <StepCard
                            num="02"
                            icon={ShieldCheck}
                            title="Approval"
                            desc="Admin reviews your profile for eligibility."
                        />
                        <StepCard
                            num="03"
                            icon={Zap}
                            title="Get Coupon"
                            desc="Receive your admission access coupon."
                        />
                        <StepCard
                            num="04"
                            icon={GraduationCap}
                            title="Learn"
                            desc="Access structured paths & labs."
                        />
                        <StepCard
                            num="05"
                            icon={Target}
                            title="Book Sessions"
                            desc="1-on-1 support for complex topics."
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 3 — What Makes This Different */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl font-bold mb-8 leading-tight">
                                Built for Proficiency, <br />
                                Not Just Completion.
                            </h2>
                            <div className="space-y-6">
                                <FeatureItem
                                    icon={PlayCircle}
                                    title="Progressive Unlocking"
                                    desc="Master one module before you can access the next. No skimming allowed."
                                />
                                <FeatureItem
                                    icon={CheckCircle2}
                                    title="Hands-on Labs"
                                    desc="Real-world technical challenges after every single module to test your skills."
                                />
                                <FeatureItem
                                    icon={Clock}
                                    title="Direct Access"
                                    desc="Regular interaction with your mentor to clear roadblocks and refine your career path."
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            className="relative group pr-4 pb-4"
                        >
                            <div className="absolute inset-4 bg-primary rounded-3xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                            <div className="bg-bg-card border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                                <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 text-primary">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Screening-Based Admission</h3>
                                <p className="text-text-muted leading-relaxed">
                                    Unlike traditional platforms, Nurdine Academy is a screened community.
                                    We prioritize students who are dedicated to a long-term technical journey.
                                    This ensures a high-quality environment for peer learning and focused mentorship.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — Browse Courses Preview */}
            <section id="courses" className="py-24 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Explore Our Paths</h2>
                            <p className="text-text-muted max-w-lg">
                                Each program is structured into modules, quizzes, and labs to ensure absolute mastery.
                            </p>
                        </div>
                        <Button variant="glass" onClick={() => navigate('/login')}>
                            View All Courses <ChevronRight size={18} className="ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-80 bg-white/5 rounded-3xl animate-pulse" />)
                        ) : (
                            courses.map(course => (
                                <CoursePreviewCard key={course.id} course={course} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-white/10 p-12 md:p-20 text-center relative overflow-hidden group">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-700" />
                        <motion.div {...fadeInUp} className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to start your growth?</h2>
                            <p className="text-xl text-text-muted max-w-xl mx-auto mb-12">
                                Join a community of dedicated learners and transform your technical career today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={() => navigate('/register')} className="h-16 px-12 text-xl font-black">
                                    Apply for Mentorship
                                </Button>
                                <Button variant="glass" onClick={() => navigate('/login')} className="h-16 px-12 text-xl font-black">
                                    Enroll in Course
                                </Button>
                            </div>
                        </motion.div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

const StepCard = ({ num, icon: Icon, title, desc }) => (
    <div className="relative z-10 flex flex-col items-center text-center p-6 group">
        <div className="w-16 h-16 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
            <Icon size={32} />
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-black text-white/5 -z-10 group-hover:text-primary/10 transition-colors">
            {num}
        </div>
        <h4 className="font-bold mb-2">{title}</h4>
        <p className="text-xs text-text-dim leading-relaxed">{desc}</p>
    </div>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
    <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="font-bold mb-1">{title}</h4>
            <p className="text-sm text-text-dim leading-relaxed">{desc}</p>
        </div>
    </div>
);


export default AcademyHome;
