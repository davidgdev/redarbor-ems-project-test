import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePost } from "../context/postContext";

export default function Card({ post }) {
  const { deletePost } = usePost();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete this post?</p>
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
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">
      <div className="px-4 py-7">
        <div className="flex justify-between mb-3">
          <h2 className="text-lg">
            {post.Name} {post.Surname}
          </h2>
        </div>
        <div className="mb-4">
          <p>
            <strong>Email:</strong> {post.Email}
          </p>
          <p>
            <strong>Birth Date:</strong> {birthDate(post.DateOfBirth)}
          </p>
          <p>
            <strong>Role:</strong> {roleName(post.RoleId)}
          </p>
        </div>
        <div className="flex">
          <buton
            className="bg-green-600 text-sm px-2 py-1 rounded-sm mr-2 hover:bg-green-700"
            onClick={() => navigate(`/employees/${post._id}`)}
          >
            Edit
          </buton>
          <buton
            className="bg-red-600 text-sm px-2 py-1 rounded-sm hover:bg-red-700"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
          >
            delete
          </buton>
        </div>
      </div>
    </div>
  );
}
