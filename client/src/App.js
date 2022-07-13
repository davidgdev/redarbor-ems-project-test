import { Routes, Route } from "react-router-dom";
import { PostForm, HomePage, NotFoundPage } from "./pages/index";
import { PostProvider } from "./context/postContext";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-900 ">
      <div className="px-10 container flex flex-col min-h-screen m-auto py-4">
        <PostProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-employee" element={<PostForm />} />
            <Route path="/employees/:id" element={<PostForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}

export default App;
