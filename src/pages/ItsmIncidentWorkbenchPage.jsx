import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { mockIncidents } from "../mock/itsmData";
import usePageTitle from "../hooks/usePageTitle";

const ItsmIncidentWorkbenchPage = () => {
  usePageTitle('Incident Workbench');
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true);
  const [incidentData, setIncidentData] = useState({
    id: '',
    title: '',
    prio: '',
    status: '',
    assignee: '',
    openedAt: '',
    updatedAt: '',
    partner: '',
    client: '',
    entity: '',
    // Additional fields for workbench
    requestor: '',
    devices: '',
    assignTo: '',
    impact: '',
    contract: '',
    dummyIncident: false,
    threatType: '',
    location: '',
    oemCategory: '',
    createdBy: '',
    urgency: '',
    externalReference: '',
    noiseSuppress: false,
    deviceType: '',
    createdOn: '',
    priority: '',
    vendorReference: '',
    eventType: '',
    description: '',
    resolution: '',
    category: '',
    subcategory: '',
    sla: '',
    businessImpact: '',
    technicalImpact: '',
    rootCause: '',
    workaround: '',
    permanentFix: '',
    lessonsLearned: ''
  });

  // Find incident data from mock data
  const findIncidentById = (incidentId) => {
    const foundIncident = mockIncidents.find(inc => inc.id === incidentId);
    if (foundIncident) {
      return {
        ...foundIncident,
        // Map existing fields
        title: foundIncident.title || '',
        prio: foundIncident.prio || '',
        status: foundIncident.status || '',
        assignee: foundIncident.assignee || '',
        openedAt: foundIncident.openedAt || '',
        updatedAt: foundIncident.updatedAt || '',
        partner: foundIncident.partner || '',
        client: foundIncident.client || '',
        entity: foundIncident.entity || '',
        // Generate realistic additional data based on incident type
        requestor: foundIncident.assignee === 'you' ? 'System Generated' : foundIncident.assignee,
        devices: foundIncident.entity || 'Unknown Device',
        assignTo: foundIncident.assignee || '',
        impact: foundIncident.prio === 'Critical' ? 'High' : foundIncident.prio === 'High' ? 'Medium' : 'Low',
        contract: 'Contract-' + Math.floor(Math.random() * 1000),
        dummyIncident: false,
        threatType: getThreatType(foundIncident.title),
        location: getLocation(foundIncident.partner),
        oemCategory: getOemCategory(foundIncident.entity),
        createdBy: foundIncident.assignee || 'Admin serv360',
        urgency: foundIncident.prio || 'Medium',
        externalReference: '',
        noiseSuppress: false,
        deviceType: getDeviceType(foundIncident.entity),
        createdOn: foundIncident.openedAt || new Date().toISOString(),
        priority: foundIncident.prio || '',
        vendorReference: 'VR-' + Math.floor(Math.random() * 10000),
        eventType: getEventType(foundIncident.title),
        description: foundIncident.title || '',
        resolution: '',
        category: getCategory(foundIncident.entity),
        subcategory: getSubcategory(foundIncident.entity),
        sla: getSLA(foundIncident.prio),
        businessImpact: getBusinessImpact(foundIncident.prio),
        technicalImpact: getTechnicalImpact(foundIncident.prio),
        rootCause: '',
        workaround: '',
        permanentFix: '',
        lessonsLearned: ''
      };
    }
    return null;
  };

  // Helper functions to generate realistic data
  const getThreatType = (title) => {
    if (title.includes('API') || title.includes('latency')) return 'Performance';
    if (title.includes('outage') || title.includes('crash')) return 'Availability';
    if (title.includes('security') || title.includes('SSO')) return 'Security';
    if (title.includes('database') || title.includes('DB')) return 'Data';
    return 'Operational';
  };

  const getLocation = (partner) => {
    const locations = ['HillOffice', 'Downtown', 'DataCenter-East', 'Cloud-Region-1', 'Branch-Office'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getOemCategory = (entity) => {
    if (entity.includes('Database') || entity.includes('DB')) return 'Database';
    if (entity.includes('API') || entity.includes('Service')) return 'Software';
    if (entity.includes('Server') || entity.includes('Node')) return 'Hardware';
    if (entity.includes('Network') || entity.includes('Gateway')) return 'Network';
    return 'Others';
  };

  const getDeviceType = (entity) => {
    if (entity.includes('Database')) return 'database';
    if (entity.includes('API') || entity.includes('Service')) return 'application';
    if (entity.includes('Server') || entity.includes('Node')) return 'general purpose';
    if (entity.includes('Gateway') || entity.includes('Load Balancer')) return 'network device';
    return 'general purpose';
  };

  const getEventType = (title) => {
    if (title.includes('latency') || title.includes('timeout')) return 'Performance';
    if (title.includes('outage') || title.includes('crash')) return 'Availability';
    if (title.includes('error') || title.includes('failure')) return 'Error';
    if (title.includes('restart') || title.includes('reload')) return 'Service';
    return 'Monitoring';
  };

  const getCategory = (entity) => {
    if (entity.includes('Database')) return 'Data Management';
    if (entity.includes('API') || entity.includes('Service')) return 'Application Services';
    if (entity.includes('Server') || entity.includes('Node')) return 'Infrastructure';
    if (entity.includes('Network') || entity.includes('Gateway')) return 'Network Services';
    return 'General IT';
  };

  const getSubcategory = (entity) => {
    if (entity.includes('Database')) return 'Database Systems';
    if (entity.includes('API')) return 'API Management';
    if (entity.includes('Service')) return 'Microservices';
    if (entity.includes('Server')) return 'Server Management';
    if (entity.includes('Gateway')) return 'Gateway Services';
    return 'General Systems';
  };

  const getSLA = (priority) => {
    switch (priority) {
      case 'Critical': return '2 hours';
      case 'High': return '4 hours';
      case 'Medium': return '8 hours';
      case 'Low': return '24 hours';
      default: return '8 hours';
    }
  };

  const getBusinessImpact = (priority) => {
    switch (priority) {
      case 'Critical': return 'Service completely unavailable';
      case 'High': return 'Significant service degradation';
      case 'Medium': return 'Moderate service impact';
      case 'Low': return 'Minimal service impact';
      default: return 'Moderate service impact';
    }
  };

  const getTechnicalImpact = (priority) => {
    switch (priority) {
      case 'Critical': return 'System failure';
      case 'High': return 'Major functionality affected';
      case 'Medium': return 'Some functionality affected';
      case 'Low': return 'Minor functionality affected';
      default: return 'Some functionality affected';
    }
  };

  // Update incident ID when URL parameter changes
  useEffect(() => {
    if (id) {
      const foundIncident = findIncidentById(id);
      if (foundIncident) {
        setIncidentData(foundIncident);
      } else {
        // If incident not found, create a default one with the ID
        setIncidentData(prev => ({
          ...prev,
          id: id,
          title: `Incident ${id}`,
          prio: 'Medium',
          status: 'New',
          partner: 'Unknown Partner',
          client: 'Unknown Client',
          entity: 'Unknown Device'
        }));
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIncidentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleHeader = () => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };

  const tabs = [
    { id: 'description', label: 'Description', count: null },
    { id: 'addActivity', label: 'Add Activity', count: null },
    { id: 'activityLog', label: 'Activity Log', count: 0 },
    { id: 'incidentHistory', label: 'Incident History', count: null },
    { id: 'deviceDetails', label: 'Device Details', count: null },
    { id: 'eventCorrelation', label: 'Event Correlation', count: 1 },
    { id: 'shn', label: 'SHN', count: null },
    { id: 'runBook', label: 'Run Book', count: null }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className='p-20'>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Incident Description</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter incident description...'
                value={incidentData.description}
                onChange={handleInputChange}
                name='description'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Business Impact</label>
              <textarea
                className='form-control'
                rows='3'
                placeholder='Describe business impact...'
                value={incidentData.businessImpact}
                onChange={handleInputChange}
                name='businessImpact'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Technical Impact</label>
              <textarea
                className='form-control'
                rows='3'
                placeholder='Describe technical impact...'
                value={incidentData.technicalImpact}
                onChange={handleInputChange}
                name='technicalImpact'
              />
            </div>
          </div>
        );

      case 'addActivity':
        return (
          <div className='p-20'>
            <div className='row gy-3'>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Start Time *</label>
                <input
                  type='datetime-local'
                  className='form-control'
                  name='startTime'
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>End Time *</label>
                <input
                  type='datetime-local'
                  className='form-control'
                  name='endTime'
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Activity Type *</label>
                <div className='d-flex gap-2'>
                  <input
                    type='text'
                    className='form-control'
                    name='activityType'
                    defaultValue='Work Log'
                  />
                  <button type='button' className='btn btn-outline-primary-600'>
                    <Icon icon='mdi:plus' />
                  </button>
                </div>
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Effort Hours - hh:mm:ss</label>
                <input
                  type='text'
                  className='form-control'
                  name='effortHours'
                  placeholder='00:00:00'
                />
              </div>
              <div className='col-12'>
                <label className='form-label fw-medium'>Notes</label>
                <textarea
                  className='form-control'
                  rows='4'
                  placeholder='Enter detailed notes about the activity...'
                />
              </div>
            </div>
          </div>
        );

      case 'activityLog':
        return (
          <div className='p-20'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead style={{
                  background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th>Activity No</th>
                    <th>Activity Type</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Effort Hrs</th>
                    <th>Worked</th>
                    <th>Description</th>
                    <th>Internal Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className='text-center text-secondary-light py-24'>
                      No Record Found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'incidentHistory':
        return (
          <div className='p-20'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead style={{
                  background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th>S.no</th>
                    <th>Activity no</th>
                    <th>Activity Type</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Effort Hrs</th>
                    <th>Description</th>
                    <th>Internal Comments</th>
                    <th>Attachments</th>
                    <th>Status</th>
                    <th>Modified By</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{incidentData.createdOn}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>System Auto generated the ticket</td>
                    <td>-</td>
                    <td>{incidentData.status}</td>
                    <td>{incidentData.createdBy}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'deviceDetails':
        return (
          <div className='p-20'>
            <div className='row gy-3'>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Device Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={incidentData.devices}
                  readOnly
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Device Type</label>
                <input
                  type='text'
                  className='form-control'
                  value={incidentData.deviceType}
                  readOnly
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Location</label>
                <input
                  type='text'
                  className='form-control'
                  value={incidentData.location}
                  readOnly
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Status</label>
                <span className='badge bg-warning-main'>Degraded</span>
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Category</label>
                <input
                  type='text'
                  className='form-control'
                  value={incidentData.category}
                  readOnly
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label fw-medium'>Subcategory</label>
                <input
                  type='text'
                  className='form-control'
                  value={incidentData.subcategory}
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 'eventCorrelation':
        return (
          <div className='p-20'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead style={{
                  background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th>Event ID</th>
                    <th>Device Name</th>
                    <th>Event Time</th>
                    <th>Severity</th>
                    <th>Event Type</th>
                    <th>Threat Type</th>
                    <th>Event Text</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>E-{Math.floor(Math.random() * 1000000)}</td>
                    <td>{incidentData.devices}</td>
                    <td>{incidentData.createdOn}</td>
                    <td><span className='badge bg-danger-main'>CRITICAL</span></td>
                    <td>{incidentData.eventType}</td>
                    <td>{incidentData.threatType}</td>
                    <td>{incidentData.description}</td>
                    <td>
                      <button type='button' className='btn btn-outline-secondary btn-sm' title='View Event'>
                        <Icon icon='mdi:link-variant-off' />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'shn':
        return (
          <div className='p-20'>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Special Handling Notes</label>
              <textarea
                className='form-control'
                rows='6'
                placeholder='Enter special handling notes...'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Escalation Notes</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter escalation notes if applicable...'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Root Cause Analysis</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter root cause analysis...'
                value={incidentData.rootCause}
                onChange={handleInputChange}
                name='rootCause'
              />
            </div>
          </div>
        );

      case 'runBook':
        return (
          <div className='p-20'>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Run Book Procedures</label>
              <textarea
                className='form-control'
                rows='8'
                placeholder='Enter run book procedures for this incident type...'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Workaround</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter temporary workaround...'
                value={incidentData.workaround}
                onChange={handleInputChange}
                name='workaround'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Permanent Fix</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter permanent fix details...'
                value={incidentData.permanentFix}
                onChange={handleInputChange}
                name='permanentFix'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Lessons Learned</label>
              <textarea
                className='form-control'
                rows='4'
                placeholder='Enter lessons learned...'
                value={incidentData.lessonsLearned}
                onChange={handleInputChange}
                name='lessonsLearned'
              />
            </div>
            <div className='mb-16'>
              <label className='form-label fw-medium'>Checklist</label>
              <div className='form-check'>
                <input className='form-check-input' type='checkbox' id='check1' />
                <label className='form-check-label' htmlFor='check1'>
                  Verify system status
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='checkbox' id='check2' />
                <label className='form-check-label' htmlFor='check2'>
                  Check logs for errors
                </label>
              </div>
              <div className='form-check'>
                <input className='form-check-input' type='checkbox' id='check3' />
                <label className='form-check-label' htmlFor='check3'>
                  Notify stakeholders
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title={`ITSM / Incident Workbench / ${incidentData.id}`} />
      
      {/* Incident Header */}
      <div className='card mb-4'>
        <div 
          className='card-header text-white d-flex align-items-center justify-content-between'
          style={{
            background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
            border: 'none'
          }}
        >
          <div>
            <h5 className='mb-0 text-white'>{incidentData.id}</h5>
            <small className='text-white-50'>{incidentData.title}</small>
          </div>
          <div className='d-flex align-items-center gap-2'>
            <button 
              type='button' 
              className='btn btn-outline-light btn-sm' 
              onClick={toggleHeader}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                padding: '8px 12px',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon 
                icon={isHeaderExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
                style={{ fontSize: '18px' }} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Incident Details Form */}
      {isHeaderExpanded && (
        <div className='card mb-4'>
          <div className='card-header'>
            <h6 className='mb-0'>Incident Details</h6>
          </div>
          <div className='card-body'>
            <div className='row gy-3'>
              {/* Left Column */}
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Incident Number</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.id}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.title}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Requestor</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.requestor}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Devices/Entity</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.devices}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Assign To</label>
                  <div className='input-group'>
                    <input
                      type='text'
                      className='form-control'
                      name='assignTo'
                      value={incidentData.assignTo}
                      onChange={handleInputChange}
                      placeholder='Select assignee'
                    />
                    <button 
                      type='button' 
                      className='btn btn-outline-light'
                      style={{
                        background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      <Icon icon='mdi:account' />
                    </button>
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Impact</label>
                  <select
                    className='form-select'
                    name='impact'
                    value={incidentData.impact}
                    onChange={handleInputChange}
                  >
                    <option value=''>--Select Impact--</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Contract #</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.contract}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='dummyIncident'
                      checked={incidentData.dummyIncident}
                      onChange={handleInputChange}
                    />
                    <label className='form-check-label'>Dummy Incident</label>
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Threat Type</label>
                  <input
                    type='text'
                    className='form-control'
                    name='threatType'
                    value={incidentData.threatType}
                    onChange={handleInputChange}
                    placeholder='Enter threat type'
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Partner</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.partner}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Client</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.client}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Location</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.location}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>OEM / Category</label>
                  <select
                    className='form-select'
                    name='oemCategory'
                    value={incidentData.oemCategory}
                    onChange={handleInputChange}
                  >
                    <option value='Others'>Others</option>
                    <option value='Hardware'>Hardware</option>
                    <option value='Software'>Software</option>
                    <option value='Network'>Network</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Created By</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.createdBy}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Urgency</label>
                  <select
                    className='form-select'
                    name='urgency'
                    value={incidentData.urgency}
                    onChange={handleInputChange}
                  >
                    <option value='Critical'>Critical</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>External Reference</label>
                  <input
                    type='text'
                    className='form-control'
                    name='externalReference'
                    value={incidentData.externalReference}
                    onChange={handleInputChange}
                    placeholder='Enter external reference'
                  />
                </div>
                <div className='mb-3'>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='noiseSuppress'
                      checked={incidentData.noiseSuppress}
                      onChange={handleInputChange}
                    />
                    <label className='form-check-label'>Noise/Suppress</label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='col-md-4'>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Status</label>
                  <select
                    className='form-select'
                    name='status'
                    value={incidentData.status}
                    onChange={handleInputChange}
                  >
                    <option value='New'>New</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='On Hold'>On Hold</option>
                    <option value='Resolved'>Resolved</option>
                    <option value='Closed'>Closed</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Priority</label>
                  <select
                    className='form-select'
                    name='priority'
                    value={incidentData.priority}
                    onChange={handleInputChange}
                  >
                    <option value=''>--Select Priority--</option>
                    <option value='Critical'>Critical</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Device Types/Sub-Category</label>
                  <select
                    className='form-select'
                    name='deviceType'
                    value={incidentData.deviceType}
                    onChange={handleInputChange}
                  >
                    <option value='general purpose'>General Purpose</option>
                    <option value='database'>Database</option>
                    <option value='web server'>Web Server</option>
                    <option value='application'>Application</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Created On</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.createdOn}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Vendor Reference</label>
                  <input
                    type='text'
                    className='form-control'
                    name='vendorReference'
                    value={incidentData.vendorReference}
                    onChange={handleInputChange}
                    placeholder='Enter vendor reference'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>Event Type</label>
                  <input
                    type='text'
                    className='form-control'
                    name='eventType'
                    value={incidentData.eventType}
                    onChange={handleInputChange}
                    placeholder='Enter event type'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fw-medium'>SLA</label>
                  <input
                    type='text'
                    className='form-control'
                    value={incidentData.sla}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className='card' style={{ marginTop: '20px' }}>
        <div className='card-header p-0' style={{
          background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
          border: 'none',
          padding: '0 20px'
        }}>
          <ul className='nav nav-tabs card-header-tabs' style={{
            width: '100%',
            gap: '10px'
          }}>
            {tabs.map((tab) => (
              <li className='nav-item' key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.8)',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    padding: '12px 20px',
                    margin: '0 5px',
                    borderRadius: '6px 6px 0 0',
                    minWidth: '120px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className='ms-1'>({tab.count})</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='card-body p-0'>
          {renderTabContent()}
        </div>
      </div>
    </MasterLayout>
  );
};

export default ItsmIncidentWorkbenchPage;
