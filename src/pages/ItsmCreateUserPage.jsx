import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmCreateUserPage = () => {
  usePageTitle('Create User');
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Analyst',
    status: 'Active',
    department: 'Support',
    phone: '',
    manager: '',
    startDate: '',
    notes: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear password error when passwords are being typed
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Creating user:', formData);
    // Reset form after submission
    setFormData({
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Analyst',
      status: 'Active',
      department: 'Support',
      phone: '',
      manager: '',
      startDate: '',
      notes: ''
    });
    setPasswordError('');
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Create User' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>Create New User</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <form onSubmit={handleSubmit}>
            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Username *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='username'
                  className='form-control'
                  placeholder='Enter username (e.g., jsmith)'
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Full Name *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='fullName'
                  className='form-control'
                  placeholder='Enter full name'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Email *</label>
              <div className='col-sm-10'>
                <input
                  type='email'
                  name='email'
                  className='form-control'
                  placeholder='Enter email address'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Password *</label>
              <div className='col-sm-5'>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <label className='form-label mb-0 col-sm-2'>Confirm Password *</label>
              <div className='col-sm-3'>
                <input
                  type='password'
                  name='confirmPassword'
                  className='form-control'
                  placeholder='Confirm password'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {passwordError && (
              <div className='row mb-24'>
                <div className='col-sm-10 offset-sm-2'>
                  <div className='alert alert-danger'>{passwordError}</div>
                </div>
              </div>
            )}

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Role *</label>
              <div className='col-sm-5'>
                <select
                  name='role'
                  className='form-select'
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value='Admin'>Admin</option>
                  <option value='Manager'>Manager</option>
                  <option value='Analyst'>Analyst</option>
                  <option value='Technician'>Technician</option>
                  <option value='Viewer'>Viewer</option>
                </select>
              </div>
              <label className='form-label mb-0 col-sm-2'>Status *</label>
              <div className='col-sm-3'>
                <select
                  name='status'
                  className='form-select'
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  <option value='Pending'>Pending</option>
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Department *</label>
              <div className='col-sm-5'>
                <select
                  name='department'
                  className='form-select'
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value='IT'>IT</option>
                  <option value='Operations'>Operations</option>
                  <option value='Support'>Support</option>
                  <option value='Infrastructure'>Infrastructure</option>
                  <option value='Security'>Security</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
              <label className='form-label mb-0 col-sm-2'>Phone</label>
              <div className='col-sm-3'>
                <input
                  type='tel'
                  name='phone'
                  className='form-control'
                  placeholder='Enter phone number'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Manager</label>
              <div className='col-sm-5'>
                <input
                  type='text'
                  name='manager'
                  className='form-control'
                  placeholder='Enter manager username or name'
                  value={formData.manager}
                  onChange={handleInputChange}
                />
              </div>
              <label className='form-label mb-0 col-sm-2'>Start Date</label>
              <div className='col-sm-3'>
                <input
                  type='date'
                  name='startDate'
                  className='form-control'
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Notes</label>
              <div className='col-sm-10'>
                <textarea
                  name='notes'
                  className='form-control'
                  rows='3'
                  placeholder='Additional notes about the user'
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-10 offset-sm-2'>
                <button type='submit' className='btn btn-primary-600 me-2'>
                  Create User
                </button>
                <Link to="/itsm/users" className='btn btn-secondary'>
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmCreateUserPage;
