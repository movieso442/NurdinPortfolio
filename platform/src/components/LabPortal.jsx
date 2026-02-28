import React, { useState } from 'react';
import {
    CloudUpload, Link as LinkIcon, FileText,
    Send, CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { labApi } from '../services/api';
import { Card, Button, Input } from '../components/UI';

const LabPortal = ({ lessonId, onSubmission }) => {
    const [type, setType] = useState('link'); // 'link', 'text', 'file'
    const [content, setContent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await labApi.submit({
                lesson_id: lessonId,
                submission_type: type,
                content: content
            });
            setIsSubmitted(true);
            if (onSubmission) onSubmission();
        } catch (err) {
            alert('Submission failed');
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className="bg-green-400/5 border-green-400/20 text-center py-10">
                <CheckCircle2 className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-400">Lab Submitted!</h3>
                <p className="text-text-dim mt-2">Your instructor will review your work shortly.</p>
                <div className="mt-6 flex justify-center items-center gap-2 text-xs text-text-muted">
                    <Clock size={14} /> Submitted on {new Date().toLocaleDateString()}
                </div>
            </Card>
        );
    }

    return (
        <Card className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <CloudUpload size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Laboratory Portal</h3>
                    <p className="text-xs text-text-dim">Submit your challenge deliverables here.</p>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {['link', 'text'].map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${type === t ? 'bg-primary text-white shadow-lg' : 'text-text-dim hover:text-white'
                            }`}
                    >
                        {t === 'link' ? <LinkIcon size={14} /> : <FileText size={14} />}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'link' ? (
                    <Input
                        label="Project URL"
                        placeholder="https://github.com/your-username/repo"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                ) : (
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Solution Text</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-primary transition-all min-h-[150px]"
                            placeholder="Describe your solution or paste code..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className="p-4 bg-bg-card rounded-xl border border-border-glass flex gap-3 text-[10px] text-text-dim leading-relaxed">
                    <AlertCircle className="text-accent shrink-0" size={16} />
                    <p>Make sure your repository or document is public or accessible by the instructor team for review. Submission is final.</p>
                </div>

                <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading || !content}
                >
                    {loading ? 'Processing...' : <><Send size={18} /> Submit Solution</>}
                </Button>
            </form>
        </Card>
    );
};

export default LabPortal;
