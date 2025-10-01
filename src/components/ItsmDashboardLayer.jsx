import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ItsmDashboardLayer = () => {
  const navigate = useNavigate();

  // Enhanced line chart component
  const TrendChart = ({ data, type, colors }) => {
    const chartHeight = 200;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerHeight = chartHeight - padding.top - padding.bottom;
    
    const allValues = data.flatMap(d => Object.values(d).filter(v => typeof v === 'number'));
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const valueRange = maxValue - minValue || 1;
    
    // Use viewBox coordinates for proper line rendering
    const viewBoxWidth = 400;
    const getX = (index) => {
      return (10 + (index / (data.length - 1)) * 80) * viewBoxWidth / 100; // Convert percentage to viewBox units
    };
    
    const getY = (value) => padding.top + innerHeight - ((value - minValue) / valueRange) * innerHeight;
    
    const generatePath = (key) => {
      const points = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`);
      return points.join(' ');
    };
    
    const generateAreaPath = (key) => {
      const linePoints = data.map((d, i) => `${getX(i)} ${getY(d[key])}`);
      const bottomLine = data.map((d, i) => `${getX(i)} ${padding.top + innerHeight}`);
      return `M ${linePoints.join(' L ')} L ${bottomLine.reverse().join(' L ')} Z`;
    };

    return (
      <div style={{ 
        background: 'linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%)',
        borderRadius: '12px',
        padding: '20px',
      position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none'
        }} />
        
        <svg 
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${viewBoxWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: `${chartHeight}px`, position: 'relative', zIndex: 1 }}
        >
          {/* Gradient definitions */}
          <defs>
            {Object.entries(colors).map(([key, color]) => (
              <linearGradient key={key} id={`gradient-${key}-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </linearGradient>
            ))}
            <filter id={`glow-${type}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => {
            const y = padding.top + (i * innerHeight) / 4;
            return (
              <line
                key={`grid-${i}`}
                x1={viewBoxWidth * 0.1}
                y1={y}
                x2={viewBoxWidth * 0.9}
                y2={y}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
                strokeDasharray="3,3"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = Math.round(minValue + (valueRange * (4 - i)) / 4);
            const y = padding.top + (i * innerHeight) / 4;
            return (
              <text
                key={`y-label-${i}`}
                x={viewBoxWidth * 0.08}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#666"
                fontWeight="500"
              >
                {value}
              </text>
            );
          })}

          {/* Area fills */}
          {Object.entries(colors).map(([key, color]) => (
            <path
              key={`area-${key}`}
              d={generateAreaPath(key)}
              fill={`url(#gradient-${key}-${type})`}
              opacity="0.6"
            />
          ))}

          {/* Lines */}
          {Object.entries(colors).map(([key, color]) => (
            <path
              key={`line-${key}`}
              d={generatePath(key)}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${type})`}
              style={{ 
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.strokeWidth = '4';
                e.target.style.filter = `url(#glow-${type}) drop-shadow(0 4px 8px rgba(0,0,0,0.2))`;
              }}
              onMouseLeave={(e) => {
                e.target.style.strokeWidth = '3';
                e.target.style.filter = `url(#glow-${type})`;
              }}
            />
          ))}

                    {/* Data points */}
          {data.map((d, i) => 
            Object.entries(colors).map(([key, color]) => (
              <circle
                key={`point-${key}-${i}`}
                cx={getX(i)}
                cy={getY(d[key])}
                r="5"
                fill={color}
                stroke="#fff"
                strokeWidth="2"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }}
                onMouseEnter={(e) => {
                  e.target.style.r = '7';
                  e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.r = '5';
                  e.target.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))';
                }}
              >
                <title>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${d[key]}`}</title>
              </circle>
            ))
          )}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={`x-label-${i}`}
              x={getX(i)}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#666"
              fontWeight="600"
            >
              {d.day}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  // Navigation handlers
  const handleNavigateToIncidents = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/itsm/incidents/all?${queryParams.toString()}`);
  };

  const handleNavigateToEvents = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/itsm/events/open?${queryParams.toString()}`);
  };

  const handleNavigateToIncidentWorkbench = (incidentId) => {
    navigate(`/itsm/incidents/${incidentId}/workbench`);
  };

  return (
    <>
      {/* KPI Cards */}
      <div className='row row-cols-xxxl-4 row-cols-lg-2 row-cols-1 gy-4'>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-1 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Open Incidents</p>
                  <h6 className='mb-0'>24</h6>
                </div>
                <div className='w-50-px h-50-px bg-danger-main rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:alert-decagram' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='d-inline-flex align-items-center gap-1 text-danger-main'>
                  <Icon icon='bxs:up-arrow' className='text-xs' /> +3 today
                </span>
                <span 
                  style={{ cursor: 'pointer' }} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateToIncidents({ priority: 'Critical' });
                  }}
                >
                  Critical: 5
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-2 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Open Events</p>
                  <h6 className='mb-0'>57</h6>
                </div>
                <div className='w-50-px h-50-px bg-warning-main rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:alert-outline' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='d-inline-flex align-items-center gap-1 text-success-main'>
                  <Icon icon='bxs:down-arrow' className='text-xs' /> -12
                </span>
                Last 24h
              </p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-3 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ status: 'Active' })}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Active Alerts</p>
                  <h6 className='mb-0'>11</h6>
                </div>
                <div className='w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:bell-alert' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0'>Acknowledge pending: 3</p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-4 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ sla: 'breached' })}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>SLA Breaches (24h)</p>
                  <h6 className='mb-0'>2</h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:timer-alert' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0'>At risk: 7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Widgets */}
      <section className='row gy-4 mt-4'>
        {/* Events Trend Chart */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Events Trend (Last 7 Days)</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 342</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToEvents()}>View Details</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex align-items-center justify-content-between mb-16'>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ severity: 'Critical' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-danger-main'></span>
                  <span className='text-sm fw-medium'>Critical</span>
                  <span className='text-sm text-secondary-light'>24</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ severity: 'High' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-warning-main'></span>
                  <span className='text-sm fw-medium'>High</span>
                  <span className='text-sm text-secondary-light'>67</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ severity: 'Medium' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-info'></span>
                  <span className='text-sm fw-medium'>Medium</span>
                  <span className='text-sm text-secondary-light'>156</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ severity: 'Low' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-neutral-400'></span>
                  <span className='text-sm fw-medium'>Low</span>
                  <span className='text-sm text-secondary-light'>95</span>
                </div>
              </div>
              
              {/* Events Trend Line Chart */}
              <TrendChart
                data={[
                    { day: 'Mon', critical: 3, high: 8, medium: 15, low: 12 },
                    { day: 'Tue', critical: 5, high: 12, medium: 18, low: 14 },
                    { day: 'Wed', critical: 2, high: 9, medium: 22, low: 16 },
                    { day: 'Thu', critical: 4, high: 11, medium: 20, low: 13 },
                    { day: 'Fri', critical: 6, high: 13, medium: 25, low: 18 },
                    { day: 'Sat', critical: 2, high: 7, medium: 16, low: 11 },
                    { day: 'Sun', critical: 2, high: 7, medium: 20, low: 11 }
                ]}
                type="events"
                colors={{
                  critical: '#dc3545',
                  high: '#ffc107',
                  medium: '#0dcaf0',
                  low: '#6c757d'
                }}
              />
              
              <div className='mt-16 text-center'>
                <span className='text-sm text-secondary-light'>
                  Trend: <span className='text-success-main'>↓ 12%</span> from last week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Incidents Trend Chart */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Incidents Trend (Last 7 Days)</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 89</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToIncidents()}>View Details</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex align-items-center justify-content-between mb-16'>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ priority: 'Critical' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-danger-main'></span>
                  <span className='text-sm fw-medium'>Critical</span>
                  <span className='text-sm text-secondary-light'>12</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ priority: 'High' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-warning-main'></span>
                  <span className='text-sm fw-medium'>High</span>
                  <span className='text-sm text-secondary-light'>28</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ priority: 'Medium' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-info'></span>
                  <span className='text-sm fw-medium'>Medium</span>
                  <span className='text-sm text-secondary-light'>35</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ priority: 'Low' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-neutral-400'></span>
                  <span className='text-sm fw-medium'>Low</span>
                  <span className='text-sm text-secondary-light'>14</span>
                </div>
              </div>
              
              {/* Incidents Trend Line Chart */}
              <TrendChart
                data={[
                    { day: 'Mon', critical: 2, high: 4, medium: 6, low: 2 },
                    { day: 'Tue', critical: 3, high: 5, medium: 7, low: 3 },
                    { day: 'Wed', critical: 1, high: 3, medium: 5, low: 2 },
                    { day: 'Thu', critical: 2, high: 6, medium: 8, low: 3 },
                    { day: 'Fri', critical: 2, high: 5, medium: 6, low: 2 },
                    { day: 'Sat', critical: 1, high: 3, medium: 2, low: 1 },
                    { day: 'Sun', critical: 1, high: 2, medium: 1, low: 1 }
                ]}
                type="incidents"
                colors={{
                  critical: '#dc3545',
                  high: '#ffc107',
                  medium: '#0dcaf0',
                  low: '#6c757d'
                }}
              />
              
              <div className='mt-16 text-center'>
                <span className='text-sm text-secondary-light'>
                  Trend: <span className='text-success-main'>↑ 8%</span> from last week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className='col-xxl-4'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Recent Events</h6>
              <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToEvents()}>View All</button>
            </div>
            <div className='card-body p-20 pt-12'>
              <ul className='list-unstyled mb-0 d-flex flex-column gap-12'>
                {[
                  { sev: 'Critical', text: 'CPU usage > 95% on node-3', ago: '3m', incidentId: 'INC-1042' },
                  { sev: 'High', text: 'Disk space < 10% on db-primary', ago: '9m', incidentId: 'INC-1043' },
                  { sev: 'Medium', text: 'Service restart detected: payments', ago: '17m', incidentId: 'INC-1044' },
                  { sev: 'Low', text: 'Config change applied: nginx', ago: '25m', incidentId: 'INC-1045' }
                ].map((e, idx) => (
                  <li key={idx} className='d-flex align-items-start justify-content-between gap-3'>
                    <div className='d-flex align-items-start gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToEvents({ severity: e.sev })}>
                      <span className={`w-10-px h-10-px rounded-circle mt-6 ${
                        e.sev === 'Critical' ? 'bg-danger-main' : e.sev === 'High' ? 'bg-warning-main' : e.sev === 'Medium' ? 'bg-info' : 'bg-neutral-400'
                      }`} />
                      <div>
                        <p className='mb-0 text-sm fw-medium'>{e.text}</p>
                        <span className='text-xs text-secondary-light'>{e.sev}</span>
                      </div>
                    </div>
                    <div className='d-flex flex-column align-items-end gap-2'>
                      <span className='text-xs text-secondary-light'>{e.ago} ago</span>
                      {e.incidentId && (
                        <span 
                          className='text-xs text-primary-600 fw-semibold' 
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleNavigateToIncidentWorkbench(e.incidentId)}
                        >
                          {e.incidentId}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className='col-xxl-8'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Recent Incidents</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Last update: 2m ago</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToIncidents()}>View All</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='table-responsive'>
                <table className='table mb-0'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Assignee</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'INC-1042', title: 'API latency spikes', prio: 'High', status: 'In Progress', assignee: 'A. Rao', updated: '5m' },
                      { id: 'INC-1041', title: 'Email service outage', prio: 'Critical', status: 'Investigating', assignee: 'J. Kim', updated: '14m' },
                      { id: 'INC-1039', title: 'DB connection pool errors', prio: 'Medium', status: 'Monitoring', assignee: 'M. Novak', updated: '22m' },
                      { id: 'INC-1037', title: 'Login failures via SSO', prio: 'High', status: 'In Progress', assignee: 'S. Chen', updated: '31m' }
                    ].map((row) => (
                      <tr key={row.id} style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidentWorkbench(row.id)}>
                        <td className='fw-semibold'>{row.id}</td>
                        <td>{row.title}</td>
                        <td>
                          <span className={`badge ${row.prio === 'Critical' ? 'bg-danger-main' : row.prio === 'High' ? 'bg-warning-main' : 'bg-info'}`}>{row.prio}</span>
                        </td>
                        <td>
                          <span className='badge bg-primary-600'>{row.status}</span>
                        </td>
                        <td>{row.assignee}</td>
                        <td>{row.updated} ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Overview */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0'>
              <h6 className='mb-0'>Monitoring Overview</h6>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex flex-column gap-12'>
                {[
                  { name: 'API Gateway', status: 'Operational' },
                  { name: 'Database', status: 'Degraded' },
                  { name: 'Auth Service', status: 'Operational' },
                  { name: 'Object Storage', status: 'Partial Outage' }
                ].map((svc) => (
                  <div key={svc.name} className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center gap-8'>
                      <span className={`w-10-px h-10-px rounded-circle ${
                        svc.status === 'Operational' ? 'bg-success-main' : svc.status === 'Degraded' ? 'bg-warning-main' : 'bg-danger-main'
                      }`} />
                      <span className='fw-medium'>{svc.name}</span>
                    </div>
                    <span className='text-sm text-secondary-light'>{svc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Queue by Priority */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Ticket Queue by Priority</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 132</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToIncidents()}>View All</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex flex-column gap-12'>
                {[
                  { label: 'Critical', count: 8, color: 'bg-danger-main' },
                  { label: 'High', count: 28, color: 'bg-warning-main' },
                  { label: 'Medium', count: 54, color: 'bg-info' },
                  { label: 'Low', count: 42, color: 'bg-neutral-400' }
                ].map((p) => (
                  <div key={p.label} className='d-flex align-items-center justify-content-between gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToIncidents({ priority: p.label })}>
                    <div className='d-flex align-items-center gap-8'>
                      <span className={`w-10-px h-10-px rounded-circle ${p.color}`} />
                      <span className='fw-medium'>{p.label}</span>
                    </div>
                    <span className='text-sm'>{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItsmDashboardLayer;

