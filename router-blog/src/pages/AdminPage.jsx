import { Link, useLoaderData } from 'react-router';
import { useAuth } from '../context/AuthContext';
import PostActions from '../components/PostActions';

export default function AdminPage() {
  const { user } = useAuth();
  const posts = useLoaderData();

  return (
    <section>
      <h1>Мої пости</h1>
      <p>Вітаємо, <strong>{user.name}</strong>! У вас постів: {posts.length}</p>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-card__title">{post.title}</Link>
            <PostActions post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
