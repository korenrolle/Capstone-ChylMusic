import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CommentList from "../../components/CommentList/CommentList";
import CreatePost from "../../components/Post/CreatePost";
// import AlbumDetails from "./AlbumDetails";
// import MusicPlayer from "./MusicPlayer";
// import { useNavigate } from 'react-router-dom'
// import { useParams } from "react-router-dom";

function Feed() {
  // State for the list of posts
  const [posts, setPosts] = useState([]);

  // const params = useParams();
  // console.log(params)
  
  // const navigate = useNavigate()

  // Function to fetch the list of posts from the backend API
  async function fetchPosts() {
    try {
      const res = await fetch("http://localhost:4000/post");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setPosts(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);


  

  // Function to handle a comment submission for a post
  async function handleCommentSubmit(postId, comment) {
    try {
      // Send the comment to the backend API
      const res = await fetch(`http://localhost:4000/comment/`, {
        method: "POST",
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit comment");
      }
      // Refresh the list of posts
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to handle delete a post
  async function handleDeletePost(postId) {
    try {
      console.log(`/Post/${postId}`)
      // Send the delete request to the backend API
      const res = await fetch(`http://localhost:4000/post/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
      // Refresh the list of posts
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }
  console.log(posts)
  return (
    <div>
      <div>
      <CreatePost fetchPosts={fetchPosts} />
      {posts.map((post) => ( 
        <div key={post._id}>
          <h3>{post.title}</h3>
          <Link to={`/music/${post._id}`}><img className="pic" src={post.image} alt={post.title} /></Link>
          {/* <AlbumDetails description={post.description} id={post._id}/> */}
          <form onSubmit={(event) => handleCommentSubmit(post._id, event.target.comment.value)}>
          </form>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div >
      ))}
      {/* <CommentList /> */}
    </div>
    </div>
  );
}
export default Feed;