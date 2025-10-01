import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { mockOpenEvents, mockEventsHistory, mockIncidents } from "../mock/itsmData";
import usePageTitle from "../hooks/usePageTitle";

const ItsmReportsPage = () => {
  usePageTitle('Reports');
  const [selectedDataTable, setSelectedDataTable] = useState('Events Level');
  const [selectedPartner, setSelectedPartner] = useState('All selected (32)');
  const [selectedTool, setSelectedTool] = useState('');
  const [timeRange, setTimeRange] = useState('This Year');
  const [availableColumns, setAvailableColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filterLogic, setFilterLogic] = useState('AND');

  // Define available columns for each data table
  const columnsByTable = {
    'Events Level': [
      'Event ID', 'Client Name', 'Event Type', 'Event Start Time', 'Event Criticality', 
      'Partner Name', 'Incident', 'Device/Host Name', 'Event Text', 'Device Type', 
      'Incident Status', 'Incident Assign To', 'Incident Closed Time', 'Incident Effort Time', 'Events Count'
    ],
    'Incident Level': [
      'Incident', 'Client Name', 'Partner Name', 'Requested By', 'Assign To', 
      'Ticket Created By', 'Ticket Created On', 'Incident Status', 'Category', 'Device', 
      'Device Type', 'Priority', 'Severity', 'Description', 'Resolution Time'
    ]
  };

  // Available partners
  const partners = [
    'Serv360', 'TechCorp', 'DataFlow Inc', 'PayTech', 'WebServ', 'APIGate', 
    'CacheTech', 'BackupPro', 'ServerTech', 'StreamTech', 'CDNPro', 'JobTech', 
    'EmailTech', 'SearchPro', 'AuthTech', 'WebhookPro', 'MobileTech'
  ];

  // Available tools
  const tools = [
    'Monitoring Tool', 'Alert System', 'Ticketing System', 'Analytics Platform',
    'Log Management', 'Performance Monitor', 'Security Scanner', 'Backup System'
  ];

  // Time range options
  const timeRanges = [
    'This Year', 'Last Year', 'This Month', 'Last Month', 'This Week', 'Last Week',
    'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'
  ];

  // Initialize columns when data table changes
  useEffect(() => {
    const columns = columnsByTable[selectedDataTable] || [];
    console.log('Available columns for table:', columns);
    
    // Ensure we're working with valid column names
    const validColumns = columns.filter(col => typeof col === 'string' && col.length > 0);
    console.log('Valid columns:', validColumns);
    
    setAvailableColumns([...validColumns]);
    setSelectedColumns(validColumns.slice(0, 8)); // Select first 8 columns by default
    console.log('Columns initialized:', validColumns.slice(0, 8));
  }, [selectedDataTable]);

  // Debug logging to check column state
  useEffect(() => {
    console.log('Selected columns:', selectedColumns);
    console.log('Available columns:', availableColumns);
  }, [selectedColumns, availableColumns]);

  // Generate mock report data based on selection
  const generateReportData = () => {
    setIsLoading(true);
    
    // Validate and reset columns if needed
    if (!selectedColumns || selectedColumns.length === 0 || 
        !selectedColumns.every(col => typeof col === 'string' && col.length > 0)) {
      console.log('Invalid columns detected, resetting...');
      const columns = columnsByTable[selectedDataTable] || [];
      setSelectedColumns(columns.slice(0, 8));
      setAvailableColumns(columns.slice(8));
    }
    
    // Simulate API call delay
    setTimeout(() => {
      let data = [];
      
      if (selectedDataTable === 'Events Level') {
        data = [...mockOpenEvents, ...mockEventsHistory].map((event, index) => ({
          'Event ID': event.id,
          'Client Name': event.client,
          'Event Type': event.source,
          'Event Start Time': event.time || event.ended,
          'Event Criticality': event.sev,
          'Partner Name': event.partner,
          'Incident': event.incidentId || '-',
          'Device/Host Name': event.entity,
          'Event Text': event.message,
          'Device Type': event.entity.includes('Database') ? 'Database' : 'Server',
          'Incident Status': event.incidentId ? 'Open' : 'N/A',
          'Incident Assign To': event.incidentId ? 'Admin serv360' : '-',
          'Incident Closed Time': event.state === 'Resolved' ? event.ended : '-',
          'Incident Effort Time': event.incidentId ? '2h 15m' : '-',
          'Events Count': '1'
        }));
      } else if (selectedDataTable === 'Incident Level') {
        data = mockIncidents.map((incident, index) => ({
          'Incident': incident.id,
          'Client Name': incident.client,
          'Partner Name': incident.partner,
          'Requested By': incident.assignee === 'you' ? 'System Generated' : incident.assignee,
          'Assign To': incident.assignee,
          'Ticket Created By': incident.assignee || 'Admin serv360',
          'Ticket Created On': incident.openedAt,
          'Incident Status': incident.status,
          'Category': incident.entity.includes('Database') ? 'Database' : 'Infrastructure',
          'Device': incident.entity,
          'Device Type': incident.entity.includes('Database') ? 'Database' : 'Server',
          'Priority': incident.prio,
          'Severity': incident.prio === 'Critical' ? 'Critical' : incident.prio === 'High' ? 'High' : 'Medium',
          'Description': incident.title,
          'Resolution Time': incident.status === 'Resolved' ? '4h 30m' : '-'
        }));
      }

      // Apply partner filter
      if (selectedPartner !== 'All selected (32)') {
        data = data.filter(item => item['Partner Name'] === selectedPartner);
      }

      // Apply time range filter (simplified)
      if (timeRange !== 'This Year') {
        // In real implementation, this would filter by actual dates
        data = data.slice(0, Math.floor(data.length * 0.7)); // Simulate filtering
      }

      setReportData(data);
      setIsLoading(false);
    }, 1000);
  };

  // Handle column movement
  const moveColumn = (direction, column = null) => {
    console.log('Move column called:', direction, column);
    console.log('Before move - Selected:', selectedColumns, 'Available:', availableColumns);
    
    if (direction === '>>') {
      setSelectedColumns([...availableColumns]);
      setAvailableColumns([]);
    } else if (direction === '<<') {
      setAvailableColumns([...selectedColumns]);
      setSelectedColumns([]);
    } else if (direction === '>' && column) {
      setSelectedColumns([...selectedColumns, column]);
      setAvailableColumns(availableColumns.filter(col => col !== column));
    } else if (direction === '<' && column) {
      setAvailableColumns([...availableColumns, column]);
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    }
    
    console.log('After move - Selected:', selectedColumns, 'Available:', availableColumns);
  };

  // Add filter condition
  const addFilterCondition = () => {
    const newFilter = {
      id: Date.now(),
      field: selectedColumns[0] || '',
      operator: 'equals',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  // Add OR clause
  const addOrClause = () => {
    setFilterLogic(filterLogic === 'AND' ? 'OR' : 'AND');
  };

  // Update filter
  const updateFilter = (id, field, value) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, [field]: value } : filter
    ));
  };

  // Remove filter
  const removeFilter = (id) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

  // Export data
  const exportData = (withSummary = false) => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDataTable}_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Generate CSV content
  const generateCSV = () => {
    if (reportData.length === 0) return '';
    
    const headers = selectedColumns.join(',');
    const rows = reportData.map(row => 
      selectedColumns.map(col => `"${row[col] || ''}"`).join(',')
    );
    
    return [headers, ...rows].join('\n');
  };

  // Save report configuration
  const saveReport = () => {
    const config = {
      dataTable: selectedDataTable,
      partner: selectedPartner,
      tool: selectedTool,
      timeRange,
      columns: selectedColumns,
      filters,
      filterLogic
    };
    localStorage.setItem('savedReportConfig', JSON.stringify(config));
    alert('Report configuration saved successfully!');
  };

  return (
    <MasterLayout>
      <Breadcrumb title='Reports' />
      
      {/* Report Configuration Section */}
      <div className='card mb-4'>
        <div className='card-header'>
          <h6 className='mb-0'>Report Configuration</h6>
        </div>
        <div className='card-body'>
          <div className='row gy-3'>
            {/* Left Column - Data Selection */}
            <div className='col-md-3'>
              <div className='mb-3'>
                <label className='form-label fw-medium'>Select Data Table</label>
                <select 
                  className='form-select' 
                  value={selectedDataTable}
                  onChange={(e) => setSelectedDataTable(e.target.value)}
                >
                  <option value='Events Level'>Events Level</option>
                  <option value='Incident Level'>Incident Level</option>
                </select>
              </div>
              
              <div className='mb-3'>
                <label className='form-label fw-medium'>Partner</label>
                <select 
                  className='form-select' 
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                >
                  <option value='All selected (32)'>All selected (32)</option>
                  {partners.map(partner => (
                    <option key={partner} value={partner}>{partner}</option>
                  ))}
                </select>
              </div>
              
                             {/* <div className='mb-3'>
                 <label className='form-label fw-medium'>Tool</label>
                 <select 
                   className='form-select' 
                   value={selectedTool}
                   onChange={(e) => setSelectedTool(e.target.value)}
                 >
                   <option value=''>Select options</option>
                   {tools.map(tool => (
                     <option key={tool} value={tool}>{tool}</option>
                   ))}
                 </select>
               </div> */}
              
              <div className='mb-3'>
                <label className='form-label fw-medium'>Time Range</label>
                <select 
                  className='form-select' 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  {timeRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Middle Column - Column Selection */}
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-5'>
                  <label className='form-label fw-medium'>Available Columns</label>
                  <div className='border rounded' style={{ height: '200px', overflowY: 'auto' }}>
                    {availableColumns.map((column, index) => (
                      <div 
                        key={index} 
                        className='p-2 border-bottom cursor-pointer'
                        onClick={() => moveColumn('>', column)}
                        style={{ cursor: 'pointer' }}
                      >
                        {column}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                  <button 
                    type='button' 
                    className='btn btn-outline-secondary btn-sm mb-2'
                    onClick={() => moveColumn('>>')}
                  >
                    &gt;&gt;
                  </button>
                  <button 
                    type='button' 
                    className='btn btn-outline-secondary btn-sm mb-2'
                    onClick={() => moveColumn('>')}
                  >
                    &gt;
                  </button>
                  <button 
                    type='button' 
                    className='btn btn-outline-secondary btn-sm mb-2'
                    onClick={() => moveColumn('<')}
                  >
                    &lt;
                  </button>
                  <button 
                    type='button' 
                    className='btn btn-outline-secondary btn-sm'
                    onClick={() => moveColumn('<<')}
                  >
                    &lt;&lt;
                  </button>
                </div>
                
                <div className='col-md-5'>
                  <label className='form-label fw-medium'>Selected Columns</label>
                  <div className='border rounded' style={{ height: '200px', overflowY: 'auto' }}>
                    {selectedColumns.map((column, index) => (
                      <div 
                        key={index} 
                        className='p-2 border-bottom cursor-pointer'
                        onClick={() => moveColumn('<', column)}
                        style={{ cursor: 'pointer' }}
                      >
                        {column}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Filters and Actions */}
            <div className='col-md-3'>
              <div className='mb-3'>
                <label className='form-label fw-medium'>Filter Conditions</label>
                <div className='d-grid gap-2'>
                  <button 
                    type='button' 
                    className='btn btn-outline-primary btn-sm'
                    onClick={addFilterCondition}
                  >
                    Add Filter Condition
                  </button>
                  <button 
                    type='button' 
                    className='btn btn-outline-secondary btn-sm'
                    onClick={addOrClause}
                  >
                    Add OR Clause
                  </button>
                </div>
                
                <div className='form-check mt-2'>
                  <input 
                    className='form-check-input' 
                    type='checkbox' 
                    id='filterLogic'
                    checked={filterLogic === 'AND'}
                    onChange={(e) => setFilterLogic(e.target.checked ? 'AND' : 'OR')}
                  />
                  <label className='form-check-label' htmlFor='filterLogic'>
                    All of these conditions must be met
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='d-grid gap-2'>
                                 <button 
                   type='button' 
                   className='btn'
                   style={{
                     background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                     border: 'none',
                     color: 'white'
                   }}
                   onClick={generateReportData}
                   disabled={isLoading}
                 >
                  <Icon icon='mdi:magnify' className='me-2' />
                  {isLoading ? 'Generating...' : 'Search'}
                </button>
                
                                 <button 
                   type='button' 
                   className='btn'
                   style={{
                     background: 'linear-gradient(135deg, #e40580 0%, #090f7c 100%)',
                     border: 'none',
                     color: 'white'
                   }}
                   onClick={() => exportData(false)}
                   disabled={reportData.length === 0}
                 >
                  <Icon icon='mdi:download' className='me-2' />
                  Export
                </button>
                
                                 {/* <button 
                   type='button' 
                   className='btn btn-danger'
                   onClick={saveReport}
                 >
                   <Icon icon='mdi:content-save' className='me-2' />
                   Save
                 </button>
                 
                 <button 
                   type='button' 
                   className='btn btn-danger'
                   onClick={() => exportData(true)}
                   disabled={reportData.length === 0}
                 >
                   Export With Summary
                 </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Conditions */}
      {filters.length > 0 && (
        <div className='card mb-4'>
          <div className='card-header'>
            <h6 className='mb-0'>Filter Conditions</h6>
          </div>
          <div className='card-body'>
            <div className='row gy-2'>
              {filters.map((filter) => (
                <div key={filter.id} className='col-md-4'>
                  <div className='d-flex gap-2 align-items-center'>
                    <select 
                      className='form-select form-select-sm'
                      value={filter.field}
                      onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}
                    >
                      {selectedColumns.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                    
                    <select 
                      className='form-select form-select-sm'
                      style={{ width: '100px' }}
                      value={filter.operator}
                      onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                    >
                      <option value='equals'>equals</option>
                      <option value='contains'>contains</option>
                      <option value='starts with'>starts with</option>
                      <option value='ends with'>ends with</option>
                    </select>
                    
                    <input 
                      type='text' 
                      className='form-control form-control-sm'
                      placeholder='Value'
                      value={filter.value}
                      onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                    />
                    
                    <button 
                      type='button' 
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => removeFilter(filter.id)}
                    >
                      <Icon icon='mdi:close' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

             {/* Report Data Table */}
       {reportData.length > 0 && (
         <div className='card'>
           <div className='card-header'>
                         <div className='d-flex justify-content-between align-items-center'>
              <h6 className='mb-0'>Report Results</h6>
                             <div className='text-end'>
                 <small className='text-muted'>
                   Selected Columns: {selectedColumns.length} | Available: {availableColumns.length}
                 </small>
               </div>
            </div>
           </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
                             <table className='table table-bordered mb-0' style={{ 
                 borderColor: '#dee2e6',
                 borderCollapse: 'collapse',
                 width: '100%'
               }}>
                                                  <thead style={{ 
                   position: 'sticky',
                   top: 0,
                   zIndex: 10
                 }}>
                                         <tr style={{ 
                       background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)'
                     }}>
                      {selectedColumns && selectedColumns.length > 0 ? (
                        selectedColumns
                          .filter(column => typeof column === 'string' && column.length > 0)
                          .map((column, index) => {
                            console.log(`Rendering header ${index}:`, column);
                            return (
                                                             <th 
                                 key={index} 
                                 style={{ 
                                   color: 'white', 
                                   fontWeight: '600',
                                   background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                                   padding: '15px 12px',
                                   border: '1px solid #dee2e6',
                                   textAlign: 'left',
                                   verticalAlign: 'middle'
                                 }}
                               >
                                {column}
                                <Icon 
                                  icon='mdi:arrow-up-down' 
                                  className='ms-2' 
                                  style={{ 
                                    fontSize: '14px', 
                                    color: 'white',
                                    opacity: '0.8'
                                  }} 
                                />
                              </th>
                            );
                          })
                      ) : (
                                                 <th 
                           colSpan="1" 
                           style={{ 
                             color: 'white', 
                             fontWeight: '600',
                             background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)',
                             padding: '15px 12px',
                             border: '1px solid #dee2e6',
                             textAlign: 'center'
                           }} 
                           className='text-center'
                         >
                          No columns selected
                        </th>
                      )}
                    </tr>
                  </thead>
                                                    <tbody>
                     {reportData.slice(0, 100).map((row, rowIndex) => (
                       <tr key={rowIndex} style={{ 
                         backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f8f9fa',
                         transition: 'background-color 0.2s ease'
                       }}>
                         {selectedColumns && selectedColumns.length > 0 ? (
                           selectedColumns.map((column, colIndex) => (
                                                           <td key={colIndex} style={{ 
                                padding: '12px 8px',
                                verticalAlign: 'middle',
                                borderColor: '#dee2e6',
                                border: '1px solid #dee2e6',
                                backgroundColor: 'transparent'
                              }}>
                                {row[column] || '-'}
                              </td>
                           ))
                         ) : (
                           <td colSpan="1" className='text-center text-muted' style={{ 
                             padding: '20px',
                             borderColor: '#dee2e6'
                           }}>
                             No data to display
                           </td>
                         )}
                       </tr>
                     ))}
                   </tbody>
              </table>
            </div>
            
            {/* Pagination Info */}
            <div className='d-flex justify-content-between align-items-center p-3 border-top'>
              <div className='text-secondary'>
                Showing 1 to {Math.min(100, reportData.length)} of {reportData.length} entries
              </div>
              <div className='d-flex gap-1'>
                <button className='btn btn-outline-secondary btn-sm'>Previous</button>
                <button className='btn btn-primary btn-sm'>1</button>
                <button className='btn btn-outline-secondary btn-sm'>2</button>
                <button className='btn btn-outline-secondary btn-sm'>3</button>
                <button className='btn btn-outline-secondary btn-sm'>4</button>
                <button className='btn btn-outline-secondary btn-sm'>5</button>
                <span className='px-2 py-1'>...</span>
                <button className='btn btn-outline-secondary btn-sm'>18</button>
                <button className='btn btn-outline-secondary btn-sm'>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MasterLayout>
  );
};

export default ItsmReportsPage;
