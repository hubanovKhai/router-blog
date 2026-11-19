import { data } from 'react-router';

const API_URL = 'http://localhost:3001';

const FALLBACK_POSTS = [
  { id: '1', title: 'Знайомство з React Router', body: 'React Router дозволяє створювати багатосторінкові SPA…', authorId: '1', authorName: 'Олена', createdAt: '2026-10-01T09:00:00.000Z' },
  { id: '2', title: 'Flexbox за 10 хвилин', body: 'Flexbox — одновимірна система розмітки…', authorId: '2', authorName: 'Андрій', createdAt: '2026-10-05T15:10:00.000Z' },
  { id: '3', title: 'Хуки у React', body: 'Хуки — це функції, які дозволяють функціональним компонентам…', authorId: '1', authorName: 'Олена', createdAt: '2026-10-10T11:20:00.000Z' },
];

export async function request(path, options = {}) {
  if (import.meta.env.PROD) {
    if (path === '/posts') return FALLBACK_POSTS;
    if (path.startsWith('/posts/')) {
      const id = path.split('/')[2];
      const post = FALLBACK_POSTS.find((p) => p.id === id);
      if (!post) throw data('Запис не знайдено', { status: 404 });
      return post;
    }
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw data('Немає зв’язку з базою даних. Запустіть npm run server', { status: 503 });
  }
  if (res.status === 404) throw data('Запис не знайдено', { status: 404 });
  if (!res.ok) throw data('Помилка сервера', { status: res.status });
  return res.json();
}
