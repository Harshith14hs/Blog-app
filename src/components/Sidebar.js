import "./Sidebar.css";
import { FaFacebookF ,FaInstagram  } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { useState } from "react";

export default function Sidebar({currVal,updateVal}) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <button className="sidebar-toggle" onClick={handleToggle} aria-label="Toggle sidebar">
        <span className="sidebar-toggle-bar"></span>
        <span className="sidebar-toggle-bar"></span>
        <span className="sidebar-toggle-bar"></span>
      </button>
      <aside className={`sidebar${open ? ' open' : ''}`} onClick={() => open && setOpen(false)}>
        <div className="logo">
          <span className="logo-main">Blogjet<span className="dot">.</span></span>
          <span className="logo-desc">Create your intrested ideas...</span>
        </div>
        <nav className="nav">
          <ul >
            <li className={`${currVal==="home"  && "li"}`} onClick={()=>{updateVal("home")}}>Homepages</li>
            <li className={`${currVal==="create"  && "li"}`} onClick={()=>{updateVal("create")}}>Create-Blog</li>
            <li className={`${currVal==="myposts"  && "li"}`} onClick={()=>{updateVal("myposts")}}>My Posts</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="socials">
            <a href="https://www.facebook.com/share/16M3UgBjqq/"><FaFacebookF /><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/harshith__devang?igsh=MTRmM3dpMHFwbG1hdQ=="><FaInstagram/><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/harshith-h-72120b339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><CiLinkedin/><i className="fab fa-twitter"></i></a>
            <a href="https://github.com/Harshith14hs"><FaGithub/><i className="fab fa-github"></i></a>
          </div>
          <div className="copyright">
            © All rights are reserved
          </div>
        </div>
      </aside>
    </>
  );
} 