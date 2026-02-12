import Togglable from "./Togglable";

const Blog = ({ blog, handleLike, handleDelete }) => {
  return (
    <div className="blogItem blog">
      <span className="blogTitle">{blog.title}</span>{" "}
      <span className="blogAuthor">{blog.author}</span>
      <Togglable buttonLabel="view">
        <p className="blog-url">
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p className="blog-likes">
          Likes: <span className="blog-likes-number">{blog.likes} </span>
          <button onClick={(e) => handleLike(e, blog)} className="button-like">
            like
          </button>
        </p>
        <button onClick={(e) => handleDelete(e, blog)}>delete</button>
      </Togglable>
    </div>
  );
};

export default Blog;
