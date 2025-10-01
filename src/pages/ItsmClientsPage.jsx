import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

const ItsmClientsPage = () => {
  usePageTitle('Clients');
  const [clients, setClients] = useState([
    { id: 1, name: 'Enterprise Solutions', contact: 'Alice Johnson', email: 'alice@enterprise.com', phone: '+1-555-0201', status: 'Active', industry: 'Technology', tier: 'Enterprise', joined: '2024-01-10' },
    { id: 2, name: 'Global Retail', contact: 'Bob Smith', email: 'bob@globalretail.com', phone: '+1-555-0202', status: 'Active', industry: 'Retail', tier: 'Enterprise', joined: '2024-02-15' },
    { id: 3, name: 'E-commerce Plus', contact: 'Carol Davis', email: 'carol@ecommerce.com', phone: '+1-555-0203', status: 'Active', industry: 'E-commerce', tier: 'Business', joined: '2024-03-05' },
    { id: 4, name: 'Digital Agency', contact: 'David Wilson', email: 'david@digitalagency.com', phone: '+1-555-0204', status: 'Inactive', industry: 'Marketing', tier: 'Business', joined: '2024-01-20' },
    { id: 5, name: 'Mobile Apps Co', contact: 'Eva Brown', email: 'eva@mobileapps.com', phone: '+1-555-0205', status: 'Active', industry: 'Technology', tier: 'Startup', joined: '2024-04-08' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    const matchesTier = tierFilter === 'All' || client.tier === tierFilter;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'bg-success-main' : 'bg-neutral-400';
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Enterprise': return 'bg-primary-600';
      case 'Business': return 'bg-info';
      case 'Startup': return 'bg-warning-main';
      default: return 'bg-neutral-400';
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Clients' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
          <h6 className='mb-0'>Clients Management</h6>
          <Link to="/itsm/clients/create" className='btn btn-primary-600 btn-sm'>
            <Icon icon='mdi:plus' className='me-8' /> Add Client
          </Link>
        </div>
        <div className='card-body p-20 pt-12'>
          {/* Filters */}
          <div className='row mb-24 gy-3'>
            <div className='col-md-4'>
              <input
                type='text'
                className='form-control'
                placeholder='Search clients...'
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
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <option value='All'>All Tiers</option>
                <option value='Enterprise'>Enterprise</option>
                <option value='Business'>Business</option>
                <option value='Startup'>Startup</option>
              </select>
            </div>
            <div className='col-md-4'>
              <span className='text-sm text-secondary-light'>
                Total: {filteredClients.length} clients
              </span>
            </div>
          </div>

          {/* Clients Table */}
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
                  <th>Industry</th>
                  <th>Tier</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map(client => (
                  <tr key={client.id}>
                    <td className='fw-semibold'>{client.id}</td>
                    <td className='fw-medium'>{client.name}</td>
                    <td>{client.contact}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className='text-sm'>{client.industry}</td>
                    <td>
                      <span className={`badge ${getTierBadge(client.tier)}`}>
                        {client.tier}
                      </span>
                    </td>
                    <td className='text-sm'>{client.joined}</td>
                    <td>
                      <div className='d-flex align-items-center gap-2'>
                        <Link
                          to={`/itsm/clients/${client.id}`}
                          className='btn btn-outline-primary-600 btn-sm'
                          title='View'
                        >
                          <Icon icon='mdi:eye' className='text-sm' />
                        </Link>
                        <Link
                          to={`/itsm/clients/${client.id}/edit`}
                          className='btn btn-outline-warning btn-sm'
                          title='Edit'
                        >
                          <Icon icon='mdi:pencil' className='text-sm' />
                        </Link>
                        <button
                          type='button'
                          className='btn btn-outline-danger btn-sm'
                          onClick={() => handleDelete(client.id)}
                          title='Delete'
                        >
                          <Icon icon='mdi:delete' className='text-sm' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={10} className='text-center text-secondary-light py-24'>
                      No clients found
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

export default ItsmClientsPage;

