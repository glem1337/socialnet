import React from "react";
// import style from "./MyPost.module.css";
import Post from "./Post";

const MyPosts = (props) => {

  let postsElements = props.posts
  .map(post =>  <Post message={post.message} likesCount={post.likesCount}/>);

  let newPostElement = React.createRef();
  
  let onAddPost = () => {
  props.addPost();

}
let onPostChange = () => {
let text = newPostElement.current.value;
props.updateNewPostText(text);

;
}

  return (
    <div className="style.postBlock">
      MyPosts
      <div>
        <textarea 
        onChange={onPostChange} 
        ref={ newPostElement }
        value={props.newPostText}></textarea>
        <button onClick={ onAddPost }>Add post</button>
      </div>
      <div className="style.posts">
        { postsElements }
      </div>
    </div>
  );
};

export default MyPosts;
