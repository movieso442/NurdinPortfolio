import React, { useState, useEffect } from 'react';
import {
    School, BookOpen, Bell, Users,
    ArrowRight, Star, Clock, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { institutionApi, courseApi } from '../services/api';
import { Card, Button } from '../components/UI';
import { useParams, useNavigate } from 'react-router-dom';

const InstitutionalPortal = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [portal, setPortal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPortal = async () => {
            try {
                const response = await institutionApi.getBySlug(slug);
                setPortal(response.data);
            } catch (err) {
                setError('Portal not found or access denied.');
            } finally {
                setLoading(false);
            }
        };
        fetchPortal();
    }, [slug]);

    if (loading) return <div className="h-full flex items-center justify-center animate-pulse text-primary"><School size={48} /></div>;
    if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

    return (
        <div className="space-y-10">
            {/* Portal Header */}
            <section className="relative h-64 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 z-10" />
                <div className="absolute inset-0 bg-bg-card opacity-50 backdrop-blur-sm" />
                <div className="relative z-20 h-full p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                            <School size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{portal.name}</h1>
                            <p className="text-white/70">Official Academic Portal</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portal Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Courses Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <BookOpen className="text-primary" /> Institutional Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portal.courses?.length > 0 ? (
                            portal.courses.map(course => (
                                <Card key={course.id} className="group hover:border-primary/30 transition-all">
                                    <div className="aspect-video rounded-xl bg-white/5 mb-4 overflow-hidden relative">
                                        <img
                                            src={course.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60'}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-primary/80 text-white text-[10px] font-bold rounded">Portal Only</div>
                                    </div>
                                    <h4 className="font-bold mb-1">{course.title}</h4>
                                    <p className="text-xs text-text-muted mb-4 line-clamp-2">{course.description}</p>
                                    <Button variant="glass" className="w-full group/btn" onClick={() => navigate(`/dashboard/courses/${course.id}`)}>
                                        Go to Course <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                No courses assigned to this portal yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Bell size={18} className="text-primary" /> Announcements
                        </h4>
                        <div className="space-y-4">
                            <AnnouncementItem
                                title="Platform Orientation"
                                date="Oct 12"
                                content="Welcome to your new digital learning environment..."
                            />
                            <AnnouncementItem
                                title="Final Exam Schedule"
                                date="Oct 10"
                                content="Check the calendar for your final assessment dates."
                            />
                        </div>
                    </Card>

                    <Card>
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Users size={18} className="text-accent" /> Academy Stats
                        </h4>
                        <div className="space-y-4">
                            <StatRow label="Active Students" value="45" icon={ShieldCheck} color="text-accent" />
                            <StatRow label="Completion Rate" value="82%" icon={Star} color="text-yellow-400" />
                            <StatRow label="Learning Hours" value="1,240" icon={Clock} color="text-primary" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const AnnouncementItem = ({ title, date, content }) => (
    <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
        <div className="flex justify-between items-center mb-1">
            <h5 className="text-sm font-bold">{title}</h5>
            <span className="text-[10px] text-text-dim">{date}</span>
        </div>
        <p className="text-xs text-text-muted line-clamp-1">{content}</p>
    </div>
);

const StatRow = ({ label, value, icon: Icon, color }) => (
    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
        <div className="flex items-center gap-2">
            <Icon size={16} className={color} />
            <span className="text-xs text-text-muted">{label}</span>
        </div>
        <span className="font-bold text-sm">{value}</span>
    </div>
);

export default InstitutionalPortal;
