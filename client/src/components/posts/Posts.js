import Post from "../post/Post";

export default function Posts({ posts }) {
  return (
    <div className="row m-4">
      {posts.map((p, index) => (
        <Post key={index} post={p} />
      ))}
    </div>
  );
}
