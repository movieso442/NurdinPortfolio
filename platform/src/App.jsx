import React from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Register from './pages/Register'
import Login from './pages/Login'
import LoginWithCoupon from './pages/LoginWithCoupon'
import Dashboard from './pages/Dashboard'
import AcademyHome from './pages/AcademyHome'
import MentorshipOverview from './pages/MentorshipOverview'
import TransitionLoader from './components/TransitionLoader'
import { Button } from './components/UI'

function App() {
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Check for simulation of redirection if needed, 
  // or just handle first load premium feel
  React.useEffect(() => {
    const hasTransitioned = sessionStorage.getItem('hasTransitioned');
    if (!hasTransitioned) {
      setIsTransitioning(true);
      sessionStorage.setItem('hasTransitioned', 'true');
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <AnimatePresence>
          {isTransitioning && <TransitionLoader onComplete={() => setIsTransitioning(false)} />}
        </AnimatePresence>
        <Routes>
          <Route path="/" element={<AcademyHome />} />
          <Route path="/mentorship" element={<MentorshipOverview />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-student" element={<LoginWithCoupon />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

// Temporary Placeholder Components
const Home = () => (
  <div className="page-wrapper container text-center">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-bold text-gradient mb-6"
    >
      Nurdine Learning Platform
    </motion.h1>
    <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
      Access premium cybersecurity and development courses with your secure student portal.
    </p>
    <div className="flex gap-4 justify-center">
      <Link to="/register"><Button>Get Started</Button></Link>
      <Link to="/login"><Button variant="glass">Student Login</Button></Link>
    </div>
  </div>
)

export default App
