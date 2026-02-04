import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
