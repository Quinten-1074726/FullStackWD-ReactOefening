export default function PostCard({ item }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-white">
        {item.title}
      </h2>

      <p className="mt-2 text-sm text-white/70">
        {item.body}
      </p>

      <p className="mt-3 text-xs text-white/40">
        Post ID: {item.id}
      </p>
    </article>
  );
}
