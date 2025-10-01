import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProcurementCreateRequisitionModal from "./ProcurementCreateRequisitionModal";

const ProcurementRequisitionsListLayer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for Purchase Requests/Requisitions
  const purchaseRequests = [
    {
      id: 'PR250024',
      prNo: 'PR_00147',
      status: 'Complete',
      bidNo: 'Not Created',
      poNo: 'PO_00099',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: 'AED 45,000.00',
      creDate: '08-05-2025',
      delDate: '08-05-2025'
    },
    {
      id: 'PR250023',
      prNo: 'PR_00146',
      status: 'Approved',
      bidNo: 'CREATE BID',
      poNo: 'CREATE PO',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: 'AED 45,000.00',
      creDate: '08-04-2025',
      delDate: '08-04-2025'
    },
    {
      id: 'PR250022',
      prNo: 'PR_00145',
      status: 'Approved',
      bidNo: '369812701',
      poNo: 'Not Created',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: 'AED 45,000.00',
      creDate: '08-04-2025',
      delDate: '08-04-2025'
    },
    {
      id: 'PR250021',
      prNo: 'PR_00144',
      status: 'Approved',
      bidNo: '369812700',
      poNo: 'Not Created',
      requestor: 'Department User',
      department: '341758224',
      buyer: 'Proc_Officer',
      prAmount: '$ 10,500.00',
      creDate: '07-21-2025',
      delDate: '07-21-2025'
    },
    {
      id: 'PR250020',
      prNo: 'PR_00143',
      status: 'Draft',
      bidNo: 'Not Created',
      poNo: 'Not Created',
      requestor: 'Department User',
      department: 'Operations Department',
      buyer: 'Proc_Officer',
      prAmount: '$ 100,700.00',
      creDate: '07-21-2025',
      delDate: '07-21-2025'
    },
    {
      id: 'PR250019',
      prNo: 'PR_00142',
      status: 'Pending Approval',
      bidNo: 'Not Created',
      poNo: 'Not Created',
      requestor: 'Department User',
      department: 'Operations Department',
      buyer: 'Proc_Officer',
      prAmount: '$ 100,000.00',
      creDate: '07-08-2025',
      delDate: '07-08-2025'
    },
    {
      id: 'PR250018',
      prNo: 'PR_00141',
      status: 'Approved',
      bidNo: '369812699',
      poNo: 'PO_00095',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: '$ 53,725.00',
      creDate: '07-08-2025',
      delDate: '07-08-2025'
    },
    {
      id: 'PR250017',
      prNo: 'PR_00140',
      status: 'Complete',
      bidNo: '369812698',
      poNo: 'PO_00094',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: '₹ 5,00,000.00',
      creDate: '07-07-2025',
      delDate: '07-07-2025'
    },
    {
      id: 'PR250016',
      prNo: 'PR_00139',
      status: 'Approved',
      bidNo: '369812697',
      poNo: 'Not Created',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: '₹ 5,00,000.00',
      creDate: '07-07-2025',
      delDate: '07-07-2025'
    },
    {
      id: 'PR250015',
      prNo: 'PR_00138',
      status: 'Complete',
      bidNo: '369812696',
      poNo: 'PO_00092',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      prAmount: '₹ 5,00,000.00',
      creDate: '06-25-2025',
      delDate: '06-25-2025'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Complete':
        return 'status-badge complete';
      case 'Approved':
        return 'status-badge approved';
      case 'Draft':
        return 'status-badge draft';
      case 'Pending Approval':
        return 'status-badge pending';
      default:
        return 'status-badge';
    }
  };

  const handleCreateBid = (prId) => {
    console.log('Create Bid for PR:', prId);
    // Here you would typically navigate to create bid page or open modal
  };

  const handleCreatePO = (prId) => {
    console.log('Create PO for PR:', prId);
    // Here you would typically navigate to create PO page or open modal
  };

  const handleIdClick = (prId) => {
    navigate(`/procurement/requisitions/${prId}`);
  };

  const totalPages = Math.ceil(144 / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = purchaseRequests.slice(0, rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="procurement-requisitions">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Purchase Requests</h6>
          <p className="page-description">Manage all Purchase Requisitions from here.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            CREATE NEW
          </button>
          <button className="btn btn-icon">
            <Icon icon="mdi:dots-vertical" className="icon" />
          </button>
        </div>
      </div>

      {/* Purchase Requests Table */}
      <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
              <th>
                Id
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                PR No.
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Status
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Bid#
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                PO#
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Requestor
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Department
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Buyer
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                PR Amount
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Cre. Date
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Del. Date
                <Icon icon="mdi:filter" className="filter-icon" />
                </th>
              </tr>
            </thead>
            <tbody>
            {currentData.map((pr, index) => (
              <tr key={index}>
                <td 
                  className="pr-id clickable"
                  onClick={() => handleIdClick(pr.id)}
                >
                  {pr.id}
                  </td>
                <td className="pr-number">{pr.prNo}</td>
                <td>
                  <span className={getStatusBadgeClass(pr.status)}>
                    {pr.status}
                    </span>
                  </td>
                <td>
                  {pr.bidNo === 'CREATE BID' ? (
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleCreateBid(pr.id)}
                    >
                      CREATE BID
                    </button>
                  ) : (
                    <span className="bid-number">{pr.bidNo}</span>
                  )}
                  </td>
                <td>
                  {pr.poNo === 'CREATE PO' ? (
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => handleCreatePO(pr.id)}
                    >
                      CREATE PO
                      </button>
                  ) : (
                    <span className="po-number">{pr.poNo}</span>
                  )}
                  </td>
                <td>{pr.requestor}</td>
                <td>{pr.department}</td>
                <td>{pr.buyer}</td>
                <td className="amount">{pr.prAmount}</td>
                <td>{pr.creDate}</td>
                <td>{pr.delDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {/* Pagination */}
      <div className="pagination-section">
        <div className="pagination-left">
          <span className="rows-info">{rowsPerPage} rows</span>
        </div>
        <div className="pagination-center">
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <Icon icon="mdi:chevron-double-left" />
          </button>
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon icon="mdi:chevron-left" />
          </button>
          <span className="page-info">{currentPage}-{Math.min(endIndex, 144)} of 144</span>
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon icon="mdi:chevron-right" />
          </button>
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <Icon icon="mdi:chevron-double-right" />
          </button>
        </div>
        <div className="pagination-right">
          <select 
            value={rowsPerPage} 
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            className="rows-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Create Requisition Modal */}
      <ProcurementCreateRequisitionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(formData) => {
          console.log('Purchase Requisition created:', formData);
          // Here you would typically add the new requisition to your data
          setShowCreateModal(false);
        }}
      />

      <style jsx>{`
        .procurement-requisitions {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .page-description {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #007bff;
          color: white;
          font-size: 14px;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .btn-outline {
          background: transparent;
          color: #007bff;
          border: 1px solid #007bff;
          font-size: 12px;
          padding: 6px 12px;
        }

        .btn-outline:hover {
          background: #007bff;
          color: white;
        }

        .btn-sm {
          padding: 4px 8px;
          font-size: 12px;
        }

        .btn-icon {
          background: #f8f9fa;
          color: #666;
          padding: 10px;
          border: 1px solid #e9ecef;
        }

        .btn-icon:hover {
          background: #e9ecef;
        }

        .icon {
          font-size: 18px;
        }

        .table-container {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #f8f9fa;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #e9ecef;
          position: relative;
        }

        .data-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f1f3f4;
          color: #666;
          font-size: 14px;
        }

        .data-table tbody tr:hover {
          background: #f8f9fa;
        }

        .filter-icon {
          font-size: 14px;
          color: #6c757d;
          margin-left: 8px;
          cursor: pointer;
        }

        .pr-id {
          font-weight: 600;
          color: #333;
        }

        .pr-id.clickable {
          cursor: pointer;
          color: #007bff;
        }

        .pr-id.clickable:hover {
          text-decoration: underline;
        }

        .pr-number {
          color: #007bff;
          cursor: pointer;
        }

        .pr-number:hover {
          text-decoration: underline;
        }

        .bid-number, .po-number {
          color: #007bff;
          cursor: pointer;
        }

        .bid-number:hover, .po-number:hover {
          text-decoration: underline;
        }

        .amount {
          font-weight: 600;
          color: #333;
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

        .status-badge.complete {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.approved {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.draft {
          background: #cce5ff;
          color: #0066cc;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        /* Pagination */
        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
        }

        .pagination-left {
          display: flex;
          align-items: center;
        }

        .rows-info {
          color: #666;
          font-size: 14px;
        }

        .pagination-center {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .pagination-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e9ecef;
          background: white;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #666;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          color: #666;
          font-size: 14px;
        }

        .pagination-right {
          display: flex;
          align-items: center;
        }

        .rows-select {
          padding: 6px 12px;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          background: white;
          color: #666;
          font-size: 14px;
          cursor: pointer;
        }

        .rows-select:focus {
          outline: none;
          border-color: #007bff;
        }

        @media (max-width: 1200px) {
          .data-table {
            font-size: 12px;
          }

          .data-table th,
          .data-table td {
            padding: 10px 8px;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .header-actions {
            justify-content: flex-start;
          }

          .table-container {
            overflow-x: auto;
          }

          .pagination-section {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .pagination-center {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementRequisitionsListLayer;
