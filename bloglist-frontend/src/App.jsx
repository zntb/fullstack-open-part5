import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs);
      };
      fetchBlogs();
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setCredentials({ username: '', password: '' });
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleChange = ({ target }) => {
    setCredentials({
      ...credentials,
      [target.name]: target.value,
    });
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const handleBlogChange = ({ target }) => {
    setNewBlog({
      ...newBlog,
      [target.name]: target.value,
    });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNewBlog({ title: '', author: '', url: '' });
    } catch (exception) {
      console.error('Error adding blog:', exception.response.data);
    }
  };

  return (
    <div>
      {!user ? (
        <LoginForm
          credentials={credentials}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
            addBlog={addBlog}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
