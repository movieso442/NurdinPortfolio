const supabase = require('./src/services/supabaseClient');

async function seed() {
    console.log('Seeding mock courses...');

    const mockCourses = [
        {
            title: 'Advanced Cybersecurity Defense',
            description: 'Master proactive protection strategies and incident response for enterprise environments.',
            instructor_name: 'Nurdine El Amiri',
            image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
            price: 499,
            level: 'Expert'
        },
        {
            title: 'Full-Stack Engineering Masterclass',
            description: 'Level up your development skills with modern architecture, scalable systems, and DevOps essentials.',
            instructor_name: 'Nurdine El Amiri',
            image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
            price: 299,
            level: 'Professional'
        },
        {
            title: 'Cloud Architecture & Security',
            description: 'Learn to design, deploy, and secure complex cloud infrastructures on AWS and Azure.',
            instructor_name: 'Nurdine El Amiri',
            image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
            price: 399,
            level: 'Advanced'
        }
    ];

    const { data, error } = await supabase
        .from('courses')
        .insert(mockCourses);

    if (error) {
        console.error('Error seeding courses:', error.message);
    } else {
        console.log('Seeding successful!');
    }
    process.exit();
}

seed();
