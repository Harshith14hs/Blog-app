import { MdDelete  } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import "./BlogCard.css";
import {  useContext, useState, useEffect } from "react";
import { Bloglist } from "../store/store";
import { FaCommentAlt } from "react-icons/fa";
import CommentSection from "./CommentSection";

export default function BlogCard({ post, updateVal, commentBox }) {
  const { deleteBlog, user, token, refreshPosts } = useContext(Bloglist);
  const [likeCount, updateCout] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(
    user && post.likes && post.likes.map(String).includes(String(user.id))
  );

  useEffect(() => {
    setIsLiked(user && post.likes && post.likes.map(String).includes(String(user.id)));
    updateCout(post.likeCount || 0);
  }, [post.likes, post.likeCount, user]);

  const handleDelete = async () => {
    if (!token) {
      alert("Please log in to delete posts");
      return;
    }
    
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    const postId = post._id || post.id;
    if (!postId) {
      alert("Cannot delete post: Invalid post ID");
      return;
    }
    
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        deleteBlog(postId);
        alert("Post deleted successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      alert("Error deleting post. Please try again.");
    }
  };

  const handleLike = async () => {
    if (!token) {
      alert("Please log in to like posts");
      return;
    }
    const postId = post._id || post.id;
    if (!postId) {
      alert("Cannot like post: Invalid post ID");
      return;
    }
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "PUT",
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const updatedPost = await res.json();
        updateCout(updatedPost.likeCount || 0);
        setIsLiked(updatedPost.likes && user && updatedPost.likes.map(String).includes(String(user.id)));
        if (refreshPosts) setTimeout(() => refreshPosts(), 100);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to like post");
      }
    } catch (error) {
      alert("Error liking post. Please try again.");
    }
  };

  const toggleComments = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  return (
    <div className="full">
      <div className="blog-card">
        <div className="blog-card-img">
          <img src={post.image} alt={post.title} />
          {(user && (
            user.id === (post.author?._id || post.author) || 
            user._id === (post.author?._id || post.author)
          )) && (
            <p className="delete" onClick={handleDelete}><MdDelete /></p>
          )}
        </div>
        
        <h3 className="blog-card-title">{post.title}</h3>
        <div className="blog-card-meta">
          <span>BY: {post.author?.username || post.author}</span>
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date}</span>
          <span className="likespan">• {likeCount} <span>Likes</span></span>
        </div>
        <p className="blog-card-desc">{post.excerpt}</p>
        <a href="#" className="blog-card-readmore">READ MORE</a> 
        <div className="btag">
          <span className="blog-card-tag">{post.tag}</span> 
          <div className="interaction-buttons">
            {isLiked ? 
              <p className="like" onClick={handleLike}><BiSolidLike /></p> :
              <p className="like" onClick={handleLike}><BiLike /></p>
            }
            <FaCommentAlt className="comment1" onClick={toggleComments}/>
          </div>
        </div>
        
        {showComments && (
          <div className="comment-section-container">
            <CommentSection postId={post._id} />
          </div>
        )}
      </div>
    </div>
  );
} 