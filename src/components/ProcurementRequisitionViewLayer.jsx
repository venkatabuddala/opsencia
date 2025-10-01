import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementRequisitionViewLayer = () => {
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);

  // Mock data for the requisition details
  const requisitionData = {
    prNo: 'PR_00147',
    description: 'PR for laptops',
    totalCost: 'AED 45,000.00',
    status: 'Complete',
    requestor: {
      name: 'Super Admin',
      email: 'gautamrao.l@Opsencia.com'
    },
    createdDate: '08-05-2025',
    needByDate: '08-05-2025',
    buyer: {
      name: 'Super Admin',
      email: 'gautamrao.l@Opsencia.com'
    },
    requestorDepartment: 'Admin Department',
    deliveryLocation: 'Head Quarters - Hyderabad',
    budgeted: 'Yes',
    notesToApprover: 'Laptop',
    budget: 'Budget for 25. IT Consulting Services',
    approvalHistory: [
      {
        approver: 'Super Admin',
        status: 'Approved',
        date: '08-05-2025'
      }
    ],
    items: [
      {
        no: 1,
        item: 'laptops',
        category: 'Computer Hardware',
        qty: 10,
        uom: 'Each',
        unitPrice: 'AED 4,500.00',
        totalCost: 'AED 45,000.00',
        status: 'Approved'
      }
    ]
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Complete':
        return 'status-badge complete';
      case 'Approved':
        return 'status-badge approved';
      case 'Draft':
        return 'status-badge draft';
      case 'Pending':
        return 'status-badge pending';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="procurement-requisition-view">
      <div className="view-container">
        {/* Main Content */}
        <div className="main-content">
          {/* Header Section */}
          <div className="header-section">
            <div className="pr-header">
              <div className="pr-info">
                <h6 className="pr-number">PR No.: {requisitionData.prNo}</h6>
                <p className="pr-description">{requisitionData.description}</p>
                <div className="pr-cost">
                  <span className="cost-label">Total Cost:</span>
                  <span className="cost-value">{requisitionData.totalCost}</span>
                </div>
              </div>
              <div className="pr-status">
                <span className={getStatusBadgeClass(requisitionData.status)}>
                  {requisitionData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="details-section">
            <div className="details-grid">
              <div className="detail-group">
                <h6>Requestor:</h6>
                <div className="user-info">
                  <span className="user-name">{requisitionData.requestor.name}</span>
                  <div className="user-email">
                    <Icon icon="mdi:account" className="user-icon" />
                    <span>{requisitionData.requestor.email}</span>
                  </div>
                </div>
              </div>

              <div className="detail-group">
                <h6>Created Date:</h6>
                <p>{requisitionData.createdDate}</p>
              </div>

              <div className="detail-group">
                <h6>Need By Date:</h6>
                <p>{requisitionData.needByDate}</p>
              </div>

              <div className="detail-group">
                <h6>Buyer:</h6>
                <div className="user-info">
                  <span className="user-name">{requisitionData.buyer.name}</span>
                  <div className="user-email">
                    <Icon icon="mdi:account" className="user-icon" />
                    <span>{requisitionData.buyer.email}</span>
                  </div>
                </div>
              </div>

              <div className="detail-group">
                <h6>Requestor Department:</h6>
                <p>{requisitionData.requestorDepartment}</p>
              </div>

              <div className="detail-group">
                <h6>Delivery Location:</h6>
                <div className="location-info">
                  <Icon icon="mdi:map-marker" className="location-icon" />
                  <span>{requisitionData.deliveryLocation}</span>
                </div>
              </div>

              <div className="detail-group">
                <h6>Budgeted:</h6>
                <p>{requisitionData.budgeted}</p>
              </div>

              <div className="detail-group">
                <h6>Notes to Approver:</h6>
                <p>{requisitionData.notesToApprover}</p>
              </div>
            </div>

            {/* Approval History Section */}
            <div className="approval-section">
              <div 
                className="approval-header"
                onClick={() => setShowApprovalHistory(!showApprovalHistory)}
              >
                <h6>Approval History</h6>
                <Icon 
                  icon={showApprovalHistory ? "mdi:chevron-up" : "mdi:chevron-down"} 
                  className="chevron-icon"
                />
              </div>
              
              {showApprovalHistory && (
                <div className="approval-content">
                  {requisitionData.approvalHistory.map((approval, index) => (
                    <div key={index} className="approval-item">
                      <div className="approver-info">
                        <Icon icon="mdi:account" className="approver-icon" />
                        <span className="approver-name">{approval.approver}</span>
                      </div>
                      <div className="approval-status">
                        <div className="status-dot approved"></div>
                        <span className="status-text">{approval.status}</span>
                      </div>
                      <div className="approval-date">
                        {approval.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Section */}
            <div className="budget-section">
              <h6>Budget:</h6>
              <p className="budget-info">{requisitionData.budget}</p>
            </div>

            {/* Items Table Section */}
            <div className="items-section">
              <h6>Items</h6>
              <div className="items-table-container">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Qty</th>
                      <th>UOM</th>
                      <th>Unit/Indicative/Expected Price</th>
                      <th>Total Cost</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisitionData.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.no}</td>
                        <td>{item.item}</td>
                        <td>{item.category}</td>
                        <td>{item.qty}</td>
                        <td>{item.uom}</td>
                        <td className="unit-price">{item.unitPrice}</td>
                        <td className="total-cost">{item.totalCost}</td>
                        <td>
                          <div className="item-status">
                            <div className="status-dot approved"></div>
                            <span className="status-text">{item.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-content">
            <button className="btn btn-primary add-documents">
              <Icon icon="mdi:plus" />
              ADD DOCUMENTS
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .procurement-requisition-view {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .view-container {
          display: flex;
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .main-content {
          flex: 1;
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .right-sidebar {
          width: 300px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .header-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }

        .pr-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .pr-info h6 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0 0 10px 0;
        }

        .pr-description {
          font-size: 16px;
          color: #666;
          margin: 0 0 15px 0;
        }

        .pr-cost {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cost-label {
          font-size: 16px;
          color: #666;
        }

        .cost-value {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .pr-status {
          display: flex;
          align-items: center;
        }

        .details-section {
          margin-bottom: 30px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .detail-group h6 {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-group p {
          font-size: 16px;
          color: #333;
          margin: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .user-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .user-email {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
        }

        .user-icon {
          font-size: 16px;
          color: #007bff;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          font-size: 16px;
        }

        .location-icon {
          font-size: 18px;
          color: #dc3545;
        }

        .approval-section {
          margin-bottom: 30px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }

        .approval-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #f8f9fa;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .approval-header:hover {
          background: #e9ecef;
        }

        .approval-header h6 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .chevron-icon {
          font-size: 20px;
          color: #666;
          transition: transform 0.2s ease;
        }

        .approval-content {
          padding: 20px;
          background: white;
        }

        .approval-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .approval-item:last-child {
          border-bottom: none;
        }

        .approver-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .approver-icon {
          font-size: 18px;
          color: #007bff;
        }

        .approver-name {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .approval-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.approved {
          background: #28a745;
        }

        .status-text {
          font-size: 14px;
          color: #333;
        }

        .approval-date {
          font-size: 14px;
          color: #666;
        }

        .budget-section {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .budget-section h6 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 10px 0;
        }

        .budget-info {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .items-section h6 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .items-table-container {
          overflow-x: auto;
          border: 1px solid #e9ecef;
          border-radius: 8px;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .items-table th {
          background: #007bff;
          color: white;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }

        .items-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f1f3f4;
          color: #333;
          font-size: 14px;
        }

        .items-table tbody tr:hover {
          background: #f8f9fa;
        }

        .unit-price, .total-cost {
          font-weight: 600;
          color: #333;
        }

        .item-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn {
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background: #0056b3;
        }

        .add-documents {
          width: 100%;
          justify-content: center;
        }

        /* Status Badges */
        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
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

        @media (max-width: 1200px) {
          .view-container {
            flex-direction: column;
          }

          .right-sidebar {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .procurement-requisition-view {
            padding: 10px;
          }

          .main-content {
            padding: 20px;
          }

          .pr-header {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .details-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .approval-item {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementRequisitionViewLayer;
