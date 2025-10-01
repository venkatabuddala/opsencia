import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmPartnersPage = () => {
  usePageTitle('Partners');
  const [partners, setPartners] = useState([
    { id: 1, name: 'TechCorp', contact: 'John Smith', email: 'john@techcorp.com', phone: '+1-555-0101', status: 'Active', services: 'Infrastructure, Cloud', joined: '2024-01-15' },
    { id: 2, name: 'DataFlow Inc', contact: 'Sarah Johnson', email: 'sarah@dataflow.com', phone: '+1-555-0102', status: 'Active', services: 'Database, Analytics', joined: '2024-02-20' },
    { id: 3, name: 'PayTech', contact: 'Mike Chen', email: 'mike@paytech.com', phone: '+1-555-0103', status: 'Active', services: 'Payment Processing', joined: '2024-03-10' },
    { id: 4, name: 'WebServ', contact: 'Lisa Wang', email: 'lisa@webserv.com', phone: '+1-555-0104', status: 'Inactive', services: 'Web Services', joined: '2024-01-05' },
    { id: 5, name: 'APIGate', contact: 'David Brown', email: 'david@apigate.com', phone: '+1-555-0105', status: 'Active', services: 'API Management', joined: '2024-04-12' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      setPartners(partners.filter(partner => partner.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'bg-success-main' : 'bg-neutral-400';
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Partners' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
          <h6 className='mb-0'>Partners Management</h6>
          <Link to="/itsm/partners/create" className='btn btn-primary-600 btn-sm'>
            <Icon icon='mdi:plus' className='me-8' /> Add Partner
          </Link>
        </div>
        <div className='card-body p-20 pt-12'>
          {/* Filters */}
          <div className='row mb-24 gy-3'>
            <div className='col-md-6'>
              <input
                type='text'
                className='form-control'
                placeholder='Search partners...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='col-md-3'>
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
            <div className='col-md-3'>
              <span className='text-sm text-secondary-light'>
                Total: {filteredPartners.length} partners
              </span>
            </div>
          </div>

          {/* Partners Table */}
          <div className='table-responsive'>
            <table className='table mb-0'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Services</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map(partner => (
                  <tr key={partner.id}>
                    <td className='fw-semibold'>{partner.id}</td>
                    <td className='fw-medium'>{partner.name}</td>
                    <td>{partner.contact}</td>
                    <td>{partner.email}</td>
                    <td>{partner.phone}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(partner.status)}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className='text-sm'>{partner.services}</td>
                    <td className='text-sm'>{partner.joined}</td>
                    <td>
                      <div className='d-flex align-items-center gap-2'>
                        <Link
                          to={`/itsm/partners/${partner.id}`}
                          className='btn btn-outline-primary-600 btn-sm'
                          title='View'
                        >
                          <Icon icon='mdi:eye' className='text-sm' />
                        </Link>
                        <Link
                          to={`/itsm/partners/${partner.id}/edit`}
                          className='btn btn-outline-warning btn-sm'
                          title='Edit'
                        >
                          <Icon icon='mdi:pencil' className='text-sm' />
                        </Link>
                        <button
                          type='button'
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => handleDelete(partner.id)}
                          title='Delete'
                        >
                          <Icon icon='mdi:delete' className='text-sm' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan={9} className='text-center text-secondary-light py-24'>
                      No partners found
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

export default ItsmPartnersPage;

