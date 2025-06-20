import { useContext, useState } from "react";
import { Bloglist } from "../store/store";
import "./RightSidebar.css";

export default function RightSidebar({ onSearch, onMyPosts }) {
  const { bloglist, likeCount, user } = useContext(Bloglist);
  const str = bloglist.length;
  const [searchTerm, setSearchTerm] = useState("");

  // Only show posts with at least 1 like, sorted by likeCount descending
  const popularPosts = (() => {
    const liked = [...bloglist].filter(post => (post.likeCount || 0) > 0);
    if (liked.length === 0) return [];
    // Find the post with the highest likeCount
    let max = liked[0];
    for (let i = 1; i < liked.length; i++) {
      if ((liked[i].likeCount || 0) > (max.likeCount || 0)) {
        max = liked[i];
      }
    }
    return [max];
  })();
  const recentPosts = [...bloglist].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  const handleMyPosts = () => {
    if (!user) {
      alert("Please log in to view your posts");
      return;
    }
    onMyPosts();
  };

  return (
    <aside className="right-sidebar">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Enter your keyword?" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      <div className="popular-posts">
        <h4>🔥 Popular Posts</h4>
        {popularPosts.length > 0 ? (
          popularPosts.map((post, index) => (
            <div key={post._id || post.id} className="popular-post">
              <img src={post.image} alt={post.title} />
              <div className="popular-post-info">
                <span className="like-count">❤️ {post.likeCount || 0} Likes</span>
                <p>{post.title}</p>
                {index === 0 && (post.likeCount || 0) > 0 && (
                  <span className="top-post">🏆 Most Popular</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: '#888', textAlign: 'center' }}>No popular posts yet.</div>
        )}
      </div>
      
      <div className="recent-posts">
        <h4>📅 Recent Posts</h4>
        <ul>
          {recentPosts.map((post) => (
            <li key={post._id || post.id}>
              <img src={post.image} alt={post.title} />
              <div>
                <span>{post.title}</span>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="categories">
        <h4>📂 Categories</h4>
        <ul>
          <li onClick={() => onSearch && onSearch("")}>All Posts <span>({str})</span></li>
          {user && <li onClick={handleMyPosts}>My Posts <span>({bloglist.filter(post => String(post.author?._id || post.author) === String(user._id || user.id)).length})</span></li>}
          
        </ul>
      </div>
    </aside>
  );
} 