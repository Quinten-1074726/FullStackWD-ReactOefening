import { NavLink, Route, Routes } from "react-router";
import PostsIndexPage from "./pages/PostsIndexPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostEditPage from "./pages/PostEditPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <h1 className="text-lg font-bold">Les 3 - CRUD</h1>
          <nav className="flex gap-3 text-sm">
            <NavLink className="text-white/70 hover:text-white" to="/">
              Overzicht
            </NavLink>
            <NavLink className="text-white/70 hover:text-white" to="/create">
              Create
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4">
        <Routes>
          <Route path="/" element={<PostsIndexPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<PostCreatePage />} />
          <Route path="/posts/:id/edit" element={<PostEditPage />} />
        </Routes>
      </main>
    </div>
  );
}
