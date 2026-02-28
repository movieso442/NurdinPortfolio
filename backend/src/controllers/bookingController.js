const supabase = require('../services/supabaseClient');

exports.createBooking = async (req, res) => {
    const { mentorId, topic, scheduledAt, durationMinutes } = req.body;
    const studentId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('bookings')
            .insert({
                student_id: studentId,
                mentor_id: mentorId,
                topic,
                scheduled_at: scheduledAt,
                duration_minutes: durationMinutes || 60
            })
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyBookings = async (req, res) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let query = supabase.from('bookings').select(`
            *,
            student:users!student_id(name, email),
            mentor:users!mentor_id(name, email)
        `);

        if (role === 'admin') {
            // Admin sees bookings where they are the mentor
            query = query.eq('mentor_id', userId);
        } else {
            // Student sees bookings they made
            query = query.eq('student_id', userId);
        }

        const { data, error } = await query.order('scheduled_at', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status, meetingLink } = req.body;

    // Only admin or the assigned mentor should update status
    try {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status, meeting_link: meetingLink })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
