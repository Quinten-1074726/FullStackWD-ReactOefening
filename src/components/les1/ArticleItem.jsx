export default function ArticleItem({ item }) {
  return (
    <li>
      <article className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-white">{item.title}</h2>

        {/* extra info mag, hoeft niet */}
        {item.body && <p className="mt-2 text-sm text-white/70">{item.body}</p>}
      </article>
    </li>
  );
}
