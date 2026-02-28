import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Clock, CheckCircle, XCircle,
    Search, Filter, ExternalLink, ChevronRight,
    User, Mail, Phone, Globe, Book, Github, MessageSquare
} from 'lucide-react';
import { applicationApi } from '../services/api';
import { Card, Button, Input } from '../components/UI';

const ApplicationPanel = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await applicationApi.getAll();
            setApplications(response.data);
        } catch (err) {
            console.error('Failed to fetch applications', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!confirm('Are you sure you want to approve this applicant? A coupon will be generated.')) return;
        setActionLoading(true);
        try {
            await applicationApi.approve(id, { expiryDays: 30 });
            alert('Applicant approved! Coupon issued.');
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            alert('Approval failed: ' + (err.response?.data?.error || err.message));
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Reason for rejection:');
        if (reason === null) return;
        setActionLoading(true);
        try {
            await applicationApi.reject(id, { reason });
            alert('Application rejected.');
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            alert('Rejection failed');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredApps = applications.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.username.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Users className="text-primary" /> Student Applications
                    <span className="text-sm font-normal text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {loading ? '...' : applications.length} Entries
                    </span>
                </h2>
                <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
                {/* List Section */}
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />)
                    ) : filteredApps.length === 0 ? (
                        <div className="text-center py-20 text-text-dim">No applications found.</div>
                    ) : (
                        filteredApps.map((app) => (
                            <div
                                key={app.id}
                                onClick={() => setSelectedApp(app)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedApp?.id === app.id ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            {app.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{app.name}</h4>
                                            <p className="text-sm text-text-muted">@{app.username}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${app.application_status === 'APPROVED' ? 'bg-accent/20 text-accent' :
                                            app.application_status === 'REJECTED' ? 'bg-red-400/20 text-red-400' :
                                                'bg-yellow-400/20 text-yellow-500'
                                        }`}>
                                        {app.application_status}
                                    </span>
                                </div>
                                <div className="mt-4 flex gap-4 text-xs text-text-dim">
                                    <span className="flex items-center gap-1"><Globe size={12} /> {app.country}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(app.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Detail Section */}
                <Card className="h-full border-white/5 bg-bg-card/50 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {selectedApp ? (
                            <motion.div
                                key={selectedApp.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedApp.name}</h3>
                                        <p className="text-text-muted">{selectedApp.email}</p>
                                    </div>
                                    {selectedApp.application_status === 'PENDING' && (
                                        <div className="flex gap-2">
                                            <button
                                                disabled={actionLoading}
                                                onClick={() => handleReject(selectedApp.id)}
                                                className="p-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-all"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                            <button
                                                disabled={actionLoading}
                                                onClick={() => handleApprove(selectedApp.id)}
                                                className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <DetailItem icon={Phone} label="Phone" value={selectedApp.phone} />
                                    <DetailItem icon={User} label="Age" value={selectedApp.age} />
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <h5 className="text-xs font-bold text-text-dim uppercase tracking-wider">Academic Background</h5>
                                    {selectedApp.application_details?.[0] ? (
                                        <div className="grid grid-cols-1 gap-4">
                                            <p className="text-sm font-medium">Education: <span className="text-text-muted font-normal">{selectedApp.application_details[0].highest_education}</span></p>
                                            <p className="text-sm font-medium">Occupation: <span className="text-text-muted font-normal">{selectedApp.application_details[0].occupation}</span></p>
                                            <p className="text-sm font-medium">Exp Level: <span className="text-text-muted font-normal">{selectedApp.application_details[0].experience_level}</span></p>
                                            {selectedApp.application_details[0].github_link && (
                                                <a href={selectedApp.application_details[0].github_link} target="_blank" rel="noreferrer" className="text-primary text-sm flex items-center gap-2 hover:underline">
                                                    <Github size={14} /> View GitHub <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    ) : <p className="text-sm text-text-dim">No details provided.</p>}
                                </div>

                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <h5 className="text-xs font-bold text-text-dim uppercase tracking-wider">Motivation & Goals</h5>
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-sm text-text-muted leading-relaxed">
                                            "{selectedApp.application_details?.[0]?.motivation || 'No motivation text provided.'}"
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                                            <span className="text-xs flex items-center gap-2"><Clock size={14} /> Weekly Commitment</span>
                                            <span className="font-bold text-primary">{selectedApp.application_details?.[0]?.commitment_hours || 0} hrs</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedApp.application_details?.[0]?.admin_notes && (
                                    <div className="p-4 rounded-xl bg-red-400/5 border border-red-400/10">
                                        <h5 className="text-xs font-bold text-red-400 mb-2">Rejection Note:</h5>
                                        <p className="text-sm text-text-muted">{selectedApp.application_details[0].admin_notes}</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10">
                                <MessageSquare size={48} className="text-white/5 mb-4" />
                                <h3 className="text-lg font-bold text-text-dim">Select an application</h3>
                                <p className="text-sm text-text-dim max-w-[200px] mx-auto">Click on a user profile to see their full application details and approve them.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 text-text-dim"><Icon size={16} /></div>
        <div>
            <p className="text-[10px] uppercase text-text-dim font-bold">{label}</p>
            <p className="text-sm font-medium">{value}</p>
        </div>
    </div>
);

export default ApplicationPanel;
