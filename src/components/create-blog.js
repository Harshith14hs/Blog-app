import "./CreateBlog.css";
import {Bloglist} from "../store/store"
import { useContext } from "react";
import { useRef } from "react";

export default function CreateBlog() {    

  
    const { addBlog, user, token } = useContext(Bloglist);
    const titleE=useRef()
    const TagE=useRef()
    const ImageE=useRef()
    const ExcerptE=useRef()
    const ContentE=useRef()

    const handleFunc=async (e)=>{
      
      e.preventDefault();
      if (!user || !token) {
        alert("You must be logged in to create a blog post.");
        return;
      }
      const title=titleE.current.value
      const tag=TagE.current.value
      const image=ImageE.current.value
      const excerpt=ExcerptE.current.value
      const content = ContentE.current.value
      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ title, tag, image, excerpt, content })
        });
        const data = await res.json();
        if (res.ok) {
          addBlog(data);
          titleE.current.value=""
          TagE.current.value=""
          ImageE.current.value=""
          ExcerptE.current.value=""
          ContentE.current.value=""
          alert("Blog post created!");
        } else {
          alert(data.message || "Failed to create post");
        }
      } catch (err) {
        alert("Error creating post");
      }
    }
  

  return (
    <div className="create-blog-container" >
      <div className="create-blog-box">
        <h2>Create New Blog</h2>
        <form onSubmit={handleFunc}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            ref={titleE}
            
            required
          />

          <label>Tag</label>
          <input
            type="text"
            placeholder="e.g., Travel, Health, Tech"
           ref={TagE}
            
            required
          />

          <label>Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            ref={ImageE}
            
            required
          />

          <label>Author</label>
          <input
            type="text"
            value={user ? user.username : ''}
            disabled
            style={{ background: '#f0f0f0', color: '#888' }}
          />

          <label>Excerpt</label>
          <textarea
            placeholder="Write a short excerpt..."
            ref={ExcerptE}
            
            required
          ></textarea>

          <label>Content</label>
          <textarea
            placeholder="Write the full blog content..."
            ref={ContentE}
            required
          ></textarea>

          <input className="sub" type="submit"></input>
        </form>
      </div>
    </div>
  );
}
