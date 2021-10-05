import { useState, useEffect, useCallback } from "react";
import postItAPI from "../api/postIt";

const useFetchPosts = ({ limit }) => {
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await postItAPI.get("/classes/PostIt", {
        params: {
          limit: limit,
        },
      });
      setPosts(response.data.results);
    } catch (err) {
      setPostError(err.response.data.error);
    }
  }, [limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const submitPost = async (postData) => {
    let data = postData;
    try {
      setIsLoading(true);
      const response = await postItAPI.post("/classes/PostIt", data);
      let postObjId = response.data.objectId;
      const newPost = await postItAPI.get(`/classes/PostIt/${postObjId}`);
      setPosts((oldPosts) => [newPost.data, ...oldPosts]);
      setIsLoading(false);
    } catch (err) {
      setPostError(err.response.data.error);
    }
  };

  return { posts, postError, submitPost, isLoading };
};

export default useFetchPosts;
