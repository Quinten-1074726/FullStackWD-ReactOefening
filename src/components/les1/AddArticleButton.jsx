export default function AddArticleButton({ onAdd }) {
  return (
    <div className="mt-6">
      <button
        onClick={onAdd}
        className="rounded-lg bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20"
      >
        + Voeg artikel toe
      </button>
    </div>
  );
}
