import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        setError(e.message ?? "Error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p className="text-white/70">Loading…</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!post) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="mt-3 text-white/70">{post.body}</p>

      <div className="mt-6 flex gap-3">
        <Link className="text-sm underline text-white/80" to="/">
          Terug
        </Link>
        <Link className="text-sm underline text-white/80" to={`/posts/${id}/edit`}>
          Edit
        </Link>
      </div>
    </div>
  );
}
