import { useState, useEffect } from "react";
import { usePost } from "../context/postContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    Name: yup
      .string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Name is Required"),
    Surname: yup.string().min(2, "Too Short!").max(100, "Too Long!"),
    Email: yup.string().email("Invalid email").required("Email is Required"),
    DateOfBirth: yup.date().required("Birthdate is required"),
    RoleId: yup
      .number()
      .positive()
      .min(1, "Role ID has to be 1, 2 or 3")
      .max(3, "Role ID has to be 1, 2 or 3")
      .required("Role ID is required"),
  })
  .required();

export function PostForm() {
  const [post, setPost] = useState(null);

  const { createPost, getPost, updatePost, isLoading } = usePost();

  const params = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        const date = post.DateOfBirth.substring(
          0,
          post.DateOfBirth.indexOf("T")
        );

        setPost({
          Name: post.Name,
          Surname: post.Surname,
          Email: post.Email,
          DateOfBirth: date,
          RoleId: post.RoleId,
        });
      }
    })();
  }, [params.id, getPost]);

  useEffect(() => {
    reset(post);
  }, [post]);

  const onSubmit = async (data) => {
    const validateResponse = () => {
      if (res === "success") {
        navigate("/");
      } else {
        Object.keys(res.response.data).forEach((key) => {
          setError(key, { type: "custom", message: res.response.data[key] });
        });
      }
    };

    let res;

    if (!params.id) {
      res = await createPost(data);
      validateResponse();
    } else {
      res = await updatePost(params.id, data);
      validateResponse();
    }
  };

  return (
    <div className="max-w-md m-auto">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h2 className="text-lg">
            {!params.id ? "New Employee" : "Edit Employee"}
          </h2>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="Name"
            className="text-sm block font-bold mb-2 text-gray-400"
          >
            Name
          </label>
          <input
            type="text"
            name="Name"
            placeholder="Enter a Name"
            {...register("Name")}
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
          />
          <p className="text-red-400 text-sm">{errors.Name?.message}</p>
          <label
            htmlFor="Surname"
            className="text-sm block font-bold mb-2 text-gray-400"
          >
            Surname
          </label>
          <input
            type="text"
            name="Surname"
            placeholder="Enter a Surname"
            {...register("Surname")}
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
          />
          <p className="text-red-400 text-sm">{errors.Surname?.message}</p>
          <label
            htmlFor="Email"
            className="text-sm block font-bold mb-2 text-gray-400"
          >
            Email
          </label>
          <input
            type="email"
            name="Email"
            placeholder="Enter an Email"
            {...register("Email")}
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
          />
          <p className="text-red-400 text-sm">{errors.Email?.message}</p>
          <label
            htmlFor="DateOfBirth"
            className="text-sm block font-bold mb-2 text-gray-400"
          >
            Birth Date
          </label>
          <input
            type="date"
            name="DateOfBirth"
            {...register("DateOfBirth")}
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
          />
          <p className="text-red-400 text-sm">{errors.DateOfBirth?.message}</p>
          <label
            htmlFor="RoleId"
            className="text-sm block font-bold mb-2 text-gray-400"
          >
            Role ID
          </label>
          <input
            type="number"
            name="RoleId"
            placeholder="Enter a Role ID"
            {...register("RoleId")}
            className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
          />
          <p className="text-red-400 text-sm">{errors.RoleId?.message}</p>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-gray-400"
            disabled={isLoading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
