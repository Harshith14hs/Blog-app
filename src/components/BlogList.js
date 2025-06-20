import BlogCard from "./BlogCard";
import { Bloglist } from "../store/store";
import "./BlogList.css";
import { useContext, useEffect, useState } from "react";
import BlogComment from "./blogComment";
import { API_BASE_URL } from "../api";

export default function BlogList({ currVal, updateVal, searchTerm, token }) {
  const { bloglist } = useContext(Bloglist);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let url = "";
    let options = {};
    setLoading(true);
    setError("");
    
    console.log('BlogList useEffect - currVal:', currVal, 'token:', token ? 'present' : 'missing');
    
    if (currVal === "home") {
      url = `${API_BASE_URL}/api/posts`;
      options = {};
    } else if (currVal === "myposts") {
      if (!token) {
        setError("Please log in to view your posts");
        setLoading(false);
        return;
      }
      url = `${API_BASE_URL}/api/posts/mine`;
      options = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    
    if (!url) return;
    
    console.log('Fetching from:', url, 'with options:', options);
    
    fetch(url, options)
      .then(res => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Please log in to view your posts");
          }
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then(data => {
        console.log('Received data:', data);
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setPosts([]);
        setError(err.message || "Error fetching posts");
      })
      .finally(() => setLoading(false));
  }, [currVal, token]);

  // Keep posts in sync with context.bloglist after add/delete
  useEffect(() => {
    if (bloglist.length > 0) {
      setPosts(bloglist);
    }
  }, [bloglist]);

  const filteredPosts = posts.filter((post) => {
    const searchContent = `${post.title} ${post.tag} ${post.author?.username || post.author} ${post.excerpt}`.toLowerCase();
    return searchContent.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="blog-list">
      {loading && <div style={{textAlign: 'center', width: '100%'}}>Loading...</div>}
      {error && <div style={{color: 'red', textAlign: 'center', width: '100%'}}>{error}</div>}
      {!loading && !error && filteredPosts.length === 0 && currVal === "myposts" && (
        <div style={{textAlign: 'center', width: '100%', color: '#666'}}>
          You haven't created any posts yet. Click "Create Blog" to get started!
        </div>
      )}
      {(currVal === "home" || currVal === "myposts") && filteredPosts.map((post) => (
        <BlogCard key={post._id || post.id} post={post} currVal={currVal} updateVal={updateVal} />
      ))}
      {currVal === "comment" && filteredPosts.map((post) => (
        <BlogComment key={post._id || post.id} post={post} currVal={currVal} updateVal={updateVal} />
      ))}
    </div>
  );
} 