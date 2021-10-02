import { useState, useEffect, useCallback } from "react";
import postItAPI from "../api/postIt";

const useFetchPosts = ({ limit }) => {
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState(null);

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

  const updatePosts = useCallback((response) => {
    setPosts((oldPosts) => [response, ...oldPosts]);
  }, []);

  return [posts, postError, updatePosts];
};

export default useFetchPosts;
