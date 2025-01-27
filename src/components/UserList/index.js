import { Component } from 'react';
class UserList extends Component {
    render() {
      const { users, onEdit, onDelete } = this.props;
      return (
        <div>
          <h2>User List</h2>
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <button onClick={() => onEdit(user)}>Edit</button>
                    <button onClick={() => onDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  export default UserList