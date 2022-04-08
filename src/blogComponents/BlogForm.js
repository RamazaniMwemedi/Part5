import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  }

  const handleUrl = (event) => {
    setUrl(event.target.value);
  }

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      title, author, url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new </h2>

      <form onSubmit={addNote}>
        <lable>
          title: <input type="text" value={title} onChange={handleTitle} />
        </lable>
        <br />
        <lable>
          author: <input type="text" value={author} onChange={handleAuthor} />
        </lable>
        <br />
        <lable>
          url: <input type="text" value={url} onChange={handleUrl} />
        </lable>
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
