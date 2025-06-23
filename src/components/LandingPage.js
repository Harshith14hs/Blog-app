import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onSignIn, onCreateBlog }) => (
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

export default LandingPage; 