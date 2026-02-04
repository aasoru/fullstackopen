import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const likeBlog = async (blog) => {
    await blogService.update(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.destroy(blog.id);
    }
    return;
  };
  return (
    <div className="blogItem">
      {blog.title}
      <Togglable buttonLabel="view">
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}{" "}
          <button onClick={() => likeBlog(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </Togglable>
    </div>
  );
};

export default Blog;
