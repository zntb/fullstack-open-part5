import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);

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
          <p>{user.name} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
