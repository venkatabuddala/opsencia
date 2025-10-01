import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProcurementCreatePurchaseOrderModal from "./ProcurementCreatePurchaseOrderModal";

const ProcurementPurchaseOrdersLayer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for Purchase Orders
  const purchaseOrders = [
    {
      id: 'PO250016',
      poNo: 'PO_00099',
      status: 'Draft',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      supplier: 'Al Zahra Auto Spare ...',
      totalAmount: 'AED 45,000.00',
      creDate: '08-05-2025',
      delDate: '08-05-2025'
    },
    {
      id: 'PO250015',
      poNo: 'PO_00098',
      status: 'Complete',
      requestor: 'Department User',
      department: '100',
      buyer: 'Super Admin',
      supplier: 'Tamayuz Trading',
      totalAmount: '$ 10,500.00',
      creDate: '07-21-2025',
      delDate: '07-21-2025'
    },
    {
      id: 'PO250014',
      poNo: 'PO_00097',
      status: 'Closed',
      requestor: 'Department User',
      department: 'Operations Departmen ...',
      buyer: 'Super Admin',
      supplier: 'Al Zahra Auto Spare ...',
      totalAmount: '$ 10,500.00',
      creDate: '07-21-2025',
      delDate: '07-21-2025'
    },
    {
      id: 'PO250013',
      poNo: 'PO_00096',
      status: 'Closed',
      requestor: 'Department User',
      department: '341758224',
      buyer: 'Super Admin',
      supplier: 'Al Zahra Auto Spare ...',
      totalAmount: '$ 100,700.00',
      creDate: '07-21-2025',
      delDate: '07-21-2025'
    },
    {
      id: 'PO250012',
      poNo: 'PO_00095',
      status: 'Closed',
      requestor: 'Department User',
      department: 'Operations Departmen ...',
      buyer: 'Super Admin',
      supplier: 'Rozi International G...',
      totalAmount: '$ 100,000.00',
      creDate: '07-08-2025',
      delDate: '07-08-2025'
    },
    {
      id: 'PO250011',
      poNo: 'PO_00094',
      status: 'Closed',
      requestor: 'Super Admin',
      department: '100',
      buyer: 'Super Admin',
      supplier: 'Tamayuz Trading',
      totalAmount: '$ 53,725.00',
      creDate: '07-08-2025',
      delDate: '07-08-2025'
    },
    {
      id: 'PO250010',
      poNo: 'PO_00093',
      status: 'Closed',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      supplier: 'Rozi International G...',
      totalAmount: '₹ 5,00,000.00',
      creDate: '07-07-2025',
      delDate: '07-07-2025'
    },
    {
      id: 'PO250009',
      poNo: 'PO_00092',
      status: 'Complete',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      supplier: 'Rozi International G...',
      totalAmount: '₹ 5,00,000.00',
      creDate: '07-07-2025',
      delDate: '07-07-2025'
    },
    {
      id: 'PO250008',
      poNo: 'PO_00091',
      status: 'Closed',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      supplier: 'Rozi International G...',
      totalAmount: '₹ 5,00,000.00',
      creDate: '06-25-2025',
      delDate: '06-25-2025'
    },
    {
      id: 'PO250007',
      poNo: 'PO_00090',
      status: 'Closed',
      requestor: 'Super Admin',
      department: 'Admin Department',
      buyer: 'Super Admin',
      supplier: 'Al Zahra Auto Spare ...',
      totalAmount: '$ 23,000.00',
      creDate: '06-16-2025',
      delDate: '06-16-2025'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Draft':
        return 'status-badge draft';
      case 'Complete':
        return 'status-badge complete';
      case 'Closed':
        return 'status-badge closed';
      default:
        return 'status-badge';
    }
  };

  const totalPages = Math.ceil(99 / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = purchaseOrders.slice(0, rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <div className="procurement-purchase-orders">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Purchase Orders</h6>
          <p className="page-description">Manage all Purchase Orders from here.</p>
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

      {/* Purchase Orders Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                Id
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                PO No
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Status
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
                Supplier
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Total Amount
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
            {currentData.map((po, index) => (
              <tr key={index}>
                <td className="po-id">{po.id}</td>
                <td className="po-number">{po.poNo}</td>
                <td>
                  <span className={getStatusBadgeClass(po.status)}>
                    {po.status}
                  </span>
                </td>
                <td>{po.requestor}</td>
                <td>{po.department}</td>
                <td>{po.buyer}</td>
                <td>{po.supplier}</td>
                <td className="amount">{po.totalAmount}</td>
                <td>{po.creDate}</td>
                <td>{po.delDate}</td>
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
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon icon="mdi:chevron-left" />
          </button>
          <span className="page-info">{currentPage}-{Math.min(endIndex, 99)} of 99</span>
          <button 
            className="pagination-btn" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon icon="mdi:chevron-right" />
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

      {/* Create Purchase Order Modal */}
      <ProcurementCreatePurchaseOrderModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(formData) => {
          console.log('Purchase Order created:', formData);
          // Here you would typically add the new PO to your data
          setShowCreateModal(false);
        }}
      />

      <style jsx>{`
        .procurement-purchase-orders {
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

        .po-id {
          font-weight: 600;
          color: #333;
        }

        .po-number {
          color: #007bff;
          cursor: pointer;
        }

        .po-number:hover {
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

        .status-badge.draft {
          background: #cce5ff;
          color: #0066cc;
        }

        .status-badge.complete {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.closed {
          background: #d4edda;
          color: #155724;
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

export default ProcurementPurchaseOrdersLayer;

