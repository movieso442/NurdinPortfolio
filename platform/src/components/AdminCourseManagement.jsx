import React, { useState, useEffect } from 'react';
import {
    Plus, Search, Edit2, Trash2, Globe, Lock,
    BookOpen, User, DollarSign, Image as ImageIcon,
    Save, X, ChevronRight, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { courseApi, institutionApi } from '../services/api';
import { Card, Button, Input } from '../components/UI';

const AdminCourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [search, setSearch] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor_name: '',
        image_url: '',
        institution_id: '',
        price: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [courseRes, instRes] = await Promise.all([
                courseApi.getAll(),
                institutionApi.getAll()
            ]);
            setCourses(courseRes.data);
            setInstitutions(instRes.data);
        } catch (err) {
            console.error('Failed to fetch management data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({
                title: course.title,
                description: course.description || '',
                instructor_name: course.instructor_name || '',
                image_url: course.image_url || '',
                institution_id: course.institution_id || '',
                price: course.price || 0
            });
        } else {
            setEditingCourse(null);
            setFormData({
                title: '',
                description: '',
                instructor_name: '',
                image_url: '',
                institution_id: '',
                price: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                await courseApi.update(editingCourse.id, formData);
            } else {
                await courseApi.create(formData);
            }
            fetchData();
            setIsModalOpen(false);
        } catch (err) {
            alert('Operation failed: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
        try {
            await courseApi.delete(id);
            fetchData();
        } catch (err) {
            alert('Delete failed');
        }
    };

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <BookOpen className="text-primary" /> Course Library
                </h2>
                <div className="flex gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
                        <Plus size={18} /> Upload Course
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />)
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-20 text-text-dim border border-dashed border-white/10 rounded-2xl">
                        No courses found. Start by uploading one.
                    </div>
                ) : (
                    filteredCourses.map(course => (
                        <Card key={course.id} className="group hover:border-white/20 transition-all py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5">
                                        <img
                                            src={course.image_url || 'https://via.placeholder.com/150'}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{course.title}</h4>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-xs text-text-dim flex items-center gap-1">
                                                <User size={12} /> {course.instructor_name || 'No Instructor'}
                                            </span>
                                            {course.institutions?.name && (
                                                <span className="text-xs text-primary/80 flex items-center gap-1">
                                                    <Lock size={12} /> Portal: {course.institutions.name}
                                                </span>
                                            )}
                                            {!course.institution_id && (
                                                <span className="text-xs text-accent/80 flex items-center gap-1">
                                                    <Globe size={12} /> Public Access
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(course)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-all"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="p-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-400 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modal */}
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
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-bg-card rounded-3xl border border-white/10 shadow-2xl p-8 overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold">{editingCourse ? 'Edit Course' : 'Upload New Course'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-text-dim hover:text-white"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    label="Course Title"
                                    placeholder="e.g. Advanced Cybersecurity"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <Input
                                        label="Instructor Name"
                                        placeholder="M. Nurdine"
                                        value={formData.instructor_name}
                                        onChange={e => setFormData({ ...formData, instructor_name: e.target.value })}
                                    />
                                    <Input
                                        label="Price ($)"
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>

                                <Input
                                    label="Banner Image URL"
                                    icon={ImageIcon}
                                    placeholder="https://images.unsplash.com/..."
                                    value={formData.image_url}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-muted">Target Portal (Institution)</label>
                                    <select
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                        value={formData.institution_id}
                                        onChange={e => setFormData({ ...formData, institution_id: e.target.value })}
                                    >
                                        <option value="">Public Library (Visible to all)</option>
                                        {institutions.map(inst => (
                                            <option key={inst.id} value={inst.id}>{inst.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-[10px] text-text-dim italic flex items-center gap-1 mt-1">
                                        <AlertCircle size={10} /> Courses linked to a portal are only visible to students from that institution.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-text-muted">Course Description</label>
                                    <textarea
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all min-h-[120px]"
                                        placeholder="What will students learn?"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button variant="glass" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 flex items-center justify-center gap-2">
                                        <Save size={18} /> {editingCourse ? 'Save Changes' : 'Publish Course'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCourseManagement;
