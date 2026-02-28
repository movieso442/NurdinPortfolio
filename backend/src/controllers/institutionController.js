const supabase = require('../services/supabaseClient');

class InstitutionController {
    /**
     * List all institutions
     */
    static async getAllInstitutions(req, res) {
        try {
            const { data, error } = await supabase
                .from('institutions')
                .select('*');

            if (error) throw error;
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Create a new institution
     */
    static async createInstitution(req, res) {
        const { name, portal_slug, description } = req.body;

        try {
            const { data, error } = await supabase
                .from('institutions')
                .insert([{ name, portal_slug, description }])
                .select()
                .single();

            if (error) throw error;
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get institution details by slug
     */
    static async getBySlug(req, res) {
        const { slug } = req.params;

        try {
            const { data, error } = await supabase
                .from('institutions')
                .select('*, courses(*)')
                .eq('portal_slug', slug)
                .single();

            if (error) throw error;
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InstitutionController;
