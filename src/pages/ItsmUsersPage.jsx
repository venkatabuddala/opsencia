import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmUsersPage = () => {
  usePageTitle('Users');
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', fullName: 'Admin User', email: 'admin@opsencia.com', role: 'Admin', status: 'Active', department: 'IT', lastLogin: '2025-01-15 10:30', created: '2024-01-01' },
    { id: 2, username: 'jkim', fullName: 'John Kim', email: 'john.kim@opsencia.com', role: 'Manager', status: 'Active', department: 'Operations', lastLogin: '2025-01-15 09:15', created: '2024-02-15' },
    { id: 3, username: 'schen', fullName: 'Sarah Chen', email: 'sarah.chen@opsencia.com', role: 'Analyst', status: 'Active', department: 'Support', lastLogin: '2025-01-14 16:45', created: '2024-03-10' },
    { id: 4, username: 'mnovak', fullName: 'Mike Novak', email: 'mike.novak@opsencia.com', role: 'Technician', status: 'Inactive', department: 'Infrastructure', lastLogin: '2025-01-10 14:20', created: '2024-01-20' },
    { id: 5, username: 'araj', fullName: 'Aisha Raj', email: 'aisha.raj@opsencia.com', role: 'Analyst', status: 'Active', department: 'Support', lastLogin: '2025-01-15 08:30', created: '2024-04-05' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesDepartment = departmentFilter === 'All' || user.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'bg-success-main' : 'bg-neutral-400';
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin': return 'bg-danger-main';
      case 'Manager': return 'bg-primary-600';
      case 'Analyst': return 'bg-info';
      case 'Technician': return 'bg-warning-main';
      default: return 'bg-neutral-400';
    }
  };

  const getDepartmentBadge = (department) => {
    switch (department) {
      case 'IT': return 'bg-primary-600';
      case 'Operations': return 'bg-success-main';
      case 'Support': return 'bg-info';
      case 'Infrastructure': return 'bg-warning-main';
      default: return 'bg-neutral-400';
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Users' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
          <h6 className='mb-0'>User Management</h6>
          <Link to="/itsm/users/create" className='btn btn-primary-600 btn-sm'>
            <Icon icon='mdi:plus' className='me-8' /> Add User
          </Link>
        </div>
        <div className='card-body p-20 pt-12'>
          {/* Filters */}
          <div className='row mb-24 gy-3'>
            <div className='col-md-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='col-md-2'>
              <select
                className='form-select'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value='All'>All Status</option>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
              </select>
            </div>
            <div className='col-md-2'>
              <select
                className='form-select'
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value='All'>All Roles</option>
                <option value='Admin'>Admin</option>
                <option value='Manager'>Manager</option>
                <option value='Analyst'>Analyst</option>
                <option value='Technician'>Technician</option>
              </select>
            </div>
            <div className='col-md-2'>
              <select
                className='form-select'
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value='All'>All Depts</option>
                <option value='IT'>IT</option>
                <option value='Operations'>Operations</option>
                <option value='Support'>Support</option>
                <option value='Infrastructure'>Infrastructure</option>
              </select>
            </div>
            <div className='col-md-3'>
              <span className='text-sm text-secondary-light'>
                Total: {filteredUsers.length} users
              </span>
            </div>
          </div>

          {/* Users Table */}
          <div className='table-responsive'>
            <table className='table mb-0'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Department</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className='fw-semibold'>{user.id}</td>
                    <td className='fw-medium'>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getDepartmentBadge(user.department)}`}>
                        {user.department}
                      </span>
                    </td>
                    <td className='text-sm'>{user.lastLogin}</td>
                    <td className='text-sm'>{user.created}</td>
                    <td>
                      <div className='d-flex align-items-center gap-2'>
                        <Link
                          to={`/itsm/users/${user.id}`}
                          className='btn btn-outline-primary-600 btn-sm'
                          title='View'
                        >
                          <Icon icon='mdi:eye' className='text-sm' />
                        </Link>
                        <Link
                          to={`/itsm/users/${user.id}/edit`}
                          className='btn btn-outline-warning btn-sm'
                          title='Edit'
                        >
                          <Icon icon='mdi:pencil' className='text-sm' />
                        </Link>
                        <button
                          type='button'
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => handleDelete(user.id)}
                          title='Delete'
                        >
                          <Icon icon='mdi:delete' className='text-sm' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={10} className='text-center text-secondary-light py-24'>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmUsersPage;

