const supabase = require('../services/supabaseClient');

class CourseController {
    /**
     * List all courses (with optional institution filtering)
     */
    static async getAllCourses(req, res) {
        let query = supabase.from('courses').select('*, institutions(name)');

        if (req.query.institution_id) {
            query = query.eq('institution_id', req.query.institution_id);
        }

        const { data, error } = await query;

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    }

    /**
     * Create a new course (Admin only)
     */
    static async createCourse(req, res) {
        const { title, description, instructor_name, image_url, institution_id, price } = req.body;

        try {
            const { data, error } = await supabase
                .from('courses')
                .insert([{
                    title,
                    description,
                    instructor_name,
                    image_url,
                    institution_id: institution_id || null,
                    price: price || 0
                }])
                .select()
                .single();

            if (error) throw error;
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Update course details
     */
    static async updateCourse(req, res) {
        const { id } = req.params;
        const updates = req.body;

        try {
            const { data, error } = await supabase
                .from('courses')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Delete a course
     */
    static async deleteCourse(req, res) {
        const { id } = req.params;

        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', id);

            if (error) throw error;
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get course details with module locking logic
     */
    static async getCourseWithProgression(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            // 1. Get course and modules
            const { data: course, error: courseError } = await supabase
                .from('courses')
                .select('*, modules(*)')
                .eq('id', id)
                .single();

            if (courseError) throw courseError;

            // 2. Get student's quiz results
            const { data: results, error: resError } = await supabase
                .from('quiz_results')
                .select('quiz_id, is_passed, quizzes(module_id)')
                .eq('user_id', userId);

            if (resError) throw resError;

            // 3. Apply locking logic
            // Rule: Module N is locked if Module N-1 has a quiz and student hasn't passed it.
            const sortedModules = course.modules.sort((a, b) => a.order - b.order);
            const processedModules = sortedModules.map((module, index) => {
                if (index === 0) return { ...module, isLocked: false };

                const prevModule = sortedModules[index - 1];
                const prevResult = results.find(r => r.quizzes.module_id === prevModule.id);

                // If there's no result for previous module, it's locked (assuming every module has a quiz)
                // In a real system, we'd check if the module actually HAS a quiz first.
                return {
                    ...module,
                    isLocked: !prevResult || !prevResult.is_passed
                };
            });

            res.json({ ...course, modules: processedModules });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CourseController;
