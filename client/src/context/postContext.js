import { createContext, useContext, useEffect, useState } from "react";

import {
  getPostsRequest,
  createPostRequest,
  getPostRequest,
  updatePostRequest,
  deletePostRequest,
  deleteMultiplePostRequest,
} from "../api/posts";

const postContext = createContext();

export const usePost = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getPostsRequest();
        setPosts(res.data);
      } catch (error) {
        return error;
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Create Employee
  const createPost = async (post) => {
    setIsLoading(true);
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
      return "success";
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Employee
  const deletePost = async (id) => {
    setIsLoading(true);
    try {
      const res = await deletePostRequest(id);
      console.log(res);
      if (res.status === 204) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Multiple Employees
  const deleteMultiple = async (ids) => {
    setIsLoading(true);
    try {
      const res = await deleteMultiplePostRequest(ids);
      if (res.status === 204) {
        for (let id of ids) {
          setPosts((posts) => posts.filter((post) => post._id !== id));
        }
        setCheckbox(false);
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update Employee
  const updatePost = async (id, newFields) => {
    setIsLoading(true);
    try {
      const res = await updatePostRequest(id, newFields);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
      setCheckbox(false);
      return "success";
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get Employee
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
    deleteMultiple,
    checkbox,
    setCheckbox,
    selected,
    setSelected,
    isLoading,
  };

  return <postContext.Provider value={value}>{children}</postContext.Provider>;
};
