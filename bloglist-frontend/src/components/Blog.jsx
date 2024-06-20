import { useState } from 'react';

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
