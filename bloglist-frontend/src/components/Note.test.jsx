import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders title and author but does not render url or number of likes by default', () => {
  const blog = {
    title: 'Testing React components',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'johndoe',
      name: 'John Doe',
      id: '12345'
    },
    id: '1'
  };

  const user = {
    username: 'johndoe',
  };


  render(<Blog blog={blog}  user={user} />);

  const titleAuthorElement = screen.getByText('Testing React components John Doe');
  expect(titleAuthorElement).toBeDefined();

  const urlElement = screen.queryByText('http://example.com');
  expect(urlElement).toBeNull();

  const likesElement = screen.queryByText('5 likes');
  expect(likesElement).toBeNull();
});

test('renders URL and number of likes when the view button is clicked', async () => {
  const blog = {
    title: 'Testing React components',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
    user: {
      username: 'johndoe',
      name: 'John Doe',
      id: '12345'
    },
    id: '1'
  };

  const user = {
    username: 'johndoe',
  };



  render(<Blog blog={blog} user={user} />);


  const viewButton = screen.getByText('view');
  await userEvent.click(viewButton);


  const urlElement = screen.getByText('http://example.com');
  expect(urlElement).toBeDefined();

 
  const likesElement = screen.getByText('5 likes');
  expect(likesElement).toBeDefined();
});