import { useState } from "react";
import { useNavigate } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: 1 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();

      // na create door naar detail
      navigate(`/posts/${created.id}`);
    } catch (e) {
      setError(e.message ?? "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-xl font-bold">Create post</h2>

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
          {saving ? "Opslaan…" : "Aanmaken"}
        </button>
      </div>
    </form>
  );
}
