import axios from "axios";

// Get Employees
export const getPostsRequest = async () => await axios.get("/employees");
// Create New Employee
export const createPostRequest = async (post) =>
  await axios.post("/employees", post);
// Edit Employee
export const updatePostRequest = async (id, newFields) =>
  await axios.put(`/employees/${id}`, newFields);
// Delete Employee
export const deletePostRequest = async (id) =>
  await axios.delete(`/employees/` + id);
// Delte Multiple
export const deleteMultiplePostRequest = async (ids) =>
  await axios.delete(`/employees/delete/${ids}`);
// Get Employee
export const getPostRequest = async (id) => await axios.get("/employees/" + id);
