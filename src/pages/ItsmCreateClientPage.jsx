import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmCreateClientPage = () => {
  usePageTitle('Create Client');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    status: 'Active',
    industry: '',
    tier: 'Business',
    address: '',
    website: '',
    contractValue: '',
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
    console.log('Creating client:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      status: 'Active',
      industry: '',
      tier: 'Business',
      address: '',
      website: '',
      contractValue: '',
      contractStart: '',
      contractEnd: '',
      notes: ''
    });
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Create Client' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>Create New Client</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <form onSubmit={handleSubmit}>
            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Client Name *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Enter client company name'
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
              <div className='col-sm-5'>
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
              <label className='form-label mb-0 col-sm-2'>Tier *</label>
              <div className='col-sm-3'>
                <select
                  name='tier'
                  className='form-select'
                  value={formData.tier}
                  onChange={handleInputChange}
                  required
                >
                  <option value='Enterprise'>Enterprise</option>
                  <option value='Business'>Business</option>
                  <option value='Startup'>Startup</option>
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Industry *</label>
              <div className='col-sm-10'>
                <select
                  name='industry'
                  className='form-select'
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>Select Industry</option>
                  <option value='Technology'>Technology</option>
                  <option value='Retail'>Retail</option>
                  <option value='E-commerce'>E-commerce</option>
                  <option value='Marketing'>Marketing</option>
                  <option value='Financial Services'>Financial Services</option>
                  <option value='Healthcare'>Healthcare</option>
                  <option value='Education'>Education</option>
                  <option value='Manufacturing'>Manufacturing</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Address</label>
              <div className='col-sm-10'>
                <textarea
                  name='address'
                  className='form-control'
                  rows='2'
                  placeholder='Enter client company address'
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
                  placeholder='Enter client website URL'
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Contract Value</label>
              <div className='col-sm-5'>
                <input
                  type='text'
                  name='contractValue'
                  className='form-control'
                  placeholder='Enter contract value (e.g., $50,000)'
                  value={formData.contractValue}
                  onChange={handleInputChange}
                />
              </div>
              <label className='form-label mb-0 col-sm-2'>Contract Start</label>
              <div className='col-sm-3'>
                <input
                  type='date'
                  name='contractStart'
                  className='form-control'
                  value={formData.contractStart}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Contract End</label>
              <div className='col-sm-5'>
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
                  placeholder='Additional notes about the client'
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-10 offset-sm-2'>
                <button type='submit' className='btn btn-primary-600 me-2'>
                  Create Client
                </button>
                <Link to="/itsm/clients" className='btn btn-secondary'>
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

export default ItsmCreateClientPage;
