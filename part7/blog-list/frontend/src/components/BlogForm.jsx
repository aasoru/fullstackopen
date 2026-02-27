import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <form onSubmit={addBlog}>
      <div class="mb-3">
        <label className="form-label">title</label>
        <input
          className="form-control"
          type="text"
          value={title}
          name="Title"
          placeholder="write title here"
          data-testid="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="form-label">author</label>
        <input
          className="form-control"
          type="text"
          value={author}
          name="Author"
          placeholder="write author here"
          data-testid="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label className="form-label">
          url
          <input
            className="form-control"
            type="text"
            value={url}
            name="Url"
            placeholder="write url here"
            data-testid="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
      </div>
      <button className="btn btn-primary" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
