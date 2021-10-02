import React from "react";
import { useForm } from "react-hook-form";

import "./PostIt.css";

const PostForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <header id="header">
      <h1 className="heading">POST IT</h1>
      <form
        id="form"
        onSubmit={handleSubmit((data) => {
          props.submitPost({
            title: data.title,
            description: data.description,
            category: data.category,
            image: data.imgUrl,
          });
        })}
      >
        <input
          id="title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Field is required</p>}
        <br />
        <textarea
          id="paragraph"
          cols="20"
          rows="3"
          placeholder="Enter Your Text"
          {...register("description")}
        ></textarea>{" "}
        <br />
        <input
          type="url"
          id="url"
          placeholder="Enter Image URL"
          {...register("imgUrl")}
        />
        <input
          type="text"
          id="category"
          placeholder="Category"
          required
          {...register("category")}
        />{" "}
        <br />
        <button id="post" type="submit">
          Post It
        </button>
      </form>
    </header>
  );
};

export default PostForm;
