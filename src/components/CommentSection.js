import React, { useState, useEffect, useContext } from 'react';
import './CommentSection.css';
import { Bloglist } from '../store/store';
import { MdDelete } from 'react-icons/md';

export default function CommentSection({ postId }) {
  const { user, token } = useContext(Bloglist);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch comments from backend
  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/comments/post/${postId}`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError('Could not load comments');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user || !token) {
      alert('Please log in to comment');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment, postId })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to post comment');
      }
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError(err.message || 'Could not post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!user || !token) {
      alert('Please log in to delete comments');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch (e) {}
        setError((data && data.message ? data.message : 'Failed to delete comment') + (data && data.author && data.user ? ` (author: ${data.author}, user: ${data.user})` : ''));
        return;
      }
      fetchComments();
    } catch (err) {
      setError((err && err.message) || 'Could not delete comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading || !user}>{user ? (loading ? 'Posting...' : 'Post Comment') : 'Login to comment'}</button>
      </form>
      {error && <div className="comment-error">{error}</div>}
      <div className="comments-list">
        {loading && <div style={{ color: '#888', textAlign: 'center' }}>Loading...</div>}
        {comments.length === 0 && !loading && <div style={{ color: '#888', textAlign: 'center' }}>No comments yet.</div>}
        {comments.map((comment) => (
          <div key={comment._id || comment.id} className="comment">
            <div className="comment-header">
              <div className="comment-avatar">{comment.author?.username ? comment.author.username[0].toUpperCase() : 'U'}</div>
              <span className="comment-author">{comment.author?.username || 'User'}</span>
              <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
              {user && (user.id === (comment.author?._id || comment.author)) && (
                <span className="comment-delete-btn" title="Delete" onClick={() => handleDelete(comment._id)}><MdDelete /></span>
              )}
            </div>
            <p className="comment-text">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 