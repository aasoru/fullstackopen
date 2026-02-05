import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, handleLike }) => {
  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.destroy(blog.id);
    }
    return;
  };
  return (
    <div className="blogItem blog">
      <span className="blogTitle">{blog.title}</span>{" "}
      <span className="blogAuthor">{blog.author}</span>
      <Togglable buttonLabel="view">
        <p className="blog-url">
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p className="blog-likes">
          Likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)} className="button-like">
            like
          </button>
        </p>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </Togglable>
    </div>
  );
};

export default Blog;
