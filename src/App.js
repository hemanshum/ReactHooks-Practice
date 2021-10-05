import "./App.css";
import PostForm from "./components/PostForm";
import PostCard from "./components/PostCard";

import useFetchPosts from "./hooks/useFetchPosts";

const App = () => {
  const { posts, postError, submitPost, isLoading } = useFetchPosts({
    limit: 100,
  });

  return (
    <>
      <PostForm submitPost={submitPost} />
      {postError && <h2>Error fetching msg: {postError}</h2>}
      {isLoading && <h3 className="loading-center">Loading new post....</h3>}
      {posts.length <= 0 ? (
        <h3 className="loading-center">Loading....</h3>
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
