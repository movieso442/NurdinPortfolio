const supabase = require('../services/supabaseClient');

exports.getQuizzesByModule = async (req, res) => {
    const { moduleId } = req.params;
    try {
        const { data, error } = await supabase
            .from('quizzes')
            .select('*, questions(*)')
            .eq('module_id', moduleId);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.submitQuiz = async (req, res) => {
    const { quizId, answers } = req.body; // answers: [{ questionId, selectedOption }]
    const userId = req.user.id;

    try {
        // 1. Fetch questions to grade
        const { data: questions, error: qError } = await supabase
            .from('questions')
            .select('*')
            .eq('quiz_id', quizId);

        if (qError) throw qError;

        // 2. Grade the quiz
        let correctCount = 0;
        questions.forEach(q => {
            const userAnswer = answers.find(a => a.questionId === q.id);
            if (userAnswer && userAnswer.selectedOption === q.correct_option_index) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / questions.length) * 100);

        const { data: quiz, error: quizError } = await supabase
            .from('quizzes')
            .select('passing_score')
            .eq('id', quizId)
            .single();

        if (quizError) throw quizError;

        const isPassed = score >= quiz.passing_score;

        // 3. Save result
        const { data: result, error: resError } = await supabase
            .from('quiz_results')
            .insert({
                user_id: userId,
                quiz_id: quizId,
                score,
                is_passed: isPassed
            })
            .select()
            .single();

        if (resError) throw resError;

        res.json({
            score,
            isPassed,
            passingScore: quiz.passing_score,
            resultId: result.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentResults = async (req, res) => {
    const userId = req.user.id;
    try {
        const { data, error } = await supabase
            .from('quiz_results')
            .select('*, quizzes(title, module_id)')
            .eq('user_id', userId);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
