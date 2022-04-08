import { useState } from "react";
import axios from "axios";

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={handleClick}>{showMore ? "hide" : "view"}</button>
      {showMore && <More blog={blog} />}
    </div>
  );
};

export default Blog;
const More = ({ blog }) => {
  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    axios
      .put(`http://localhost:3001/api/blogs/${blog.id}`, blogObject)
      .then((response) => {
        blog.likes = response.data.likes;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
    </>
  );
};
