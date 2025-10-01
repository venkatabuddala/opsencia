import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import CreateBidModal from "./CreateBidModal";

const ProcurementBidsLayer = () => {
  const navigate = useNavigate();
  const [publishedBidsPage, setPublishedBidsPage] = useState(1);
  const [draftBidsPage, setDraftBidsPage] = useState(1);
  const [publishedRowsPerPage, setPublishedRowsPerPage] = useState(10);
  const [draftRowsPerPage, setDraftRowsPerPage] = useState(10);
  const [isCreateBidModalOpen, setIsCreateBidModalOpen] = useState(false);

  // Mock data for Published Bids
  const publishedBids = [
    {
      id: 'RFP250026',
      bidNo: '369812703',
      status: 'Awarded',
      title: 'RFP for Service MS office',
      type: 'RFP',
      prNumber: 'NA',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 2,
      responded: 2,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250024',
      bidNo: '369812700',
      status: 'Closed',
      title: 'PR Testing for 21st July',
      type: 'RFP',
      prNumber: 'PR_00144',
      timeLeft: 'Bid Closed',
      invited: 3,
      acknowledged: 1,
      responded: 1,
      action: 'EVALUATE'
    },
    {
      id: 'TND250003',
      bidNo: '369812697',
      status: 'Award Under Process',
      title: 'Tender for Test Demo',
      type: 'Tender',
      prNumber: 'PR_00143',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 3,
      responded: 3,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250023',
      bidNo: '369812696',
      status: 'Awarded',
      title: 'Laptops for freshers',
      type: 'RFP',
      prNumber: 'PR_00142',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 0,
      responded: 0,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250022',
      bidNo: '369812695',
      status: 'Awarded',
      title: 'Demo 21st May',
      type: 'RFP',
      prNumber: 'PR_00141',
      timeLeft: 'Bid Closed',
      invited: 3,
      acknowledged: 2,
      responded: 2,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFQ250005',
      bidNo: '369812694',
      status: 'Awarded',
      title: 'Demo 21st May',
      type: 'RFQ',
      prNumber: 'PR_00140',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 1,
      responded: 1,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250020',
      bidNo: '369812691',
      status: 'Awarded',
      title: 'Demo 21st May',
      type: 'RFP',
      prNumber: 'PR_00139',
      timeLeft: 'Bid Closed',
      invited: 3,
      acknowledged: 3,
      responded: 3,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250019',
      bidNo: '369812690',
      status: 'Awarded',
      title: 'Demo 21st May',
      type: 'RFP',
      prNumber: 'PR_00138',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 2,
      responded: 2,
      action: 'RE EVALUATE'
    },
    {
      id: 'RFP250018',
      bidNo: '369812689',
      status: 'Closed',
      title: 'Demo 21st May',
      type: 'RFP',
      prNumber: 'PR_00136',
      timeLeft: 'Bid Closed',
      invited: 2,
      acknowledged: 1,
      responded: 1,
      action: 'EVALUATE'
    },
    {
      id: 'RFQ250004',
      bidNo: '369812688',
      status: 'Awarded',
      title: 'Demo 21st May',
      type: 'RFQ',
      prNumber: 'PR_00135',
      timeLeft: 'Bid Closed',
      invited: 3,
      acknowledged: 2,
      responded: 2,
      action: 'RE EVALUATE'
    }
  ];

  // Mock data for Draft Bids
  const draftBids = [
    {
      id: 'TND250004',
      bidNo: '369812704',
      status: 'Draft',
      title: 'Tender',
      type: 'Tender',
      operatingUnit: 'Opsencia',
      bidStyle: 'Open',
      prNumber: 'NA'
    },
    {
      id: 'RFP250025',
      bidNo: '369812702',
      status: 'Draft',
      title: 'RFP for services',
      type: 'RFP',
      operatingUnit: 'Opsencia',
      bidStyle: 'Sealed',
      prNumber: 'PR_00145'
    },
    {
      id: 'RFQ250006',
      bidNo: '369812701',
      status: 'Draft',
      title: 'PR for laptops',
      type: 'RFQ',
      operatingUnit: '81',
      bidStyle: 'Open',
      prNumber: 'PR_00137'
    },
    {
      id: 'TND250005',
      bidNo: '369812700',
      status: 'Draft',
      title: 'Demo 21st May',
      type: 'Tender',
      operatingUnit: 'Opsencia',
      bidStyle: 'Sealed',
      prNumber: 'PR_00135'
    },
    {
      id: 'RFP250026',
      bidNo: '369812699',
      status: 'Draft',
      title: 'IT Equipments',
      type: 'RFP',
      operatingUnit: 'Opsencia',
      bidStyle: 'Open',
      prNumber: 'PR_00132'
    },
    {
      id: 'RFQ250007',
      bidNo: '369812698',
      status: 'Draft',
      title: 'PR on 3rd June',
      type: 'RFQ',
      operatingUnit: '81',
      bidStyle: 'Sealed',
      prNumber: 'PR_00130'
    },
    {
      id: 'TND250006',
      bidNo: '369812697',
      status: 'Draft',
      title: 'Test Bid 21st May',
      type: 'Tender',
      operatingUnit: 'Opsencia',
      bidStyle: 'Open',
      prNumber: 'PR_00050'
    },
    {
      id: 'RFP250027',
      bidNo: '369812696',
      status: 'Draft',
      title: 'Laptops for new joiners',
      type: 'RFP',
      operatingUnit: 'Opsencia',
      bidStyle: 'Sealed',
      prNumber: 'PR_00128'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Awarded': return 'status-awarded';
      case 'Closed': return 'status-closed';
      case 'Award Under Process': return 'status-award-under-process';
      case 'Draft': return 'status-draft';
      default: return 'status-default';
    }
  };

  const getActionButtonClass = (action) => {
    return action === 'RE EVALUATE' ? 'action-btn-re-evaluate' : 'action-btn-evaluate';
  };

  const handleCreateBid = () => {
    setIsCreateBidModalOpen(true);
  };

  const handleCloseCreateBidModal = () => {
    setIsCreateBidModalOpen(false);
  };

  const handleSubmitCreateBid = (formData) => {
    console.log('Creating bid with data:', formData);
    // Here you would typically make an API call to create the bid
    // For now, we'll just log the data and close the modal
    alert('Bid created successfully!');
  };

  const handleBidIdClick = (bidId) => {
    navigate('/procurement/bids/view');
  };

  return (
    <div className="procurement-bids-workbench">
      {/* Header Section */}
      <div className="workbench-header">
        <div className="header-content">
          <h6 className="workbench-title">Sourcing Workbench</h6>
          <p className="workbench-description">
            Bid Sourcing workbench, place to manage all bids prepared, published, evaluated and awarded.
          </p>
        </div>
      </div>

      {/* Published Bids Section */}
      <div className="bids-section">
        <div className="section-header">
          <h6 className="section-title">Published Bids</h6>
        </div>
        
        <div className="table-container">
          <table className="bids-table">
            <thead>
              <tr>
                <th>
                  Id
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Bid No.
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Status
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Title
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Type
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  PR #
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Time Left
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Invited
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Ack.
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Responded
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishedBids.map((bid, index) => (
                <tr key={index}>
                  <td className="bid-id clickable" onClick={() => handleBidIdClick(bid.id)}>{bid.id}</td>
                  <td className="bid-number">{bid.bidNo}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(bid.status)}`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="bid-title">{bid.title}</td>
                  <td className="bid-type">{bid.type}</td>
                  <td className="pr-number">{bid.prNumber}</td>
                  <td className="time-left">{bid.timeLeft}</td>
                  <td className="invited-count">{bid.invited}</td>
                  <td className="acknowledged-count">{bid.acknowledged}</td>
                  <td className="responded-count">{bid.responded}</td>
                  <td>
                    <button className={`action-btn ${getActionButtonClass(bid.action)}`}>
                      {bid.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Published Bids Pagination */}
        <div className="pagination-section">
          <div className="pagination-controls">
            <select 
              value={publishedRowsPerPage} 
              onChange={(e) => setPublishedRowsPerPage(Number(e.target.value))}
              className="rows-selector"
            >
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
            </select>
            <div className="pagination-info">
              <span>K</span>
              <button className="pagination-btn">{"<"}</button>
              <span>1-10 of 125</span>
              <button className="pagination-btn">{">"}</button>
              <button className="pagination-btn">{">|"}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Draft Bids Section */}
      <div className="bids-section">
        <div className="section-header">
          <h6 className="section-title">Draft Bids</h6>
          <div className="section-actions">
            <button className="btn btn-secondary">CONSOLIDATED PR</button>
            <button className="btn btn-primary" onClick={handleCreateBid}>CREATE BID</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="bids-table">
            <thead>
              <tr>
                <th>
                  Id
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Bid No.
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Status
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Title
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Type
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Operating Unit
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  Bid Style
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
                <th>
                  PR #
                  <Icon icon="mdi:filter" className="filter-icon" />
                </th>
              </tr>
            </thead>
            <tbody>
              {draftBids.map((bid, index) => (
                <tr key={index}>
                  <td className="bid-id clickable" onClick={() => handleBidIdClick(bid.id)}>{bid.id}</td>
                  <td className="bid-number">{bid.bidNo}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(bid.status)}`}>
                      {bid.status}
                    </span>
                  </td>
                  <td className="bid-title">{bid.title}</td>
                  <td className="bid-type">{bid.type}</td>
                  <td className="operating-unit">{bid.operatingUnit}</td>
                  <td className="bid-style">{bid.bidStyle}</td>
                  <td className="pr-number">{bid.prNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Draft Bids Pagination */}
        <div className="pagination-section">
          <div className="pagination-controls">
            <select 
              value={draftRowsPerPage} 
              onChange={(e) => setDraftRowsPerPage(Number(e.target.value))}
              className="rows-selector"
            >
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
            </select>
            <div className="pagination-info">
              <span>K</span>
              <button className="pagination-btn">{"<"}</button>
              <span>1-10 of 11</span>
              <button className="pagination-btn">{">"}</button>
              <button className="pagination-btn">{">|"}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Bid Modal */}
      <CreateBidModal
        isOpen={isCreateBidModalOpen}
        onClose={handleCloseCreateBidModal}
        onSubmit={handleSubmitCreateBid}
      />

      <style jsx>{`
        /* Common Styles */
        .procurement-bids-workbench {
          padding: 20px;
          background: #f8f9fc;
          min-height: 100vh;
        }

        /* Header Section */
        .workbench-header {
          margin-bottom: 32px;
        }

        .workbench-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .workbench-description {
          font-size: 14px;
          color: #6c757d;
          margin: 0;
          line-height: 1.5;
        }

        /* Bids Section */
        .bids-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
          overflow: hidden;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0 24px;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 0;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .section-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        /* Table Styles */
        .table-container {
          overflow-x: auto;
        }

        .bids-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .bids-table th {
          background: #f8f9fa;
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #e9ecef;
          white-space: nowrap;
          position: relative;
        }

        .bids-table td {
          padding: 16px 12px;
          border-bottom: 1px solid #e9ecef;
          color: #495057;
          white-space: nowrap;
        }

        .bids-table tbody tr:hover {
          background: #f8f9fa;
        }

        .filter-icon {
          font-size: 14px;
          color: #6c757d;
          margin-left: 8px;
          cursor: pointer;
        }

        /* Bid ID Styling */
        .bid-id.clickable {
          color: #007bff;
          cursor: pointer;
          text-decoration: underline;
        }

        .bid-id.clickable:hover {
          color: #0056b3;
          text-decoration: none;
        }

        /* Status Badges */
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
        }

        .status-awarded {
          background: #d4edda;
          color: #155724;
        }

        .status-closed {
          background: #f8d7da;
          color: #721c24;
        }

        .status-award-under-process {
          background: #fff3cd;
          color: #856404;
        }

        .status-draft {
          background: #cce5ff;
          color: #004085;
        }

        .status-default {
          background: #e9ecef;
          color: #495057;
        }

        /* Action Buttons */
        .action-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-re-evaluate {
          background: #e2e3f0;
          color: #6f42c1;
        }

        .action-btn-re-evaluate:hover {
          background: #d1d3e2;
        }

        .action-btn-evaluate {
          background: #e2e3f0;
          color: #6f42c1;
        }

        .action-btn-evaluate:hover {
          background: #d1d3e2;
        }

        /* Pagination */
        .pagination-section {
          padding: 16px 24px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .pagination-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rows-selector {
          padding: 6px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          background: white;
          font-size: 14px;
          color: #495057;
        }

        .pagination-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #495057;
        }

        .pagination-btn {
          padding: 6px 8px;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover {
          background: #e9ecef;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .procurement-bids-workbench {
            padding: 16px;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .section-actions {
            justify-content: center;
          }

          .bids-table {
            font-size: 12px;
          }

          .bids-table th,
          .bids-table td {
            padding: 12px 8px;
          }

          .pagination-controls {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .bids-table th,
          .bids-table td {
            padding: 8px 4px;
            font-size: 11px;
          }

          .status-badge {
            padding: 2px 8px;
            font-size: 10px;
          }

          .action-btn {
            padding: 4px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementBidsLayer;
