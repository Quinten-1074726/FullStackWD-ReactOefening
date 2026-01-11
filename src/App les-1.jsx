import { useState } from "react";
import ArticleItem from "./components/ArticleItem";
import AddArticleButton from "./components/AddArticleButton";

export default function App() {
  const [articles, setArticles] = useState([
    { id: 1, title: "Eerste artikel", body: "Artikel 1" },
    { id: 2, title: "Tweede artikel", body: "Artikel 2" },
    { id: 3, title: "Derde artikel", body: "Artikel 3" },
  ]);

  function handleAddArticle() {
    const newArticle = {
      id: Date.now(),
      title: `Nieuw artikel #${articles.length + 1}`,
      body: "Lorem ipsum (nieuw toegevoegd).",
    };

    setArticles((prev) => [...prev, newArticle]);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="mt-1 text-white/60">
          Opdracht 1.2 & 1.3 (map + component + button)
        </p>

        <ul className="mt-6 space-y-4">
          {articles.map((item) => (
            <ArticleItem key={item.id} item={item} />
          ))}
        </ul>

        <AddArticleButton onAdd={handleAddArticle} />
      </div>
    </div>
  );
}
