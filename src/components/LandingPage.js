import React, { useEffect } from 'react';
import './LandingPage.css';

const LandingPage = ({ onSignIn, onCreateBlog }) => {
  useEffect(() => {
    // Track page visit immediately on load
    const trackingData = {
      name: 'Anonymous Visitor', // Will be anonymous until they fill a form
      email: 'not-provided@anonymous.com',
      phone: 'Not provided',
      bike_interest: 'General browsing',
      pages_visited: 1,
      time_spent: 0,
      referrer: document.referrer || 'Direct visit',
      page_url: window.location.href,
      page_title: document.title
    };

    // Track time spent
    let startTime = Date.now();
    
    // Send data when user leaves or after 30 seconds
    function sendTracking() {
      trackingData.time_spent = Math.floor((Date.now() - startTime) / 1000);
      
      fetch('YOUR_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackingData),
        keepalive: true
      }).catch(err => console.log('Tracking failed:', err));
    }

    // Send after 30 seconds of browsing
    const timer = setTimeout(sendTracking, 30000);
    
    // Send when user leaves
    window.addEventListener('beforeunload', sendTracking);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', sendTracking);
    };
  }, []);

  return (
    <div className="landing-bg">
      <header className="landing-header">
        <div className="landing-logo">📝 BlogJet</div>
        <button className="landing-signin" onClick={onSignIn}>SIGN IN</button>
      </header>
      <main className="landing-center">
        <h1 className="landing-title">Publish your passions, your way</h1>
        <p className="landing-subtitle">Create a unique and beautiful blog easily.</p>
        <button className="landing-create-btn" onClick={onCreateBlog}>CREATE YOUR BLOG</button>
      </main>
    </div>
  );
};

export default LandingPage; 