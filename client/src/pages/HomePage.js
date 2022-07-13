import { usePost } from "../context/postContext";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { AiOutlineDelete } from "react-icons/ai";
import { VscEmptyWindow } from "react-icons/vsc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

export function HomePage() {
  const { posts, checkbox, selected, deleteMultiple, isLoading } = usePost();

  const handleDeleteMultiple = (selected) => {
    toast(
      (t) => (
        <div className="py-6">
          <p className="text-white mb-3">Do you want to delete this posts?</p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm "
              onClick={() => {
                deleteMultiple(selected);
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

  const renderEmployees = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col justify-center items-center">
          <AiOutlineLoading3Quarters className="w-20 h-20 animate-spin text-white mt-20" />
        </div>
      );
    } else if (posts.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl">There are no employees</h1>
        </div>
      );
    } else {
      return (
        <section className="grid md:grid-cols-2 lg:grid-vols-3 xl:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Card post={post} key={post._id} />
          ))}
        </section>
      );
    }
  };

  return (
    <main>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2x1 text-gray-300 font-bold">
          Number of Employees ({posts.length})
        </h1>
        <div>
          {checkbox ? (
            <button
              className="flex justify-between hover:bg-red-700 bg-red-600  px-4 w-40 py-2 disabled:bg-gray-400 text-white rounded"
              disabled={selected.length === 0}
              onClick={() => handleDeleteMultiple(selected)}
            >
              <AiOutlineDelete className="h-6" /> Delete Selected
            </button>
          ) : (
            <Link
              to="/create-employee"
              className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 rounded"
            >
              Create New Employee
            </Link>
          )}
        </div>
      </header>
      {renderEmployees()}
    </main>
  );
}
