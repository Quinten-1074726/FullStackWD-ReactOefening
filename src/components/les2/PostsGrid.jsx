import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import NewPostForm from "./NewPostForm";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostsGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Fout bij ophalen data");

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  async function handleAddPost(newPost) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newPost.title,
        body: newPost.body,
        userId: 1,
      }),
    });

    const createdPost = await response.json();

    // lijst bijwerken (lifted state)
    setPosts((prev) => [createdPost, ...prev]);
  }

  if (loading) return <p className="text-white/70">Loading…</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.slice(0, 10).map((post) => (
          <PostCard key={post.id} item={post} />
        ))}
      </div>

      <NewPostForm onAdd={handleAddPost} />
    </>
  );
}
