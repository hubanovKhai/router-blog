import { Form, Link, useActionData, useNavigation } from 'react-router';

export default function PostForm({ post, submitLabel, cancelTo }) {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSaving = navigation.state === 'submitting';
  const errors = actionData?.errors ?? {};
  const values = actionData?.values ?? post ?? { title: '', body: '' };

  return (
    <Form method="post" className="form" noValidate>
      <label className="form__field">
        <span>Заголовок</span>
        <input name="title" defaultValue={values.title} />
        {errors.title && <small className="error">{errors.title}</small>}
      </label>
      <label className="form__field">
        <span>Текст</span>
        <textarea name="body" rows={8} defaultValue={values.body} />
        {errors.body && <small className="error">{errors.body}</small>}
      </label>
      <div className="form__buttons">
        <button type="submit" className="btn" disabled={isSaving}>
          {isSaving ? 'Збереження…' : submitLabel}
        </button>
        <Link to={cancelTo} className="btn btn--ghost">Скасувати</Link>
      </div>
    </Form>
  );
}
