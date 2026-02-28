import React, { useState, useEffect } from 'react';
import {
    ChevronLeft, Lock, PlayCircle, CheckCircle,
    MessageSquare, HelpCircle, ArrowRight, BookOpen
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courseApi } from '../services/api';
import { Card, Button } from '../components/UI';
import QuizModule from '../components/QuizModule';
import LabPortal from '../components/LabPortal';

const CourseViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeModule, setActiveModule] = useState(0);
    const [activeLesson, setActiveLesson] = useState(null);
    const [viewMode, setViewMode] = useState('lesson'); // 'lesson', 'quiz', 'lab'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const res = await courseApi.getById(id);
            setCourse(res.data);
            if (res.data.modules?.[0]?.lessons?.[0]) {
                setActiveLesson(res.data.modules[0].lessons[0]);
            }
        } catch (err) {
            console.error('Failed to fetch course details', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-full flex items-center justify-center animate-pulse text-primary"><BookOpen size={48} /></div>;
    if (!course) return <div className="text-center py-20">Course not found.</div>;

    const currentModule = course.modules[activeModule];

    return (
        <div className="flex h-[calc(100vh-160px)] gap-8">
            {/* Sidebar Content Tree */}
            <aside className="w-80 glass rounded-3xl border border-white/5 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <button
                        onClick={() => navigate('/dashboard/courses')}
                        className="flex items-center gap-2 text-xs text-text-dim hover:text-white transition-colors mb-4"
                    >
                        <ChevronLeft size={14} /> Back to Dashboard
                    </button>
                    <h3 className="font-bold text-lg line-clamp-1">{course.title}</h3>
                    <div className="mt-2 h-1 bg-white/5 rounded-full">
                        <div className="h-full bg-primary w-2/3 rounded-full" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {course.modules.map((module, mIdx) => (
                        <div key={module.id} className="space-y-4 relative">
                            {/* Visual Blur for Locked State */}
                            {module.isLocked && (
                                <div className="absolute inset-0 z-10 rounded-2xl bg-bg-dark/20 backdrop-blur-[2px] cursor-not-allowed border border-white/5 flex items-center justify-center">
                                    <div className="bg-bg-card p-2 rounded-full border border-white/10 shadow-xl">
                                        <Lock size={16} className="text-text-dim" />
                                    </div>
                                </div>
                            )}

                            <motion.div
                                layout
                                initial={false}
                                animate={{ opacity: module.isLocked ? 0.5 : 1 }}
                                className="space-y-2"
                            >
                                <div className={`p-3 rounded-xl flex items-center justify-between ${module.isLocked ? 'text-text-dim' : 'text-white'}`}>
                                    <span className="text-xs font-bold uppercase tracking-wider">Module {mIdx + 1}</span>
                                    {module.isLocked && <Lock size={14} />}
                                </div>

                                <div className="space-y-1">
                                    {module.lessons?.map((lesson, lIdx) => (
                                        <button
                                            key={lesson.id}
                                            disabled={module.isLocked}
                                            onClick={() => {
                                                setActiveModule(mIdx);
                                                setActiveLesson(lesson);
                                                setViewMode('lesson');
                                            }}
                                            className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${activeLesson?.id === lesson.id
                                                ? 'bg-primary/20 text-primary border border-primary/20'
                                                : 'hover:bg-white/5 text-text-muted hover:text-white border border-transparent'
                                                }`}
                                        >
                                            <PlayCircle size={16} />
                                            <span className="text-sm font-medium">{lesson.title}</span>
                                        </button>
                                    ))}

                                    {/* Module Quiz Button */}
                                    {module.quiz && (
                                        <button
                                            disabled={module.isLocked}
                                            onClick={() => {
                                                setActiveModule(mIdx);
                                                setViewMode('quiz');
                                            }}
                                            className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 border border-transparent ${viewMode === 'quiz' && activeModule === mIdx
                                                ? 'bg-accent/20 text-accent'
                                                : 'text-text-dim hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <HelpCircle size={16} />
                                            <span className="text-sm font-medium">Module Assessment</span>
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Content Display Area */}
            <main className="flex-1 overflow-y-auto custom-scrollbar bg-bg-card rounded-3xl border border-white/10 p-10 relative">
                <AnimatePresence mode="wait">
                    {viewMode === 'lesson' && activeLesson && (
                        <motion.div
                            key={`lesson-${activeLesson.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8 max-w-4xl"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{activeLesson.title}</h1>
                                    <p className="text-text-muted">Module {activeModule + 1} • {currentModule.title}</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="glass" className="h-10 px-4 min-w-0" title="Community Discussion">
                                        <MessageSquare size={18} />
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            // Mock completion check for now, can be connected to lessonApi later
                                            const btn = document.getElementById('complete-btn');
                                            btn.innerHTML = 'Completed!';
                                            btn.classList.add('bg-green-500', 'border-green-500');
                                            setTimeout(() => {
                                                btn.innerHTML = 'Mark complete <i class="lucide-check-circle"></i>';
                                            }, 2000);
                                        }}
                                        id="complete-btn"
                                        className="h-10 flex items-center gap-2 transition-all duration-500 overflow-hidden"
                                    >
                                        Mark as Complete <CheckCircle size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* Lesson Content Rendering */}
                            <div className="prose prose-invert prose-primary max-w-none">
                                {activeLesson.content_type === 'video' ? (
                                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                                        <iframe
                                            src={activeLesson.content_url}
                                            className="w-full h-full"
                                            frameBorder="0"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                                        {activeLesson.content_body || 'This lesson contains text-based content and downloadable resources.'}
                                    </div>
                                )}
                            </div>

                            {/* Challenge Trigger */}
                            {activeLesson.has_lab && (
                                <Card className="bg-accent/5 border-accent/20 border-dashed">
                                    <h4 className="font-bold flex items-center gap-2 mb-2">
                                        <BookOpen size={18} className="text-accent" /> Technical Challenge
                                    </h4>
                                    <p className="text-sm text-text-dim mb-4">This lesson includes a mandatory laboratory challenge. Complete the objectives to proceed.</p>
                                    <Button onClick={() => setViewMode('lab')} variant="outline" className="text-accent border-accent/30 hover:bg-accent/10">
                                        Open Lab Portal
                                    </Button>
                                </Card>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between pt-10 border-t border-white/10">
                                <button className="text-text-dim hover:text-white transition-colors flex items-center gap-2 font-medium">
                                    <ChevronLeft size={20} /> Previous Lesson
                                </button>
                                <button className="text-primary hover:text-primary/80 transition-all flex items-center gap-2 font-bold">
                                    Next Lesson <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {viewMode === 'quiz' && (
                        <motion.div
                            key={`quiz-${currentModule.quiz_id}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex items-center justify-center"
                        >
                            <QuizModule quizId={currentModule.quiz_id} onComplete={() => {
                                fetchCourse();
                                setViewMode('lesson');
                            }} />
                        </motion.div>
                    )}

                    {viewMode === 'lab' && (
                        <motion.div
                            key={`lab-${activeLesson.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-xl mx-auto py-20"
                        >
                            <LabPortal lessonId={activeLesson.id} onSubmission={() => setViewMode('lesson')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default CourseViewer;
