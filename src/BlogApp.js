import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const BlogApp = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = async (event) => {
     event.preventDefault();
     try {
       const user = await loginService.login({
         username,
         password,
       });
       window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
       setUser(user);
       setUsername("");
       setPassword("");
     } catch (exception) {
       console.log(exception);
     }
   };

   

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
  return (
    <div>
      {user === null ? null : (
        <div>
          <h2>blogs</h2>
          <h4>
            {user.name} logged in{" "}
            <button
              type="reset"
              onClick={() =>{
                window.localStorage.removeItem("loggedNoteappUser")
                setUser(null)
              }}
            >
              logout
            </button>
          </h4>
        </div>
      )}
      {user === null
        ? loginForm()
        : blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      {}
    </div>
  );
};

export default BlogApp;
