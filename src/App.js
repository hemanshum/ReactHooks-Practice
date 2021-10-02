import { useEffect } from "react";

import "./App.css";
import PostForm from "./components/PostForm";
import PostCard from "./components/PostCard";

import useFetchPosts from "./hooks/useFetchPosts";
import useSubmitPost from "./hooks/useSubmitPost";

const App = () => {
  const [posts, postError, updatePosts] = useFetchPosts({ limit: 100 });
  const [submitPost, post, error, setPost] = useSubmitPost();

  useEffect(() => {
    if (post) {
      updatePosts(post);
      setPost(null);
    }
  }, [post, updatePosts, setPost]);

  return (
    <>
      <PostForm submitPost={submitPost} />
      {error && <h2>Error submiting post: {error}</h2>}
      {postError && <h2>Error fetching msg: {postError}</h2>}
      {posts.length <= 0 ? (
        <p>Loading....</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.objectId}
            url={post.image}
            title={post.title}
            text={post.text}
            category={post.category}
          />
        ))
      )}
    </>
  );
};

export default App;
