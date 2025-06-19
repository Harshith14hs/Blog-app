import { createContext, useState, useEffect } from "react"
import { API_BASE_URL } from "../api";

export const Bloglist = createContext({
  bloglist: [],
  addBlog: () => {},
  deleteBlog: () => {},
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  logout: () => {},
  refreshPosts: () => {},
});

const StoreProvider = ({ children }) => {
  const [bloglist, setBloglist] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Fetch posts from backend on load
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`);
      const data = await res.json();
      if (Array.isArray(data)) setBloglist(data);
    } catch (err) {
      setBloglist([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addBlog = (blog) => {
    setBloglist((prev) => [blog, ...prev]);
  };
  const deleteBlog = async (id) => {
    // Remove from local state immediately for responsive UI
    setBloglist((prev) => prev.filter((post) => post._id !== id && post.id !== id));
    // Refresh from backend to ensure consistency
    setTimeout(() => {
      fetchPosts();
    }, 100);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Expose a way to refresh posts from backend
  const refreshPosts = fetchPosts;

  return (
    <Bloglist.Provider value={{ bloglist, addBlog, deleteBlog, user, setUser, token, setToken, logout, refreshPosts }}>
      {children}
    </Bloglist.Provider>
  );
};

export default StoreProvider