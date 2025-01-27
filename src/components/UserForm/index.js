import { Component } from 'react';
class UserForm extends Component {
    render() {
      const { user, onChange, onSubmit, isEditing } = this.props;
      return (
        <div>
          <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>ID:</label>
              <input
                type="text"
                name="id"
                value={user.id || ''}
                onChange={onChange}
                disabled={isEditing}
              />
            </div>
            <div>
              <label>First Name:</label>
              <input type="text" name="firstName" value={user.firstName || ''} onChange={onChange} />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" name="lastName" value={user.lastName || ''} onChange={onChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={user.email || ''} onChange={onChange} />
            </div>
            <div>
              <label>Department:</label>
              <input type="text" name="department" value={user.department || ''} onChange={onChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }

export default UserForm  