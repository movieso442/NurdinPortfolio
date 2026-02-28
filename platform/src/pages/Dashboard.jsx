import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, BookOpen, Award, Settings, LogOut,
    PlayCircle, PlusCircle, Users, BarChart3, Upload, School, Calendar, Search,
    CheckCircle, ChevronRight
} from 'lucide-react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Card, Button, Input } from '../components/UI';
import { courseApi } from '../services/api';

import ApplicationPanel from '../components/ApplicationPanel';
import AdminCourseManagement from '../components/AdminCourseManagement';
import InstitutionalPortal from './InstitutionalPortal';
import CourseViewer from './CourseViewer';
import MentorshipBooking from './MentorshipBooking';
import AdminApplications from './AdminApplications';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        else navigate('/login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!user) return null;

    const isAdmin = user.role === 'admin';
    const isInstitutional = !!user.institution_id;
    const isMentorship = user.role === 'mentorship_student' || user.is_mentorship;

    const getRootOverview = () => {
        if (isAdmin) return <AdminOverview />;
        if (isInstitutional) return <InstitutionalOverview user={user} />;
        if (isMentorship) return <MentorshipOverview user={user} />;
        return <StandardOverview user={user} />;
    };

    return (
        <div className="flex min-h-screen bg-bg-dark">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-border-glass flex flex-col p-6 fixed h-full z-20">
                <div className="mb-10">
                    <h1 className="text-xl font-bold text-gradient">Nurdine platform</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarLink icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={location.pathname === '/dashboard'} />
                    {isAdmin && <SidebarLink icon={Users} label="Applications" to="/dashboard/admin/applications" active={location.pathname === '/dashboard/admin/applications'} />}
                    {isInstitutional && <SidebarLink icon={School} label="School Portal" to={`/dashboard/portal/${user.institution_slug || 'my-school'}`} active={location.pathname.includes('/dashboard/portal')} />}
                    {!isAdmin && <SidebarLink icon={BookOpen} label="My Courses" to="/dashboard/courses" active={location.pathname === '/dashboard/courses'} />}
                    {isAdmin && <SidebarLink icon={PlusCircle} label="Manage Courses" to="/dashboard/admin/courses" active={location.pathname === '/dashboard/admin/courses'} />}
                    {isAdmin && <SidebarLink icon={Users} label="Students" to="/dashboard/admin/students" active={location.pathname === '/dashboard/admin/students'} />}
                    <SidebarLink icon={Award} label="Certificates" to="/dashboard/certificates" active={location.pathname === '/dashboard/certificates'} />
                    <SidebarLink icon={Calendar} label="Mentorship" to="/dashboard/mentorship" active={location.pathname === '/dashboard/mentorship'} />
                    <SidebarLink icon={Settings} label="Settings" to="/dashboard/settings" active={location.pathname === '/dashboard/settings'} />
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-text-muted hover:text-red-400 transition-colors mt-auto p-3"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {isAdmin ? 'Admin Control Center' : `Welcome back, ${user.name}`}
                        </h2>
                        <p className="text-text-muted">
                            {isAdmin ? 'Manage your platform and students' : 'Your learning dashboard is ready.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-text-dim capitalize">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user.name?.[0]}
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={getRootOverview()} />
                    <Route path="/admin/applications" element={<AdminApplications />} />
                    <Route path="/admin/courses" element={<AdminCourseManagement />} />
                    <Route path="/portal/:slug" element={<InstitutionalPortal />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:id" element={<CourseViewer />} />
                    <Route path="/mentorship" element={<MentorshipBooking />} />
                </Routes>
            </main>
        </div>
    );
};

const SidebarLink = ({ icon: Icon, label, to, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </Link>
);

/* ADMIN COMPONENTS */
const AdminOverview = () => (
    <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Total Students" value="128" color="var(--primary)" />
            <StatCard label="Active Coupons" value="45" color="var(--accent)" />
            <StatCard label="Course Enrollments" value="312" color="var(--secondary)" />
            <StatCard label="Revenue" value="$4,250" color="#FACC15" />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-primary" /> Enrollment Activity
                </h3>
                <div className="h-48 bg-white/5 rounded-xl border border-dashed border-border-glass flex items-center justify-center text-text-dim">
                    Activity Chart Placeholder
                </div>
            </Card>
            <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <PlusCircle size={20} className="text-accent" /> Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <QuickActionBtn icon={Upload} label="Upload Course" />
                    <QuickActionBtn icon={TicketIcon} label="Create Coupon" />
                    <QuickActionBtn icon={Users} label="Add Student" />
                    <QuickActionBtn icon={Award} label="Issue Cert" />
                </div>
            </Card>
        </section>
    </div>
);

const QuickActionBtn = ({ icon: Icon, label }) => (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border-glass hover:bg-white/5 transition-all text-text-muted hover:text-white">
        <Icon size={24} />
        <span className="text-xs font-medium">{label}</span>
    </button>
);


/* STUDENT COMPONENTS */
const StandardOverview = ({ user }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await courseApi.getAll();
                setCourses(res.data.slice(0, 2)); // Show top 2 for now
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Completed Lessons" value="12" total="45" color="var(--primary)" />
                <StatCard label="Certificates Earned" value="1" total="3" color="var(--accent)" />
                <StatCard label="Hours Learned" value="24.5" total="100" color="var(--secondary)" />
            </div>

            <section>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Continue Learning</h3>
                    <Link to="/dashboard/courses" className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
                        View All <ChevronRight size={16} />
                    </Link>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-40 bg-white/5 rounded-3xl animate-pulse" />
                        <div className="h-40 bg-white/5 rounded-3xl animate-pulse" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map(course => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                progress={75}
                                instructor={course.instructor_name || "M. Nurdine"}
                                image={course.image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const MentorshipOverview = ({ user }) => (
    <div className="space-y-10">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 border border-white/10 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2">Mentorship Program</h3>
                <p className="text-text-muted max-w-lg mb-6">Welcome to your exclusive mentorship track. You have direct access to one-on-one sessions and advanced laboratory environments.</p>
                <div className="flex gap-4">
                    <Button onClick={() => window.location.hash = '/dashboard/mentorship'}>Book Session</Button>
                    <Button variant="glass">View Roadmap</Button>
                </div>
            </div>
            <Calendar className="absolute top-10 right-10 text-white/5 w-64 h-64 -rotate-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <h4 className="font-bold mb-4 flex items-center gap-2"><PlayCircle size={18} className="text-primary" /> Active Assignments</h4>
                <div className="space-y-3">
                    <AssignmentRow title="Advanced Architecture Lab" status="In Progress" />
                    <AssignmentRow title="API Performance Optimization" status="Upcoming" />
                </div>
            </Card>
            <Card>
                <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-green-400" /> Milestone Achievement</h4>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
                        <Award size={32} />
                    </div>
                    <div>
                        <p className="font-bold">85% Through Phase 1</p>
                        <p className="text-sm text-text-dim">You are ahead of schedule! Keep it up.</p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

const InstitutionalOverview = ({ user }) => (
    <div className="space-y-10">
        <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                    <School size={28} />
                </div>
                <div>
                    <h3 className="text-xl font-bold">{user.institution_name || 'Partner School'}</h3>
                    <p className="text-sm text-text-muted">Institutional Learning Portal</p>
                </div>
            </div>
            <Button variant="outline" className="border-secondary/30 text-secondary hover:bg-secondary/10">Browse School Courses</Button>
        </div>

        <section>
            <h3 className="text-lg font-bold mb-6">Assigned Curriculum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseCard
                    id="inst-1"
                    title="Corporate Cybersecurity"
                    progress={40}
                    instructor="Institutional Lead"
                    image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
                />
            </div>
        </section>
    </div>
);

const AssignmentRow = ({ title, status }) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-sm">
        <span className="font-medium">{title}</span>
        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${status === 'In Progress' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-text-dim'}`}>
            {status}
        </span>
    </div>
);

const StatCard = ({ label, value, total, color }) => (
    <Card className="flex flex-col gap-2">
        <p className="text-text-muted text-sm font-medium">{label}</p>
        <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{value}</span>
            {total && <span className="text-text-dim mb-1">/ {total}</span>}
        </div>
        {total && (
            <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / total) * 100}%` }}
                    style={{ backgroundColor: color }}
                    className="h-full"
                />
            </div>
        )}
    </Card>
);

const CourseCard = ({ id, title, progress, instructor, image }) => {
    const navigate = useNavigate();
    return (
        <Card
            className="group overflow-hidden p-0 flex flex-row border-none cursor-pointer hover:bg-white/5 transition-all"
            onClick={() => navigate(`/dashboard/courses/${id}`)}
        >
            <div className="w-40 h-full relative">
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white" size={40} />
                </div>
            </div>
            <div className="flex-1 p-6">
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-sm text-text-dim mb-4">By {instructor}</p>
                <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-primary font-medium">{progress}% Complete</span>
                    <span className="text-text-dim">12/16 Lessons</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>
        </Card>
    );
};

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await courseApi.getAll();
                setCourses(res.data);
            } catch (err) {
                console.error('Failed to fetch courses', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Explore Courses</h3>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-all font-inter"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse" />)}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-text-dim">No courses found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map(course => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            instructor={course.instructor_name || 'M. Nurdine'}
                            image={course.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400'}
                            progress={Math.floor(Math.random() * 100)} // Mock progress for discovery view
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const TicketIcon = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 9V5.25c0-.69.56-1.25 1.25-1.25h17.5c.69 0 1.25.56 1.25 1.25V9m-20 0c1.38 0 2.5 1.12 2.5 2.5S5.38 14 4 14m-2 0v4.75c0 .69.56 1.25 1.25 1.25h17.5c.69 0 1.25-.56 1.25-1.25V14m-20 0c1.38 0 2.5 1.12 2.5 2.5S20.62 14 2 14" />
    </svg>
);

export default Dashboard;
