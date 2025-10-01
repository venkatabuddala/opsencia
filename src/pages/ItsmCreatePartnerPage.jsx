import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmCreatePartnerPage = () => {
  usePageTitle('Create Partner');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    status: 'Active',
    services: '',
    address: '',
    website: '',
    contractStart: '',
    contractEnd: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Creating partner:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      status: 'Active',
      services: '',
      address: '',
      website: '',
      contractStart: '',
      contractEnd: '',
      notes: ''
    });
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Create Partner' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>Create New Partner</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <form onSubmit={handleSubmit}>
            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Partner Name *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Enter partner company name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Primary Contact *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='contact'
                  className='form-control'
                  placeholder='Enter primary contact person name'
                  value={formData.contact}
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
                  placeholder='Enter contact email address'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Phone *</label>
              <div className='col-sm-10'>
                <input
                  type='tel'
                  name='phone'
                  className='form-control'
                  placeholder='Enter contact phone number'
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Status *</label>
              <div className='col-sm-10'>
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
              <label className='form-label mb-0 col-sm-2'>Services *</label>
              <div className='col-sm-10'>
                <textarea
                  name='services'
                  className='form-control'
                  rows='3'
                  placeholder='Describe the services this partner provides'
                  value={formData.services}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Address</label>
              <div className='col-sm-10'>
                <textarea
                  name='address'
                  className='form-control'
                  rows='2'
                  placeholder='Enter partner company address'
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Website</label>
              <div className='col-sm-10'>
                <input
                  type='url'
                  name='website'
                  className='form-control'
                  placeholder='Enter partner website URL'
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Contract Start</label>
              <div className='col-sm-5'>
                <input
                  type='date'
                  name='contractStart'
                  className='form-control'
                  value={formData.contractStart}
                  onChange={handleInputChange}
                />
              </div>
              <label className='form-label mb-0 col-sm-2'>Contract End</label>
              <div className='col-sm-3'>
                <input
                  type='date'
                  name='contractEnd'
                  className='form-control'
                  value={formData.contractEnd}
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
                  placeholder='Additional notes about the partner'
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-10 offset-sm-2'>
                <button type='submit' className='btn btn-primary-600 me-2'>
                  Create Partner
                </button>
                <Link to="/itsm/partners" className='btn btn-secondary'>
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

export default ItsmCreatePartnerPage;
