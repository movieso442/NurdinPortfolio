const supabase = require('../services/supabaseClient');

exports.submitLab = async (req, res) => {
    const { lessonId, submissionType, content } = req.body;
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('lab_submissions')
            .insert({
                user_id: userId,
                lesson_id: lessonId,
                submission_type: submissionType,
                content
            })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLabSubmissions = async (req, res) => {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let query = supabase.from('lab_submissions').select('*, user:users(name, email)');

        if (role !== 'admin') {
            // Students only see their own submissions
            query = query.eq('user_id', userId);
        }

        if (lessonId) {
            query = query.eq('lesson_id', lessonId);
        }

        const { data, error } = await query.order('submitted_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.reviewLab = async (req, res) => {
    const { id } = req.params;
    const { feedback, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('lab_submissions')
            .update({ feedback, status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
