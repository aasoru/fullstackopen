import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const blogFormRef = useRef();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");

      // TOKEN
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    setSuccessMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`,
    );
    blogFormRef.current.toggleVisibility();

    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const likeBlog = async (e, blog) => {
    e.preventDefault();
    await blogService.update(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });

    await blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const deleteBlog = async (e, blog) => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.destroy(blog.id);

      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
    return;
  };

  const loginForm = () => (
    <Togglable showButtonLabel="login" hideButtonLabel="cancel">
      <h2>Log in to application</h2>
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable
      showButtonLabel="new blog"
      hideButtonLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  return (
    <div>
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div>
            <p>
              {user.name} logged-in{" "}
              <button
                onClick={() => {
                  setUser(null);
                  window.localStorage.removeItem("loggedBlogappUser");
                }}
              >
                logout
              </button>
            </p>
            {blogForm()}
          </div>
        </>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={likeBlog}
          handleDelete={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
