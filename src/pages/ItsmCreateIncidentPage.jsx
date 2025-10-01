import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

const ItsmCreateIncidentPage = () => {
  usePageTitle('Create Incident');
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Medium',
    description: '',
    assignee: '',
    source: '',
    category: '',
    partner: '',
    client: '',
    entity: ''
  });

  // Sample data for dropdowns - in a real app, this would come from API
  const partners = [
    'TechCorp', 'DataFlow Inc', 'PayTech', 'WebServ', 'APIGate', 
    'CacheTech', 'BackupPro', 'ServerTech', 'StreamTech', 'EmailTech',
    'SearchPro', 'AuthTech', 'WebhookPro', 'MobileTech'
  ];

  const clients = [
    'Enterprise Solutions', 'Global Retail', 'E-commerce Plus', 'Digital Agency',
    'Mobile Apps Co', 'Social Media Inc', 'Financial Services', 'Cloud Provider',
    'IoT Solutions', 'Communication Corp', 'Content Platform', 'Automation Corp',
    'Integration Corp'
  ];

  const entities = [
    'Production Cluster', 'Database Server', 'Payment Gateway', 'Load Balancer',
    'API Gateway', 'Cache Cluster', 'Backup System', 'Compute Node',
    'Replica Server', 'Message Queue', 'CDN Edge', 'Scheduler Service',
    'Email Service', 'Search Engine', 'SSO Service', 'Webhook Service', 'Mobile App'
  ];

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
    console.log('Creating incident:', formData);
    // Reset form after submission
    setFormData({
      title: '',
      priority: 'Medium',
      description: '',
      assignee: '',
      source: '',
      category: '',
      partner: '',
      client: '',
      entity: ''
    });
  };

  return (
    <MasterLayout>
      <Breadcrumb title='ITSM / Create Incident' />
      <div className='card'>
        <div className='card-header border-bottom-0 pb-0'>
          <h6 className='mb-0'>Create New Incident</h6>
        </div>
        <div className='card-body p-20 pt-12'>
          <form onSubmit={handleSubmit}>
            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Title *</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='title'
                  className='form-control'
                  placeholder='Enter incident title'
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Priority *</label>
              <div className='col-sm-10'>
                <select
                  name='priority'
                  className='form-select'
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                  <option value='Critical'>Critical</option>
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Category</label>
              <div className='col-sm-10'>
                <select
                  name='category'
                  className='form-select'
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value=''>Select Category</option>
                  <option value='Infrastructure'>Infrastructure</option>
                  <option value='Application'>Application</option>
                  <option value='Network'>Network</option>
                  <option value='Security'>Security</option>
                  <option value='Database'>Database</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Partner *</label>
              <div className='col-sm-10'>
                <select
                  name='partner'
                  className='form-select'
                  value={formData.partner}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>Select Partner</option>
                  {partners.map(partner => (
                    <option key={partner} value={partner}>{partner}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Client *</label>
              <div className='col-sm-10'>
                <select
                  name='client'
                  className='form-select'
                  value={formData.client}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>Select Client</option>
                  {clients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Entity *</label>
              <div className='col-sm-10'>
                <select
                  name='entity'
                  className='form-select'
                  value={formData.entity}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>Select Entity</option>
                  {entities.map(entity => (
                    <option key={entity} value={entity}>{entity}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Source</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='source'
                  className='form-control'
                  placeholder='Enter source (e.g., node-3, db-primary)'
                  value={formData.source}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Assignee</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  name='assignee'
                  className='form-control'
                  placeholder='Enter assignee username'
                  value={formData.assignee}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='row mb-24 gy-3'>
              <label className='form-label mb-0 col-sm-2'>Description *</label>
              <div className='col-sm-10'>
                <textarea
                  name='description'
                  className='form-control'
                  rows='4'
                  placeholder='Provide detailed description of the incident'
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-10 offset-sm-2'>
                <button type='submit' className='btn btn-primary-600 me-2'>
                  Create Incident
                </button>
                <button type='button' className='btn btn-secondary' onClick={() => window.history.back()}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmCreateIncidentPage;
