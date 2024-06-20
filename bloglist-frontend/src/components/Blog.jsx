import React, { useState } from 'react';

const Blog = ({ blog, updateBlogLikes }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    await updateBlogLikes(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
