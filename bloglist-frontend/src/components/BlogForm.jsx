const BlogForm = ({ newBlog, handleBlogChange, addBlog }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
);

export default BlogForm;
