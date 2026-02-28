# Nurdine Learning Platform - Backend

This is the Node.js/Express REST API for the LMS and Mentorship platform.

## Setup Instructions

1. **Environment Variables**:
   - Copy the `.env` template and fill in your Supabase credentials:

     ```
     SUPABASE_URL=your_project_url
     SUPABASE_KEY=your_anon_key
     JWT_SECRET=your_random_secret
     ```

2. **Database Initialization**:
   - Go to your Supabase Dashboard -> SQL Editor.
   - Copy the contents of `backend/database/schema.sql` and run them to create the tables.

3. **Install Dependencies**:

   ```bash
   cd backend
   npm install
   ```

4. **Run the Server**:

   ```bash
   npm run dev
   ```

## Key Features

- **Coupon Registration**: Users MUST provide a valid coupon to register. Coupons are formatted as `[Name:2][Course:4][Year][Exp:Info]`.
- **RBAC**: Middleware handles access control for Admins, Students, Mentees, and Institutional accounts.
- **Supabase Integration**: Uses `@supabase/supabase-js` for real-time and database operations.
