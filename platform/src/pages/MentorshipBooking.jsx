import React, { useState, useEffect } from 'react';
import {
    Calendar, Clock, Video, MessageCircle,
    CheckCircle2, XCircle, ChevronRight, User,
    CalendarCheck, AlertCircle, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingApi, applicationApi } from '../services/api';
import { Card, Button, Input } from '../components/UI';

const MentorshipBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        mentorId: '',
        topic: '',
        scheduledAt: '',
        durationMinutes: 60
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [bookingRes, userRes] = await Promise.all([
                bookingApi.getAll(),
                isAdmin ? api.get('/auth/users?role=student') : api.get('/auth/users?role=admin')
            ]);
            setBookings(bookingRes.data);
            setMentors(userRes.data || []);
        } catch (err) {
            console.error('Failed to fetch mentorship data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await bookingApi.create(formData);
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            alert('Booking failed');
        }
    };

    const handleUpdateStatus = async (id, status, meetingLink = '') => {
        try {
            await bookingApi.updateStatus(id, { status, meetingLink });
            fetchData();
        } catch (err) {
            alert('Status update failed');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <CalendarCheck className="text-primary" /> Mentorship Sessions
                    </h2>
                    <p className="text-text-muted text-sm mt-1">
                        {isAdmin ? 'Manage your upcoming student consultations.' : 'Book 1-on-1 sessions with expert mentors.'}
                    </p>
                </div>
                {!isAdmin && (
                    <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
                        <Plus size={18} /> Book New Session
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Sessions */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Clock className="text-accent" size={18} /> Upcoming
                    </h3>

                    {loading ? (
                        [1, 2].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)
                    ) : bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl text-text-dim text-sm">
                            No upcoming sessions found.
                        </div>
                    ) : (
                        bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').map(booking => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                isAdmin={isAdmin}
                                onUpdate={handleUpdateStatus}
                            />
                        ))
                    )}
                </div>

                {/* History/Past */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Calendar className="text-text-dim" size={18} /> Recent History
                    </h3>
                    {bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').slice(0, 3).map(booking => (
                        <BookingCard key={booking.id} booking={booking} isAdmin={isAdmin} />
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-bg-card rounded-3xl border border-white/10 shadow-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6">Book 1-on-1 Session</h3>
                            <form onSubmit={handleBooking} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-text-muted">Select Mentor</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                        value={formData.mentorId}
                                        onChange={e => setFormData({ ...formData, mentorId: e.target.value })}
                                        required
                                    >
                                        <option value="">Choose a mentor...</option>
                                        {mentors.map(m => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <Input
                                    label="Topic"
                                    placeholder="e.g. Code Review, Career Advice"
                                    value={formData.topic}
                                    onChange={e => setFormData({ ...formData, topic: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Scheduled Date & Time"
                                    type="datetime-local"
                                    value={formData.scheduledAt}
                                    onChange={e => setFormData({ ...formData, scheduledAt: e.target.value })}
                                    required
                                />

                                <div className="pt-4 flex gap-4">
                                    <Button variant="glass" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1">Confirm Booking</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const BookingCard = ({ booking, isAdmin, onUpdate }) => {
    const date = new Date(booking.scheduled_at);
    const [meetingLink, setMeetingLink] = useState(booking.meeting_link || '');

    return (
        <Card className={`relative overflow-hidden ${booking.status === 'confirmed' ? 'border-primary/20' : ''}`}>
            {booking.status === 'confirmed' && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-[10px] font-bold text-white rounded-bl-xl">
                    CONFIRMED
                </div>
            )}

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="font-bold text-lg">{booking.topic}</h4>
                    <div className="flex items-center gap-4 text-xs text-text-dim">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {date.toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="flex items-center gap-1"><User size={12} /> {isAdmin ? booking.student?.name : booking.mentor?.name}</span>
                    </div>
                </div>
            </div>

            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                    {isAdmin && booking.status === 'pending' && (
                        <div className="space-y-3">
                            <Input
                                placeholder="Paste meeting link (Zoom/Google Meet)"
                                value={meetingLink}
                                onChange={e => setMeetingLink(e.target.value)}
                            />
                            <div className="flex gap-2">
                                <Button size="sm" className="flex-1" onClick={() => onUpdate(booking.id, 'confirmed', meetingLink)}>
                                    Confirm Session
                                </Button>
                                <Button size="sm" variant="glass" className="text-red-400" onClick={() => onUpdate(booking.id, 'cancelled')}>
                                    Reject
                                </Button>
                            </div>
                        </div>
                    )}

                    {booking.status === 'confirmed' && (
                        <div className="flex items-center justify-between">
                            <a
                                href={booking.meeting_link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/20 transition-all"
                            >
                                <Video size={18} /> Join Meeting
                            </a>
                            {isAdmin && (
                                <Button size="sm" variant="glass" onClick={() => onUpdate(booking.id, 'completed')}>
                                    Mark Completed
                                </Button>
                            )}
                        </div>
                    )}

                    {!isAdmin && booking.status === 'pending' && (
                        <div className="flex items-center gap-2 text-[10px] text-text-dim italic">
                            <AlertCircle size={12} /> Waiting for mentor confirmation and link.
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};

export default MentorshipBooking;
