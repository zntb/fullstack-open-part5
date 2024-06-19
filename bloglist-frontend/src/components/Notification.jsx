const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: '10px',
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: 'lightgrey',
    border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    marginBottom: '10px',
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
