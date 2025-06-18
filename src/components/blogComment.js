import { MdDelete  } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import "./BlogCard.css";

export default function BlogComment({ post }) {

 
  
  return (
    <div className="full">
      <div className="blog-card">
      <div className="blog-card-img">
        <img src={post.image} alt={post.title} />
        <p className="delete"><MdDelete /></p>
      </div>
      
      <h3 className="blog-card-title">{post.title}</h3>
      <div className="blog-card-meta">
        <span>BY: {post.author}</span>
        <span>{post.date}</span>
      </div>
      <p className="blog-card-desc">{post.excerpt}</p>
      <a href="#" className="blog-card-readmore">READ MORE</a> 
      <div className="btag">
      <span className="blog-card-tag">{post.tag}</span> 
      
      
      </div>
    </div>
    </div>
  );
} 