import { createContext, useContext, useEffect, useState } from "react";

import {
  getPostsRequest,
  createPostRequest,
  getPostRequest,
  updatePostRequest,
  deletePostRequest,
} from "../api/posts";

const postContext = createContext();

export const usePost = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getPostsRequest();
      setPosts(res.data);
    })();
  }, []);

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
      return "success";
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deletePost = async (id) => {
    const res = await deletePostRequest(id);
    console.log(res);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  const updatePost = async (id, newFields) => {
    try {
      const res = await updatePostRequest(id, newFields);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
      return "success";
    } catch (error) {
      return error;
    }
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const value = {
    posts,
    setPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
  };

  return <postContext.Provider value={value}>{children}</postContext.Provider>;
};
