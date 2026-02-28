import React from 'react';
import { motion } from 'framer-motion';
import {
    Target, Zap, ShieldCheck, Users,
    ArrowRight, CheckCircle2, Award,
    MessageSquare, Laptop, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI';
import AcademyNavbar from '../components/AcademyNavbar';

const MentorshipOverview = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="bg-bg-dark min-h-screen text-white font-inter">
            <AcademyNavbar />
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            Elevate Your <span className="text-gradient">Potential</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
                            A high-impact mentorship program tailored for individuals ready to master
                            complex technical domains through structured guidance and real-world application.
                        </p>
                        <Button onClick={() => navigate('/register')} className="h-16 px-12 text-xl font-bold">
                            Apply for the Next Cohort
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 bg-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PillarCard
                            icon={Target}
                            title="Structured Path"
                            desc="No more wandering through random tutorials. We provide a clear, proven roadmap from zero to professional proficiency."
                        />
                        <PillarCard
                            icon={MessageSquare}
                            title="1-on-1 Sessions"
                            desc="Direct access to your mentor to debug complex issues, review your code, and discuss career strategies."
                        />
                        <PillarCard
                            icon={Laptop}
                            title="Real-world Labs"
                            desc="Apply what you learn in secure, cloud-based laboratories that simulate enterprise environments."
                        />
                    </div>
                </div>
            </section>

            {/* Detailed Benefits */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeInUp}>
                            <h2 className="text-4xl font-bold mb-8 italic text-primary/80">"Education is not the learning of facts, but the training of the mind to think."</h2>
                            <div className="space-y-6">
                                <BenefitItem
                                    title="Personalized Feedback"
                                    desc="Every assignment and lab you complete is reviewed by an expert with actionable feedback."
                                />
                                <BenefitItem
                                    title="Industry Networking"
                                    desc="Gain access to a private community of high-performing peers and industry professionals."
                                />
                                <BenefitItem
                                    title="Certification of Mastery"
                                    desc="Receive a verifiable digital certificate upon successful completion of all program requirements."
                                />
                            </div>
                        </motion.div>
                        <div className="relative">
                            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[120px] -z-10" />
                            <Card className="bg-bg-card/50 border-white/10 backdrop-blur-xl p-8 relative">
                                <h3 className="text-2xl font-bold mb-6">Program Requirements</h3>
                                <ul className="space-y-4">
                                    <RequirementItem text="Minimum 10 hours commitment per week" />
                                    <RequirementItem text="Basic understanding of fundamental concepts" />
                                    <RequirementItem text="High motivation and willingness to solve complex problems" />
                                    <RequirementItem text="Positive contribution to the peer community" />
                                </ul>
                                <div className="mt-10 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                                    <p className="text-sm text-primary font-bold text-center">
                                        Admission is via application only.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-primary/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-4xl font-bold mb-8">Ready to take the first step?</h2>
                        <div className="flex justify-center gap-6">
                            <Button onClick={() => navigate('/register')} className="h-14 px-8">Apply Now</Button>
                            <Button variant="glass" onClick={() => navigate('/')} className="h-14 px-8">Back to Home</Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const PillarCard = ({ icon: Icon, title, desc }) => (
    <Card className="p-8 border-white/5 hover:border-primary/20 transition-all group">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
    </Card>
);

const BenefitItem = ({ title, desc }) => (
    <div className="flex gap-4">
        <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
        <div>
            <h4 className="font-bold mb-1">{title}</h4>
            <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
        </div>
    </div>
);

const RequirementItem = ({ text }) => (
    <li className="flex items-center gap-3 text-sm text-text-dim">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        {text}
    </li>
);

export default MentorshipOverview;
