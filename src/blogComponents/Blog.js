import { useState } from "react";

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
const More = ({ blog }) => (
  <>
    <div>{blog.url}</div>
    <div>
      likes {blog.likes} <button>like</button>
    </div>
    <div>{blog.user.name}</div>
  </>
);
