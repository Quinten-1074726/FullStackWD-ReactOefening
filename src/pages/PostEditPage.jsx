import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFormData({ title: data.title ?? "", body: data.body ?? "" });
      } catch (e) {
        setError(e.message ?? "Error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: 1, id: Number(id) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();

      navigate(`/posts/${id}`);
    } catch (e) {
      setError(e.message ?? "Error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-white/70">Loading…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-xl font-bold">Edit post #{id}</h2>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm text-white/70">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-slate-900/60 p-2 ring-1 ring-white/10 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/70">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-lg bg-slate-900/60 p-2 ring-1 ring-white/10 outline-none"
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          disabled={saving}
          className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 disabled:opacity-50"
        >
          {saving ? "Opslaan…" : "Opslaan (PUT)"}
        </button>
      </div>
    </form>
  );
}
