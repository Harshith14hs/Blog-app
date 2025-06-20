import SignInPage from "./components/signin"
import Sidebar from "./components/Sidebar";
import BlogList from "./components/BlogList";
import RightSidebar from "./components/RightSidebar";
import Login from "./components/login"
import CreateBlog from "./components/create-blog"
import "./App.css";
import { useState, useContext } from "react";
import { Bloglist } from "./store/store";

function App() {
  const [currVal, updateVal] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const { token, user, logout } = useContext(Bloglist) || {};
 
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      {(currVal === "home" || currVal === "myposts") && (
        <div className="container">
          <Sidebar currVal={currVal} updateVal={updateVal} />
          <main className="main-content">
            <div className="nav">
              <h2> <span className="blog" >Blog</span>-Dairies</h2>
              {user ? (
                <div className="profile-section" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: '#f5f5f5',
                  borderRadius: '24px',
                  padding: '6px 18px',
                  marginLeft: '24px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                }}>
                  <span style={{ fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
                    {user.username}
                  </span>
                  <button onClick={() => { logout(); updateVal('home'); }}
                    style={{
                      background: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '16px',
                      padding: '6px 16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      fontSize: '1rem',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#145ea8'}
                    onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
                  >Logout</button>
                </div>
              ) : (
                <div className="nav-auth-links">
                  <a className="b2" onClick={() => updateVal("login")}>Login/</a>
                  <a className="b1" onClick={() => updateVal("signin")}>Sign-up</a>
                </div>
              )}
            </div>
            <BlogList currVal={currVal} updateVal={updateVal} searchTerm={searchTerm} token={token} />
          </main>
          <RightSidebar onSearch={handleSearch} onMyPosts={() => updateVal("myposts")} />
        </div>
      )}

      {currVal === "create" && (
        <div className="container">
          <Sidebar currVal={currVal} updateVal={updateVal} />
          <main className="main-content">
            <CreateBlog updateVal={updateVal} />
          </main>
          <RightSidebar onSearch={handleSearch} onMyPosts={() => updateVal("myposts")} />
        </div>
      )}

      {currVal === "login" && <Login currVal={currVal} updateVal={updateVal} />}
      {currVal === "signin" && <SignInPage updateVal={updateVal} />}
    </>
  );
}
export default App