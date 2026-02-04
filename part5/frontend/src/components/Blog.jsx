import Togglable from "./Togglable";

const Blog = ({ blog }) => (
  <div className="blogItem">
    {blog.title}
    <Togglable buttonLabel="view">
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes: {blog.likes}{" "}
        <button
          onClick={() => {
            console.log("like!");
          }}
        >
          like
        </button>
      </p>
      <p>{blog.author}</p>
    </Togglable>
  </div>
);

export default Blog;
