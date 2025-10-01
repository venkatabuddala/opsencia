import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementInvoicesListLayer = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data for Invoices
  const invoices = [
    {
      id: 'INV250010',
      invoiceNo: '31212',
      status: 'Approved',
      supplier: 'Tamayuz Trading',
      department: '100',
      poNo: 'PO_00098',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 10,500.00',
      submitter: 'Fareed'
    },
    {
      id: 'INV250009',
      invoiceNo: '029813',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: 'Operations Departmen...',
      poNo: 'PO_00097',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 10,500.00',
      submitter: 'Parvez'
    },
    {
      id: 'INV250008',
      invoiceNo: '2134124',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: '341758224',
      poNo: 'PO_00096',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 100,700.00',
      submitter: 'Parvez'
    },
    {
      id: 'INV250007',
      invoiceNo: '092713',
      status: 'Paid',
      supplier: 'Rozi International G...',
      department: 'Admin Department',
      poNo: 'PO_00093',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '₹ 5,00,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250006',
      invoiceNo: '092712',
      status: 'Paid',
      supplier: 'Rozi International G...',
      department: 'Admin Department',
      poNo: 'PO_00092',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '₹ 5,00,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250005',
      invoiceNo: '092711',
      status: 'Paid',
      supplier: 'Rozi International G...',
      department: 'Admin Department',
      poNo: 'PO_00091',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '₹ 5,00,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250004',
      invoiceNo: '092710',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: 'Admin Department',
      poNo: 'PO_00090',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 23,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250003',
      invoiceNo: '092709',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: 'Admin Department',
      poNo: 'PO_00089',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 23,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250002',
      invoiceNo: '092708',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: 'Admin Department',
      poNo: 'PO_00088',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 23,000.00',
      submitter: 'Super A'
    },
    {
      id: 'INV250001',
      invoiceNo: '092707',
      status: 'Paid',
      supplier: 'Al Zahra Auto Spare...',
      department: 'Admin Department',
      poNo: 'PO_00087',
      invoiceType: 'STANDARD',
      invDate: '07-21-2025',
      dueDate: '08-20-2025',
      invoiceAmount: '$ 23,000.00',
      submitter: 'Super A'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-badge approved';
      case 'Paid':
        return 'status-badge paid';
      case 'Pending':
        return 'status-badge pending';
      case 'Draft':
        return 'status-badge draft';
      default:
        return 'status-badge';
    }
  };

  const totalPages = Math.ceil(62 / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = invoices.slice(0, rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const handleIdClick = (invoiceId) => {
    navigate(`/procurement/invoices/${invoiceId}`);
  };

  return (
    <div className="procurement-invoices">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Invoices</h6>
          <p className="page-description">Manage all Invoices from here.</p>
          <div className="summary-info">
            <span className="summary-text">All(62)</span>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/procurement/invoices/create-non-po')}
          >
            CREATE NON-PO INVOICE
          </button>
          <button className="btn btn-icon">
            <Icon icon="mdi:dots-vertical" className="icon" />
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                Id
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Invoice No
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Status
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Supplier
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Department
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                PO No
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Invoice Type
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Inv. Date
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Due Date
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Invoice Amount
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
              <th>
                Submit
                <Icon icon="mdi:filter" className="filter-icon" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((invoice, index) => (
              <tr key={index}>
                <td 
                  className="invoice-id clickable"
                  onClick={() => handleIdClick(invoice.id)}
                >
                  {invoice.id}
                </td>
                <td className="invoice-number">{invoice.invoiceNo}</td>
                <td>
                  <span className={getStatusBadgeClass(invoice.status)}>
                    {invoice.status}
                  </span>
                </td>
                <td>{invoice.supplier}</td>
                <td>{invoice.department}</td>
                <td className="po-number">{invoice.poNo}</td>
                <td>{invoice.invoiceType}</td>
                <td>{invoice.invDate}</td>
                <td>{invoice.dueDate}</td>
                <td className="amount">{invoice.invoiceAmount}</td>
                <td>{invoice.submitter}</td>
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
          <span className="page-info">{currentPage}-{Math.min(endIndex, 62)} of 62</span>
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

      <style jsx>{`
        .procurement-invoices {
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
          margin: 0 0 10px 0;
        }

        .summary-info {
          margin-top: 5px;
        }

        .summary-text {
          font-size: 14px;
          color: #666;
          font-weight: 500;
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

        .invoice-id {
          font-weight: 600;
          color: #333;
        }

        .invoice-id.clickable {
          cursor: pointer;
          color: #007bff;
        }

        .invoice-id.clickable:hover {
          text-decoration: underline;
        }

        .invoice-number {
          color: #007bff;
          cursor: pointer;
        }

        .invoice-number:hover {
          text-decoration: underline;
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

        .status-badge.approved {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.paid {
          background: #e2e3f1;
          color: #6f42c1;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-badge.draft {
          background: #cce5ff;
          color: #0066cc;
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

export default ProcurementInvoicesListLayer;
