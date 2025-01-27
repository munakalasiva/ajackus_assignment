import React, { Component } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: {},
      error: '',
      successMessage: '',
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: 'Unknown',
      }));
      this.setState({ users });
    } catch (error) {
      this.setState({ error: 'Failed to fetch users' });
    }
  };

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      currentUser: { ...prevState.currentUser, [name]: value },
    }));
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { currentUser, users } = this.state;

    try {
      if (currentUser.id && users.find(user => user.id === currentUser.id)) {
        
        await axios.put(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`, currentUser);
        this.setState({
          users: users.map(user => (user.id === currentUser.id ? currentUser : user)),
          currentUser: {},
          successMessage: 'User updated successfully!',
        });
      } else {
       
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
        const newUser = { ...currentUser, id: newId };
        await axios.post(`https://jsonplaceholder.typicode.com/users`, newUser); 
        this.setState({
          users: [...users, newUser],
          currentUser: {},
          successMessage: 'User added successfully!',
        });
      }
    } catch (error) {
      this.setState({ error: 'Failed to save user' });
    }
  };

  handleEdit = user => {
    this.setState({ currentUser: user, successMessage: '' });
  };

  handleDelete = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== id),
        successMessage: 'User deleted successfully!',
      }));
    } catch (error) {
      this.setState({ error: 'Failed to delete user' });
    }
  };

  render() {
    const { users, currentUser, error, successMessage } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <h1>User Management System</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <UserForm
            user={currentUser}
            onChange={this.handleFormChange}
            onSubmit={this.handleFormSubmit}
          />
          <UserList users={users} onEdit={this.handleEdit} onDelete={this.handleDelete} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;




