import { useState, useEffect, useRef } from "react";
import Blog from "./blogComponents/Blog";
import Togglable from "./blogComponents/Togglable";
import BlogForm from "./blogComponents/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
const BlogApp = () => {
  // States
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]= useState("")
  const [error, setError]= useState("")

  const blogFormRef = useRef()

  // Handlers

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError(exception.response.data.error);
    }
  };

  const addNewBlog = async (blogObject) => {
    
    try {
      const returnedBlog = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setBlogs(blogs.concat(returnedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };
  // Effects Hooks

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
      {error.length > 0 && errorNotification()}
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  

  const notification = () => <div className="notification">{message}</div>;

  const errorNotification = () => <div className="error">{error}</div>;

  const App = ({ blogs, message}) => {
    return (
      <>
        {message.length > 0 && notification()}
        
        <Togglable buttonLabel="add new note">
          <BlogForm createNote={addNewBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      {user === null ? null : (
        <div>
          <h2>blogs</h2>
          <h4>
            {user.name} logged in{" "}
            <button
              type="reset"
              onClick={() => {
                window.localStorage.removeItem("loggedNoteappUser");
                setUser(null);
              }}
            >
              logout
            </button>
          </h4>
        </div>
      )}
      {user === null ? loginForm() : <App blogs={blogs} message={message} />}
      {}
    </div>
  );
};

export default BlogApp;
