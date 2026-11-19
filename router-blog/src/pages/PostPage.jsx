import { Link, useLoaderData } from 'react-router';
import PostActions from '../components/PostActions';

export default function PostPage() {
  const post = useLoaderData();
  return (
    <article className="post-article">
      <Link to="/" className="back-link">← Усі пости</Link>
      <h1>{post.title}</h1>
      <Link to={`/?author=${encodeURIComponent(post.authorName)}`} className="tag">
        Автор: {post.authorName}
      </Link>
      <p className="post-body">{post.body}</p>
      <PostActions post={post} />
    </article>
  );
}
