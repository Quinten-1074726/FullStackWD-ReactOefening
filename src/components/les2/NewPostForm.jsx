import { useState } from "react";

export default function NewPostForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: "", body: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <h3 className="text-lg font-semibold text-white">
        Nieuw artikel toevoegen
      </h3>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-sm text-white/70">
            Titel
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-slate-900 p-2 text-white outline-none ring-1 ring-white/10"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/70">
            Inhoud
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg bg-slate-900 p-2 text-white outline-none ring-1 ring-white/10"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white/10 px-4 py-2 font-medium hover:bg-white/20"
        >
          Toevoegen
        </button>
      </div>
    </form>
  );
}
