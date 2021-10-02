import { useState } from "react";
import postItAPI from "../api/postIt";

const useSubmitPost = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const submitPost = async (postData) => {
    let data = postData;
    try {
      const response = await postItAPI.post("/classes/PostIt", data);
      let postObjId = response.data.objectId;
      const newPost = await postItAPI.get(`/classes/PostIt/${postObjId}`);
      setPost(newPost.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return [submitPost, post, error, setPost];
};

export default useSubmitPost;
