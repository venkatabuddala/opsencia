import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const ProcurementDashboardLayer = () => {
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

  // Bar chart component for Requisitions Trend
  const RequisitionsBarChart = () => {
    const chartData = [
      { day: 'Mon', draft: 45, pending: 90, approved: 60, rejected: 30 },
      { day: 'Tue', draft: 100, pending: 145, approved: 120, rejected: 85 },
      { day: 'Wed', draft: 40, pending: 80, approved: 60, rejected: 45 },
      { day: 'Thu', draft: 55, pending: 125, approved: 90, rejected: 70 },
      { day: 'Fri', draft: 30, pending: 70, approved: 50, rejected: 35 },
      { day: 'Sat', draft: 55, pending: 145, approved: 95, rejected: 60 },
      { day: 'Sun', draft: 50, pending: 110, approved: 90, rejected: 55 }
    ];

    const series = [
      {
        name: 'Draft',
        data: chartData.map(d => d.draft),
        color: '#dc3545'
      },
      {
        name: 'Pending',
        data: chartData.map(d => d.pending),
        color: '#ffc107'
      },
      {
        name: 'Approved',
        data: chartData.map(d => d.approved),
        color: '#0dcaf0'
      },
      {
        name: 'Rejected',
        data: chartData.map(d => d.rejected),
        color: '#6c757d'
      }
    ];

    const options = {
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false
        },
        stacked: false,
        group: 'requisitions'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: chartData.map(d => d.day),
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 600
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '12px'
          },
          formatter: function (val) {
            return val.toFixed(0);
          }
        },
        axisBorder: {
          show: false
        }
      },
      fill: {
        opacity: 0.8
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " requisitions";
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '12px',
        markers: {
          width: 8,
          height: 8,
          radius: 4
        }
      },
      grid: {
        borderColor: '#f1f1f1',
        strokeDashArray: 3
      }
    };

    return (
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    );
  };

  // Pie chart component for Approval Queue by Priority
  const ApprovalQueuePieChart = () => {
    const chartData = [
      { name: 'High Priority', value: 2, color: '#dc3545' },
      { name: 'Medium Priority', value: 2, color: '#ffc107' },
      { name: 'Low Priority', value: 1, color: '#0dcaf0' }
    ];

    const series = chartData.map(d => d.value);
    const labels = chartData.map(d => d.name);

    const options = {
      chart: {
        type: 'pie',
        height: 300,
        toolbar: {
          show: false
        }
      },
      labels: labels,
      colors: chartData.map(d => d.color),
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex] + " (" + val.toFixed(1) + "%)";
        },
        style: {
          fontSize: '12px',
          fontWeight: 600
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '12px',
        markers: {
          width: 8,
          height: 8,
          radius: 4
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " items";
          }
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                }
              }
            }
          }
        }
      }
    };

    return (
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={300}
      />
    );
  };

  // Navigation handlers
  const handleNavigateToRequisitions = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/procurement/requisitions?${queryParams.toString()}`);
  };

  const handleNavigateToPurchaseOrders = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/procurement/purchase-orders?${queryParams.toString()}`);
  };

  const handleNavigateToInvoices = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/procurement/invoices?${queryParams.toString()}`);
  };

  const handleNavigateToSuppliers = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/procurement/suppliers/list?${queryParams.toString()}`);
  };

  const handleNavigateToBudgets = (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    navigate(`/procurement/budgets?${queryParams.toString()}`);
  };

  // Mock data for procurement dashboard
  const dashboardData = {
    totalUsers: 31,
    activeOrganizations: 12,
    supplierUsers: 19,
    pendingApprovals: {
      supplierRegistrations: 0,
      purchaseRequests: 1,
      purchaseOrders: 0,
      invoices: 1,
      budgets: 1
    },
    tasks: [
      {
        id: 1,
        type: 'Budget Approval Request',
        description: 'Budget for 25 - Opsencia',
        from: 'Super Admin',
        date: '2025-07-21T16:50:41+05:30',
        priority: 'high'
      },
      {
        id: 2,
        type: 'Bid Award Request',
        description: 'Tender for Test Demo',
        from: 'Super Admin',
        date: '2025-07-21T13:04:11+05:30',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'Invoice Approval Request',
        description: 'Rozi International Group - Invoice No: Inv21131',
        from: 'Super Admin',
        date: '2025-05-14T12:20:55+05:30',
        priority: 'high'
      },
      {
        id: 4,
        type: 'PR Approval Request',
        description: 'PR_00124 - Demo 13th May',
        from: 'Super Admin',
        date: '2025-05-13T16:17:29+05:30',
        priority: 'medium'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'Product Category created',
        reference: 'CATALOGUE 371206861',
        date: '2025-08-06T14:34:05+05:30'
      },
      {
        id: 2,
        type: 'Product Category created',
        reference: 'CATALOGUE 371206860',
        date: '2025-08-06T14:33:28+05:30'
      },
      {
        id: 3,
        type: 'Product Category created',
        reference: 'CATALOGUE 371206859',
        date: '2025-08-06T14:33:02+05:30'
      },
      {
        id: 4,
        type: 'Product Category created',
        reference: 'CATALOGUE 371206858',
        date: '2025-08-06T14:32:34+05:30'
      },
      {
        id: 5,
        type: 'Product Category created',
        reference: 'CATALOGUE 371206857',
        date: '2025-08-06T14:31:55+05:30'
      }
    ],
    myRequests: {
      draftRequisitions: 3,
      waitingForPurchase: 114,
      draftOrders: 6,
      pendingDeliveryOrders: 26,
      pendingPayments: 10
    },
    availableBudgets: [
      {
        id: 1,
        name: 'Budget for 25 - Opsencia',
        owner: 'Super Admin',
        currency: 'USD',
        total: 1500000,
        remaining: 10500,
        percentage: 99.3
      },
      {
        id: 2,
        name: 'Office Equipment Budget - Opsencia',
        owner: 'Super Admin',
        currency: 'USD',
        total: 5300000000,
        remaining: 1240160,
        percentage: 99.98
      },
      {
        id: 3,
        name: 'IT Hardware - Opsencia',
        owner: 'Procurement Officer',
        currency: 'USD',
        total: 10000000,
        remaining: 632320,
        percentage: 93.68
      },
      {
        id: 4,
        name: 'IT Hardware Australia - Opsencia Australia',
        owner: 'Procurement Officer',
        currency: 'USD',
        total: 5000000,
        remaining: 2500000,
        percentage: 50
      }
    ],
    recentComments: [
      {
        id: 1,
        user: 'Super Admin',
        time: '12:10 PM',
        comment: 'Hi'
      }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-danger-main';
      case 'medium': return 'text-warning-main';
      case 'low': return 'text-info-main';
      default: return 'text-neutral-400';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'ri-error-warning-line';
      case 'medium': return 'ri-information-line';
      case 'low': return 'ri-check-line';
      default: return 'ri-circle-line';
    }
  };

  return (
    <>
      {/* KPI Cards */}
      <div className='row row-cols-xxxl-4 row-cols-lg-2 row-cols-1 gy-4'>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-1 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Pending Requisitions</p>
                  <h6 className='mb-0'>{dashboardData.pendingApprovals.purchaseRequests}</h6>
                </div>
                <div className='w-50-px h-50-px bg-danger-main rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:clipboard-text-outline' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='d-inline-flex align-items-center gap-1 text-danger-main'>
                  <Icon icon='bxs:up-arrow' className='text-xs' /> +2 today
                </span>
                <span 
                  style={{ cursor: 'pointer' }} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateToRequisitions({ status: 'Pending' });
                  }}
                >
                  High Priority: 3
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-2 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Active Orders</p>
                  <h6 className='mb-0'>{dashboardData.myRequests.pendingDeliveryOrders}</h6>
                </div>
                <div className='w-50-px h-50-px bg-warning-main rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:cart-outline' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='d-inline-flex align-items-center gap-1 text-success-main'>
                  <Icon icon='bxs:down-arrow' className='text-xs' /> -5
                </span>
                Last 24h
              </p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-3 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToInvoices()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Pending Invoices</p>
                  <h6 className='mb-0'>{dashboardData.pendingApprovals.invoices}</h6>
                </div>
                <div className='w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:receipt-text' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0'>Approval pending: 2</p>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-4 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToSuppliers()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Active Suppliers</p>
                  <h6 className='mb-0'>{dashboardData.supplierUsers}</h6>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:truck' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0'>New registrations: 3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional KPI Cards */}
      <div className='row row-cols-xxxl-4 row-cols-lg-2 row-cols-1 gy-4 mt-4'>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToBudgets()}>
            <div className='card-body p-20'>
              <div className='d-flex align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-light mb-1'>Active Budgets</p>
                  <h6 className='mb-0'>8</h6>
                </div>
                <div className='w-50-px h-50-px bg-success rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='mdi:chart-pie' className='text-white text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-sm text-primary-light mt-12 mb-0'>Total: $5.2M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Widgets */}
      <section className='row gy-4 mt-4'>
        {/* Purchase Orders Trend Chart */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Purchase Orders Trend (Last 7 Days)</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 89</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToPurchaseOrders()}>View Details</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex align-items-center justify-content-between mb-16'>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders({ status: 'Pending' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-danger-main'></span>
                  <span className='text-sm fw-medium'>Pending</span>
                  <span className='text-sm text-secondary-light'>12</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders({ status: 'Approved' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-warning-main'></span>
                  <span className='text-sm fw-medium'>Approved</span>
                  <span className='text-sm text-secondary-light'>28</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders({ status: 'In Progress' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-info'></span>
                  <span className='text-sm fw-medium'>In Progress</span>
                  <span className='text-sm text-secondary-light'>35</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders({ status: 'Completed' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-neutral-400'></span>
                  <span className='text-sm fw-medium'>Completed</span>
                  <span className='text-sm text-secondary-light'>14</span>
                </div>
              </div>
              
              {/* Purchase Orders Trend Line Chart */}
              <TrendChart
                data={[
                    { day: 'Mon', pending: 2, approved: 4, inProgress: 6, completed: 2 },
                    { day: 'Tue', pending: 3, approved: 5, inProgress: 7, completed: 3 },
                    { day: 'Wed', pending: 1, approved: 3, inProgress: 5, completed: 2 },
                    { day: 'Thu', pending: 2, approved: 6, inProgress: 8, completed: 3 },
                    { day: 'Fri', pending: 2, approved: 5, inProgress: 6, completed: 2 },
                    { day: 'Sat', pending: 1, approved: 3, inProgress: 2, completed: 1 },
                    { day: 'Sun', pending: 1, approved: 2, inProgress: 1, completed: 1 }
                ]}
                type="purchase-orders"
                colors={{
                  pending: '#dc3545',
                  approved: '#ffc107',
                  inProgress: '#0dcaf0',
                  completed: '#6c757d'
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

        {/* Requisitions Trend Chart */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Requisitions Trend (Last 7 Days)</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 156</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToRequisitions()}>View Details</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex align-items-center justify-content-between mb-16'>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions({ status: 'Draft' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-danger-main'></span>
                  <span className='text-sm fw-medium'>Draft</span>
                  <span className='text-sm text-secondary-light'>24</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions({ status: 'Pending' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-warning-main'></span>
                  <span className='text-sm fw-medium'>Pending</span>
                  <span className='text-sm text-secondary-light'>67</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions({ status: 'Approved' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-info'></span>
                  <span className='text-sm fw-medium'>Approved</span>
                  <span className='text-sm text-secondary-light'>156</span>
                </div>
                <div className='d-flex align-items-center gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions({ status: 'Rejected' })}>
                  <span className='w-12-px h-12-px rounded-circle bg-neutral-400'></span>
                  <span className='text-sm fw-medium'>Rejected</span>
                  <span className='text-sm text-secondary-light'>95</span>
                </div>
              </div>
              
              {/* Requisitions Trend Bar Chart */}
              <RequisitionsBarChart />
              
              <div className='mt-16 text-center'>
                <span className='text-sm text-secondary-light'>
                  Trend: <span className='text-success-main'>↓ 12%</span> from last week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requisitions */}
        <div className='col-xxl-4'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Recent Requisitions</h6>
              <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToRequisitions()}>View All</button>
            </div>
            <div className='card-body p-20 pt-12'>
              <ul className='list-unstyled mb-0 d-flex flex-column gap-12'>
                {[
                  { status: 'Pending', text: 'Office Supplies - PR_00124', ago: '3m', id: 'PR-00124' },
                  { status: 'Approved', text: 'IT Equipment - PR_00123', ago: '9m', id: 'PR-00123' },
                  { status: 'Draft', text: 'Marketing Materials - PR_00122', ago: '17m', id: 'PR-00122' },
                  { status: 'Pending', text: 'Office Furniture - PR_00121', ago: '25m', id: 'PR-00121' }
                ].map((req, idx) => (
                  <li key={idx} className='d-flex align-items-start justify-content-between gap-3'>
                    <div className='d-flex align-items-start gap-3' style={{ cursor: 'pointer' }} onClick={() => handleNavigateToRequisitions({ status: req.status })}>
                      <span className={`w-10-px h-10-px rounded-circle mt-6 ${
                        req.status === 'Pending' ? 'bg-warning-main' : req.status === 'Approved' ? 'bg-info' : req.status === 'Draft' ? 'bg-danger-main' : 'bg-neutral-400'
                      }`} />
                      <div>
                        <p className='mb-0 text-sm fw-medium'>{req.text}</p>
                        <span className='text-xs text-secondary-light'>{req.status}</span>
                      </div>
                    </div>
                    <div className='d-flex flex-column align-items-end gap-2'>
                      <span className='text-xs text-secondary-light'>{req.ago} ago</span>
                      <span className='text-xs text-primary-600 fw-semibold'>{req.id}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Purchase Orders */}
        <div className='col-xxl-8'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Recent Purchase Orders</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Last update: 2m ago</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToPurchaseOrders()}>View All</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='table-responsive'>
                <table className='table mb-0'>
                  <thead>
                    <tr>
                      <th>PO Number</th>
                      <th>Supplier</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Created By</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { po: 'PO-2025-001', supplier: 'ABC Suppliers', status: 'Pending', amount: '$2,500', createdBy: 'J. Smith', updated: '5m' },
                      { po: 'PO-2025-002', supplier: 'XYZ Corp', status: 'Approved', amount: '$1,800', createdBy: 'M. Johnson', updated: '14m' },
                      { po: 'PO-2025-003', supplier: 'Tech Solutions', status: 'In Progress', amount: '$3,200', createdBy: 'A. Brown', updated: '22m' },
                      { po: 'PO-2025-004', supplier: 'Office Plus', status: 'Completed', amount: '$950', createdBy: 'S. Davis', updated: '31m' }
                    ].map((row) => (
                      <tr key={row.po} style={{ cursor: 'pointer' }} onClick={() => handleNavigateToPurchaseOrders()}>
                        <td className='fw-semibold'>{row.po}</td>
                        <td>{row.supplier}</td>
                        <td>
                          <span className={`badge ${row.status === 'Pending' ? 'bg-warning-main' : row.status === 'Approved' ? 'bg-info' : row.status === 'In Progress' ? 'bg-primary-600' : 'bg-success-main'}`}>{row.status}</span>
                        </td>
                        <td>{row.amount}</td>
                        <td>{row.createdBy}</td>
                        <td>{row.updated} ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0'>
              <h6 className='mb-0'>Budget Overview</h6>
            </div>
            <div className='card-body p-20 pt-12'>
              <div className='d-flex flex-column gap-12'>
                {dashboardData.availableBudgets.slice(0, 4).map((budget) => (
                  <div key={budget.id} className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center gap-8'>
                      <span className={`w-10-px h-10-px rounded-circle ${
                        budget.percentage > 80 ? 'bg-success-main' : budget.percentage > 50 ? 'bg-warning-main' : 'bg-danger-main'
                      }`} />
                      <span className='fw-medium'>{budget.name}</span>
                    </div>
                    <div className='text-end'>
                      <span className='text-sm text-secondary-light'>{budget.currency} {budget.remaining.toLocaleString()}</span>
                      <div className='text-xs text-secondary-light'>{budget.percentage.toFixed(1)}% remaining</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Approval Queue by Priority */}
        <div className='col-xl-6'>
          <div className='card h-100'>
            <div className='card-header border-bottom-0 pb-0 d-flex align-items-center justify-content-between'>
              <h6 className='mb-0'>Approval Queue by Priority</h6>
              <div className='d-flex align-items-center gap-2'>
                <span className='text-sm text-secondary-light'>Total: 5</span>
                <button type='button' className='btn btn-outline-primary-600 btn-sm' onClick={() => handleNavigateToRequisitions()}>View All</button>
              </div>
            </div>
            <div className='card-body p-20 pt-12'>
              <ApprovalQueuePieChart />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ProcurementDashboardLayer;

