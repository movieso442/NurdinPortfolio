import React, { useState, useEffect } from 'react';
import {
    CheckCircle2, XCircle, ChevronRight,
    Timer, HelpCircle, Trophy, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { Card, Button } from '../components/UI';

const QuizModule = ({ quizId, onComplete }) => {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await api.get(`/quizzes/${quizId}`);
                setQuiz(res.data);
            } catch (err) {
                console.error('Failed to fetch quiz', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleAnswer = (optionIndex) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleSubmit = async () => {
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correct_option_index) correctCount++;
        });

        const score = Math.round((correctCount / quiz.questions.length) * 100);
        const isPassed = score >= (quiz.passing_score || 70);

        try {
            const res = await api.post(`/quizzes/${quizId}/submit`, { score, isPassed });
            setResult(res.data);
            setIsFinished(true);
            if (isPassed && onComplete) onComplete();
        } catch (err) {
            alert('Failed to submit quiz');
        }
    };

    if (loading) return <div className="text-center py-10 animate-pulse text-primary">Loading Quiz...</div>;
    if (!quiz) return <div className="text-center py-10 text-red-400">Quiz not found.</div>;

    if (isFinished) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="text-center py-10 space-y-6">
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center relative ${result.isPassed ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                        {result.isPassed ? (
                            <>
                                <Trophy size={40} />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-green-400"
                                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </>
                        ) : <RefreshCcw size={40} />}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">{result.isPassed ? 'Congratulations!' : 'Keep Practicing'}</h3>
                        <p className="text-text-muted">You scored {result.score}%</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        {!result.isPassed && (
                            <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                                Try Again <RefreshCcw size={16} />
                            </Button>
                        )}
                        <Button variant="glass" onClick={() => onComplete && onComplete()}>
                            Continue Learning
                        </Button>
                    </div>
                </Card>
            </motion.div>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <Card className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2 text-primary">
                    <HelpCircle size={18} />
                    <span className="font-bold">Assessment</span>
                </div>
                <div className="text-text-dim text-sm">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-xl font-medium leading-relaxed">{question.question_text}</h3>

                <div className="space-y-3">
                    {question.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${answers[currentQuestion] === idx
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-white/5 border-white/10 hover:border-white/20 text-text-muted hover:text-white'
                                }`}
                        >
                            <span>{option}</span>
                            {answers[currentQuestion] === idx && <CheckCircle2 size={18} />}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between pt-6 border-t border-white/10">
                    <Button
                        variant="glass"
                        disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(v => v - 1)}
                    >
                        Previous
                    </Button>

                    {currentQuestion === quiz.questions.length - 1 ? (
                        <Button
                            disabled={answers[currentQuestion] === undefined}
                            onClick={handleSubmit}
                            className="bg-accent hover:bg-accent/80 border-none px-10"
                        >
                            Submit Quiz
                        </Button>
                    ) : (
                        <Button
                            disabled={answers[currentQuestion] === undefined}
                            onClick={() => setCurrentQuestion(v => v + 1)}
                            className="flex items-center gap-2"
                        >
                            Next Question <ChevronRight size={18} />
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default QuizModule;
