import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const BlogApp = () => {
  // States
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      console.log(exception);
    }
  };

  const addNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
    }
  };
  // Effects Hooks
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
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

  const BlogForm = ({ addNewBlog, title, author, url }) => {
    return (
      <>
        <h2>Create new blog</h2>
        <form onSubmit={addNewBlog}>
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
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    );
  };

  const App = ({ blogs, addNewBlog, title, url, author }) => {
    return (
      <>
        <BlogForm
          addNewBlog={addNewBlog}
          title={title}
          url={url}
          author={author}
        />

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
      {user === null ? (
        loginForm()
      ) : (
        <App
          blogs={blogs}
          addNewBlog={addNewBlog}
          title={title}
          url={url}
          author={author}
        />
      )}
      {}
    </div>
  );
};

export default BlogApp;
