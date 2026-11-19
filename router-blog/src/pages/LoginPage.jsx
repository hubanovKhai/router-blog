import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const from = location.state?.from?.pathname ?? searchParams.get('redirectTo') ?? '/';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !password) return setError('Введіть ім’я та пароль');
    try {
      await login(name.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Вхід або реєстрація</h1>
      <p className="hint">Тестові акаунти: <code>Олена / 1234</code> або <code>Андрій / 1234</code>. Нове ім’я створить новий акаунт.</p>
      <label className="form__field">
        <span>Ім’я</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше ім'я" />
      </label>
      <label className="form__field">
        <span>Пароль</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn">Увійти</button>
    </form>
  );
}
