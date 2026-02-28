import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Lock, Phone, Globe, Calendar,
    BookOpen, Briefcase, Cpu, Signal, Heart,
    Target, Clock, CheckCircle, ArrowRight, ArrowLeft,
    Github, Info, Eye, EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Card } from '../components/UI';
import { authApi } from '../services/api';
import '../styles/signup.css';


const Register = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        personalInfo: {
            firstName: '', lastName: '', username: '',
            email: '', phone: '', age: '', country: '',
            password: '', confirmPassword: ''
        },
        academicInfo: {
            educationLevel: '',
            experienceLevel: 'Beginner',
            githubLink: '',
            previousTraining: ''
        },
        motivationInfo: {
            motivation: '',
            goals: '',
            commitmentHours: '',
            agreement: false
        }
    });

    const navigate = useNavigate();

    const updateFormData = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Basic validation before submission
        if (formData.personalInfo.password !== formData.personalInfo.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!formData.motivationInfo.agreement) {
            setError('Please agree to the terms');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Flatten the nested structure or ensure backend matches
            const payload = {
                ...formData.personalInfo,
                ...formData.academicInfo,
                ...formData.motivationInfo
            };

            await authApi.apply(payload);
            setStep(4); // Success step
        } catch (err) {
            setError(err.response?.data?.error || 'Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, title: 'Personal Information', desc: 'Basic details for your account', icon: 'person' },
        { id: 2, title: 'Academic Information', desc: 'Educational background', icon: 'history_edu' },
        { id: 3, title: 'Motivation & Commitment', desc: 'Your goals and motivation', icon: 'emoji_objects' }
    ];

    const getPasswordStrength = (pwd) => {
        if (!pwd) return { label: 'Empty', color: 'bg-slate-200', count: 0 };
        if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-400', count: 1 };
        if (pwd.length < 10) return { label: 'Medium', color: 'bg-yellow-400', count: 2 };
        return { label: 'Strong', color: 'bg-green-500', count: 4 };
    };

    const strength = getPasswordStrength(formData.personalInfo.password);

    return (
        <div className="signup-container min-h-screen flex flex-col md:flex-row overflow-hidden bg-background">
            {/* Left Side: Fixed Stepper Panel */}
            <aside className="stepper-panel md:w-1/3 lg:w-1/4 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 md:p-12 flex flex-col relative z-20">
                <div className="mb-8 md:mb-12 flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <span className="material-symbols-outlined text-2xl">school</span>
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Nurdine</h2>
                </div>

                <div className="flex md:flex-col gap-6 md:gap-10 relative flex-1 overflow-x-auto no-scrollbar md:overflow-visible pb-4 md:pb-0">
                    {/* Vertical Line - Hidden on Mobile */}
                    <div className="hidden md:block absolute left-[19px] top-5 bottom-5 w-[2px] bg-slate-100 -z-10" />

                    {steps.map((s, idx) => (
                        <div key={s.id} className={`flex items-start gap-3 md:gap-4 transition-all duration-300 min-w-max md:min-w-0 ${step === s.id ? 'opacity-100' : 'opacity-50'}`}>
                            <div className="relative flex flex-col items-center">
                                <div className={`z-10 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full transition-all duration-300 ${step > s.id ? 'bg-green-500 text-white' :
                                    step === s.id ? 'bg-primary text-white ring-2 md:ring-4 ring-primary/20' :
                                        'bg-white border-2 border-slate-200 text-slate-400'
                                    }`}>
                                    <span className="material-symbols-outlined text-base md:text-xl">
                                        {step > s.id ? 'check' : s.icon}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col pt-0.5 md:pt-1">
                                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${step === s.id ? 'text-primary' : 'text-slate-400'}`}>Step {s.id}</p>
                                <h3 className={`text-xs md:text-base font-bold whitespace-nowrap ${step === s.id ? 'text-slate-900' : 'text-slate-500'}`}>{step === s.id ? s.title : s.title.split(' ')[0]}</h3>
                                {step === s.id && <p className="hidden md:block text-xs text-slate-500 mt-1">{s.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block mt-auto pt-8 border-t border-slate-100">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <p className="text-xs font-bold text-primary mb-1">NEED HELP?</p>
                        <p className="text-xs text-slate-600">Our admissions team is here to guide you through the process.</p>
                        <a href="#" className="inline-block mt-2 text-xs font-bold text-primary hover:underline">Contact Support</a>
                    </div>
                </div>
            </aside>

            {/* Right Side: Form Content Panel */}
            <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-20 relative bg-slate-50/50">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Create your student profile</h1>
                                <p className="text-slate-500">Please provide your basic details to start your application.</p>
                            </div>

                            <Card className="bg-white p-8 md:p-10 shadow-sm border border-slate-200/60 rounded-2xl">
                                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="floating-label-group">
                                            <input
                                                type="text" id="firstName" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.firstName}
                                                onChange={e => updateFormData('personalInfo', 'firstName', e.target.value)}
                                            />
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                        <div className="floating-label-group">
                                            <input
                                                type="text" id="lastName" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.lastName}
                                                onChange={e => updateFormData('personalInfo', 'lastName', e.target.value)}
                                            />
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="floating-label-group">
                                            <input
                                                type="text" id="username" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.username}
                                                onChange={e => updateFormData('personalInfo', 'username', e.target.value)}
                                            />
                                            <label htmlFor="username">Username</label>
                                        </div>
                                        <div className="floating-label-group">
                                            <input
                                                type="email" id="email" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.email}
                                                onChange={e => updateFormData('personalInfo', 'email', e.target.value)}
                                            />
                                            <label htmlFor="email">Email Address</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-1 floating-label-group">
                                            <input
                                                type="tel" id="phone" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.phone}
                                                onChange={e => updateFormData('personalInfo', 'phone', e.target.value)}
                                            />
                                            <label htmlFor="phone">Phone</label>
                                        </div>
                                        <div className="md:col-span-1 floating-label-group">
                                            <input
                                                type="number" id="age" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.personalInfo.age}
                                                onChange={e => updateFormData('personalInfo', 'age', e.target.value)}
                                            />
                                            <label htmlFor="age">Age</label>
                                        </div>
                                        <div className="md:col-span-1">
                                            <select
                                                className="w-full h-[54px] px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-600"
                                                value={formData.personalInfo.country}
                                                onChange={e => updateFormData('personalInfo', 'country', e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Country</option>
                                                <option value="US">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                                <option value="NG">Nigeria</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                                        <div className="space-y-3">
                                            <div className="floating-label-group relative">
                                                <input
                                                    type={showPassword ? "text" : "password"} id="password" placeholder=" " required
                                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all pr-12"
                                                    value={formData.personalInfo.password}
                                                    onChange={e => updateFormData('personalInfo', 'password', e.target.value)}
                                                />
                                                <label htmlFor="password">Password</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {/* Password Strength Meter */}
                                            <div className="px-1">
                                                <div className="flex justify-between items-center mb-1.5">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Strength</span>
                                                    <span className={`text-[10px] font-bold uppercase ${strength.count > 1 ? 'text-primary' : 'text-slate-400'}`}>{strength.label}</span>
                                                </div>
                                                <div className="flex gap-1.5 h-1">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${strength.count >= i ? strength.color : 'bg-slate-100'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="floating-label-group relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder=" " required
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all pr-12"
                                                value={formData.personalInfo.confirmPassword}
                                                onChange={e => updateFormData('personalInfo', 'confirmPassword', e.target.value)}
                                            />
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6">
                                        <p className="text-sm text-slate-500">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link></p>
                                        <Button
                                            type="submit"
                                            className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 group"
                                        >
                                            Continue
                                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Educational Journey</h1>
                                <p className="text-slate-500">Accessing your technical readiness for the mentorship program.</p>
                            </div>

                            <Card className="bg-white p-8 md:p-10 shadow-sm border border-slate-200/60 rounded-2xl">
                                <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">school</span>
                                            Highest Level of Education
                                        </label>
                                        <select
                                            className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-slate-700"
                                            value={formData.academicInfo.educationLevel}
                                            onChange={e => updateFormData('academicInfo', 'educationLevel', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select your education level</option>
                                            <option>High School</option>
                                            <option>Bachelors Degree</option>
                                            <option>Masters Degree</option>
                                            <option>PhD / Doctorate</option>
                                            <option>Self-taught / Bootcamp</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
                                            Technical Experience Level
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                                                <div
                                                    key={level}
                                                    onClick={() => updateFormData('academicInfo', 'experienceLevel', level)}
                                                    className={`experience-card p-5 rounded-xl border-2 cursor-pointer transition-all ${formData.academicInfo.experienceLevel === level
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-slate-100 bg-white hover:border-primary/30'
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${formData.academicInfo.experienceLevel === level ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'
                                                        }`}>
                                                        <span className="material-symbols-outlined text-xl">
                                                            {level === 'Beginner' ? 'potted_plant' : level === 'Intermediate' ? 'rocket_launch' : 'diamond'}
                                                        </span>
                                                    </div>
                                                    <p className="font-bold text-slate-900 mb-1">{level}</p>
                                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                                        {level === 'Beginner' ? '0-1 years of experience' : level === 'Intermediate' ? '1-3 years of practical skills' : '3+ years professional work'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-4">
                                        <div className="floating-label-group">
                                            <input
                                                type="url" id="githubLink" placeholder=" "
                                                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                                value={formData.academicInfo.githubLink}
                                                onChange={e => updateFormData('academicInfo', 'githubLink', e.target.value)}
                                            />
                                            <label htmlFor="githubLink">Portfolio or GitHub Link (Optional)</label>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Previous Training / Certifications</label>
                                            <textarea
                                                className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none min-h-[100px]"
                                                placeholder="List any relevant bootcamps, courses, or specific certifications..."
                                                value={formData.academicInfo.previousTraining}
                                                onChange={e => updateFormData('academicInfo', 'previousTraining', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="px-8 py-3.5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                                        >
                                            Back
                                        </button>
                                        <Button
                                            type="submit"
                                            className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all"
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="mb-10">
                                <h1 className="text-3xl font-black text-slate-900 mb-2">Motivation & Commitment</h1>
                                <p className="text-slate-500">The Nurdine community is built on dedication. Help us understand your drive.</p>
                            </div>

                            <Card className="bg-white p-8 md:p-10 shadow-sm border border-slate-200/60 rounded-2xl">
                                <form className="space-y-10" onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <label className="block text-sm font-bold text-slate-700">
                                            Why do you want to join Nurdine Learning?
                                            <textarea
                                                required
                                                className="mt-3 w-full p-5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none min-h-[160px]"
                                                placeholder="Describe your intrinsic motivation and goals..."
                                                value={formData.motivationInfo.motivation}
                                                onChange={e => updateFormData('motivationInfo', 'motivation', e.target.value)}
                                            />
                                        </label>
                                        <div className="flex justify-between px-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <span>Serious and reflective tone</span>
                                            <span className={formData.motivationInfo.motivation.length > 500 ? 'text-red-400' : ''}>
                                                {formData.motivationInfo.motivation.length} / 1000 characters
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-sm font-bold text-slate-700">
                                            Your career goals for the next 3-5 years
                                            <textarea
                                                required
                                                className="mt-3 w-full p-5 rounded-2xl border border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all resize-none min-h-[120px]"
                                                placeholder="Where do you see yourself professionally?"
                                                value={formData.motivationInfo.goals}
                                                onChange={e => updateFormData('motivationInfo', 'goals', e.target.value)}
                                            />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                        <div className="space-y-3">
                                            <label className="block text-sm font-bold text-slate-700">
                                                Weekly Hours Commitment
                                                <div className="relative mt-3">
                                                    <input
                                                        type="number" required min="1" max="168"
                                                        className="w-full pl-5 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-primary"
                                                        placeholder="e.g. 15"
                                                        value={formData.motivationInfo.commitmentHours}
                                                        onChange={e => updateFormData('motivationInfo', 'commitmentHours', e.target.value)}
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">hrs/wk</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="pb-1.5 flex flex-col gap-4">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox" required
                                                    className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                                    checked={formData.motivationInfo.agreement}
                                                    onChange={e => updateFormData('motivationInfo', 'agreement', e.target.checked)}
                                                />
                                                <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                                                    I confirm my commitment to the program structure and weekly mentor sessions.
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg h-fit text-primary">
                                            <span className="material-symbols-outlined text-lg">info</span>
                                        </div>
                                        <p className="text-[11px] text-slate-600 leading-relaxed">
                                            By submitting, you acknowledge that this is a <strong>screened admission process</strong>. You will be notified of your application status within 2-3 business days.
                                        </p>
                                    </div>

                                    {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="px-8 py-3.5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                                        >
                                            Back
                                        </button>
                                        <Button
                                            type="submit"
                                            loading={loading}
                                            className="flex-1 max-w-[240px] bg-primary hover:bg-primary/90 text-white font-extrabold text-lg px-10 py-4 rounded-xl shadow-xl shadow-primary/30 transition-all"
                                        >
                                            Submit Application
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto flex flex-col items-center text-center py-10"
                        >
                            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-5xl font-bold">check_circle</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 mb-4">Application Submitted Successfully</h1>
                            <p className="text-slate-500 text-lg mb-12 max-w-md mx-auto">
                                Your application is under review. You will receive an email once your admission is approved.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Button className="min-w-[200px] h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
                                    Track Application Status
                                </Button>
                                <Link to="/" className="inline-block">
                                    <button className="min-w-[200px] h-14 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>

                            <p className="mt-12 text-sm text-slate-400">
                                Need help? <a href="#" className="text-primary font-bold hover:underline">Contact Admissions</a>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};


export default Register;
