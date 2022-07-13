import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePost } from "../context/postContext";

import profilePicture from "../images/profile-picture.svg";

export default function Card({ post }) {
  const { deletePost, checkbox, setCheckbox, selected, setSelected } =
    usePost();

  const handleOnClick = () => {
    setCheckbox(!checkbox);
    selected.length = 0;
  };

  const handleCheckbox = (event) => {
    const { checked, value } = event.currentTarget;
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="py-6">
          <p className="text-white mb-3">Do you want to delete this post?</p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm "
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={(t) => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  const roleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "Developer";

      case 2:
        return "Team Leader";

      case 3:
        return "CTO";

      default:
        return "";
    }
  };

  const birthDate = (birthDate) => {
    const date = birthDate.substring(0, birthDate.indexOf("T"));
    return date;
  };
  const navigate = useNavigate();

  return (
    <article className="bg-zinc-800 text-white rounded-lg shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer box-content px-4 py-5">
      {checkbox && (
        <div className="py-1">
          <input
            type="checkbox"
            value={post._id}
            className="border-gray-300 rounded h-4 w-4"
            onChange={(e) => handleCheckbox(e)}
          />
        </div>
      )}
      <div onClick={handleOnClick}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col mb-3">
            <h2 className="text-md font-medium">
              {post.Name} {post.Surname}
            </h2>
            <p className="text-sm">{roleName(post.RoleId)}</p>
          </div>
          <div className="mr-4">
            <img src={profilePicture} alt="Profile Picture" className="w-10" />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm">
            <strong>Email:</strong> {post.Email}
          </p>
          <p className="text-sm">
            <strong>Birth Date:</strong> {birthDate(post.DateOfBirth)}
          </p>
        </div>
        <div className="flex">
          <button
            className="bg-green-600 text-sm px-2 py-1 rounded mr-2 hover:bg-green-700 disabled:bg-gray-400"
            onClick={() => navigate(`/employees/${post._id}`)}
            disabled={checkbox}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-sm px-2 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
            disabled={checkbox}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
