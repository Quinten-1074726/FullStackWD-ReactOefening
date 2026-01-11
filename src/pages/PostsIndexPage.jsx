import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const LIMIT = 10;

function PostCard({ item, onDelete }) {
  const navigate = useNavigate();

  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="mt-2 text-sm text-white/70">{item.body}</p>

      <div className="mt-4 flex gap-3">
        <Link className="text-sm text-white/80 underline" to={`/posts/${item.id}`}>
          Details
        </Link>

        <button
          className="text-sm text-white/80 underline"
          onClick={() => navigate(`/posts/${item.id}/edit`)}
        >
          Edit
        </button>

        <button
          className="text-sm text-red-300 underline"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default function PostsIndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ 3.5 pagination state
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // ✅ 3.6 search/filter state
  const [query, setQuery] = useState("");

  const totalPages = Math.max(1, Math.ceil(totalCount / LIMIT));

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        // Server-side pagination
        const url = new URL(API_URL);
        url.searchParams.set("_page", String(page));
        url.searchParams.set("_limit", String(LIMIT));

        // Optioneel: query meegeven (API kan dit negeren; client filter werkt altijd)
        if (query.trim()) {
          url.searchParams.set("q", query.trim());
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // JSONPlaceholder geeft total count in header
        const countHeader = res.headers.get("x-total-count");
        const count = countHeader ? Number(countHeader) : 0;

        if (!ignore) {
          setPosts(data);
          if (!Number.isNaN(count) && count > 0) setTotalCount(count);
          // fallback als header ontbreekt (dan blijft totalPages 1)
          if (!countHeader) setTotalCount(0);
        }
      } catch (e) {
        if (!ignore) setError(e.message ?? "Error");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page, query]);

  // ✅ Client-side filter (werkt altijd)
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        (p.title ?? "").toLowerCase().includes(q) ||
        (p.body ?? "").toLowerCase().includes(q)
    );
  }, [posts, query]);

  async function handleDelete(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }
    // UI direct bijwerken
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handlePrev() {
    setPage((p) => Math.max(1, p - 1));
  }

  function handleNext() {
    // als totalCount onbekend is, laten we next wel toe (maar meestal is header er)
    if (totalCount > 0) setPage((p) => Math.min(totalPages, p + 1));
    else setPage((p) => p + 1);
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
    setPage(1); // bij nieuwe search terug naar pagina 1
  }

  return (
    <div className="space-y-4">
      {/* ✅ Search / filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <label className="block text-sm text-white/70">Zoeken</label>
          <input
            value={query}
            onChange={handleQueryChange}
            placeholder="Zoek in title/body..."
            className="mt-1 w-full rounded-lg bg-slate-900/60 p-2 ring-1 ring-white/10 outline-none focus:ring-white/30"
          />
          <p className="mt-1 text-xs text-white/40">
            Filter werkt altijd. (API-search kan per webservice verschillen.)
          </p>
        </div>

        {/* ✅ Pagination controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={page === 1 || loading}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 disabled:opacity-50"
          >
            ← Vorige
          </button>

          <div className="text-sm text-white/70">
            Pagina <span className="text-white">{page}</span>
            {totalCount > 0 && (
              <>
                {" "}
                / <span className="text-white">{totalPages}</span>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={(totalCount > 0 && page >= totalPages) || loading}
            className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 disabled:opacity-50"
          >
            Volgende →
          </button>
        </div>
      </div>

      {loading && <p className="text-white/70">Loading…</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <>
          <p className="text-sm text-white/50">
            Resultaten op deze pagina: {filteredPosts.length}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} item={post} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
