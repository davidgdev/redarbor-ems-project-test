import { usePost } from "../context/postContext";
import { Link, Navigate } from "react-router-dom";
import Card from "../components/Card";

export function HomePage() {
  const { posts } = usePost();

  return (
    <main>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2x1 text-gray-300 font-bold">
          Number of Employees ({posts.length})
        </h1>
        <Link
          to="/create-employee"
          className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Create New Employee
        </Link>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-vols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Card post={post} key={post._id} />
        ))}
      </div>
    </main>
  );
}
