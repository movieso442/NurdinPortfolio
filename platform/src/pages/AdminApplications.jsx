import React, { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, Clock, Search,
    Filter, MoreVertical, Eye, Mail,
    Calendar, User, BookOpen, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { applicationApi } from '../services/api';
import { Card, Button, Input } from '../components/UI';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await applicationApi.getAll();
            setApplications(response.data);
        } catch (err) {
            console.error('Failed to fetch applications', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action, reason = '') => {
        try {
            if (action === 'APPROVE') {
                await applicationApi.approve(id, { expiryDays: 30 });
            } else {
                await applicationApi.reject(id, { reason });
            }
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            alert(`${action} failed`);
        }
    };

    const filteredApps = applications.filter(app => {
        const matchesFilter = filter === 'ALL' || app.application_status === filter;
        const fullName = `${app.first_name} ${app.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Student Applications</h2>
                    <p className="text-text-muted text-sm">Review and manage new student admissions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary transition-all w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary transition-all"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />)
                ) : filteredApps.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <User className="mx-auto text-text-dim mb-4" size={48} />
                        <p className="text-text-muted">No applications found matching your criteria.</p>
                    </div>
                ) : (
                    filteredApps.map(app => (
                        <Card key={app.id} className="hover:border-white/20 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                        {app.first_name[0]}{app.last_name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{app.first_name} {app.last_name}</h4>
                                        <div className="flex items-center gap-3 text-xs text-text-dim mt-1">
                                            <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {app.country || 'N/A'}</span>
                                            <span className="flex items-center gap-1"><Clock size={12} /> {new Date(app.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StatusBadge status={app.application_status} />
                                    <Button variant="glass" size="sm" onClick={() => setSelectedApp(app)}>
                                        Review
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Application Detail Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedApp(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-bg-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                                            {selectedApp.first_name[0]}{selectedApp.last_name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">{selectedApp.first_name} {selectedApp.last_name}</h3>
                                            <p className="text-text-muted">{selectedApp.email} • {selectedApp.phone}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={selectedApp.application_status} />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h5 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                            <BookOpen size={14} /> Academic Profile
                                        </h5>
                                        <div className="space-y-2">
                                            <DetailItem label="Education" value={selectedApp.application_details?.education_level} />
                                            <DetailItem label="Exp Level" value={selectedApp.application_details?.experience_level} />
                                            <DetailItem label="Commitment" value={`${selectedApp.application_details?.commitment_hours} hrs/wk`} />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h5 className="text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                                            <Calendar size={14} /> Application Info
                                        </h5>
                                        <div className="space-y-2">
                                            <DetailItem label="Submitted" value={new Date(selectedApp.created_at).toLocaleDateString()} />
                                            <DetailItem label="Age" value={selectedApp.age} />
                                            <DetailItem label="Location" value={selectedApp.country} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="text-xs font-bold text-text-muted uppercase tracking-widest">Motivation & Goals</h5>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                        {selectedApp.application_details?.motivation || 'No motivation provided.'}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-white/5">
                                    {selectedApp.application_status === 'PENDING' ? (
                                        <>
                                            <Button
                                                className="flex-1 bg-primary hover:bg-primary-hover text-white"
                                                onClick={() => handleAction(selectedApp.id, 'APPROVE')}
                                            >
                                                Approve Application
                                            </Button>
                                            <Button
                                                variant="glass"
                                                className="flex-1 text-red-400 hover:bg-red-400/10"
                                                onClick={() => handleAction(selectedApp.id, 'REJECT')}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Button className="flex-1" variant="glass" onClick={() => setSelectedApp(null)}>
                                            Close Review
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const config = {
        PENDING: { color: 'text-yellow-400 bg-yellow-400/10', icon: Clock },
        APPROVED: { color: 'text-green-400 bg-green-400/10', icon: CheckCircle },
        REJECTED: { color: 'text-red-400 bg-red-400/10', icon: XCircle },
    }[status] || { color: 'text-text-dim bg-white/5', icon: Clock };

    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.color}`}>
            <Icon size={12} /> {status}
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-text-dim">{label}</span>
        <span className="font-medium">{value || 'N/A'}</span>
    </div>
);

export default AdminApplications;
