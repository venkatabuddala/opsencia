import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ProcurementBidViewLayer = () => {
  const [activeTab, setActiveTab] = useState('Evaluation Team');
  const navigate = useNavigate();

  // Mock data for bid details
  const bidDetails = {
    bidRefNo: "369812703",
    title: "RFP for Service MS office",
    prNumber: "NA",
    status: "Awarded",
    bidType: "RFP",
    requestor: "Super Admin",
    requestorEmail: "gautamrao.l@Opsencia.com",
    bidOpenDate: "08-04-2025 02:03 pm",
    bidCloseDate: "08-04-2025 02:08 pm",
    paymentTerms: "30 Days",
    buyer: "Super Admin",
    buyerEmail: "gautamrao.l@Opsencia.com",
    deliveryLocation: "Head Quarters - Hyderabad"
  };

  const scopeOfWork = [
    {
      item: "Software MS Office",
      category: "Software maintenance ...",
      qty: "5",
      uom: "Each",
      price: "AED 5,000.00",
      needByFrom: "08-04-2025",
      needByTo: "08-06-2025"
    }
  ];

  const invitedSuppliers = [
    {
      name: "Rozi International G ...",
      contact: "Omaer",
      phone: "+971 876 888909",
      email: "info@rozi.com"
    },
    {
      name: "Tamayuz Trading",
      contact: "Jackson",
      phone: "+971 777 6 66667",
      email: "info@tamayuz.com"
    }
  ];

  const evaluationTeam = [
    {
      name: "IT Manager",
      role: "Manager",
      email: "lohithkumar.petnikot...",
      team: "Technical Review Team"
    },
    {
      name: "Finance_Ma ...",
      role: "Manager",
      email: "sreya.ayyalaraju@pro...",
      team: "Commercial Review Team"
    }
  ];

  const auditHistory = [
    {
      actionDate: "08-04-2025 02:03 PM",
      action: "Bid Created",
      actionBy: "Super Admin"
    },
    {
      actionDate: "08-04-2025 02:03 PM",
      action: "Bid Published",
      actionBy: "Super Admin"
    },
    {
      actionDate: "08-04-2025 02:05 PM",
      action: "Bid Acknowledged",
      actionBy: "Rozi International G ..."
    },
    {
      actionDate: "08-04-2025 02:06 PM",
      action: "Bid Acknowledged",
      actionBy: "Tamayuz Trading"
    },
    {
      actionDate: "08-04-2025 02:08 PM",
      action: "Bid Closed",
      actionBy: "System"
    }
  ];

  const handleBackToList = () => {
    navigate('/procurement/bids');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Awarded':
        return 'status-badge awarded';
      case 'Published':
        return 'status-badge published';
      case 'Draft':
        return 'status-badge draft';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="procurement-bid-view">
      {/* Header Section */}
      <div className="bid-view-header">
        <div className="header-left">
          <button className="back-button" onClick={handleBackToList}>
            <Icon icon="mdi:arrow-left" className="back-icon" />
            View Bid
          </button>
        </div>
        <div className="header-right">
          <button className="btn btn-secondary">CANCEL</button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <p className="progress-description">Indicating current step to track the Flow Status of the Bid.</p>
        <div className="progress-steps">
          <div className="step">① Prepare Bid</div>
          <div className="step">② Publish</div>
          <div className="step">③ Closed</div>
          <div className="step">④ Technical Review</div>
          <div className="step">⑤ Commercial Review</div>
          <div className="step">⑥ Prepare Award</div>
          <div className="step">⑦ Award Approval</div>
          <div className="step active">⑧ Awarded</div>
        </div>
      </div>

      {/* Bid Summary Card */}
      <div className="bid-summary-card">
        <div className="summary-header">
          <div className="company-logo">
            <div className="logo-placeholder">COMPANY</div>
          </div>
          <div className="bid-info">
            <div className="bid-ref">
              Bid Ref No: <span className="ref-number">{bidDetails.bidRefNo}</span>
            </div>
            <div className="bid-title">Title: {bidDetails.title}</div>
          </div>
          <div className="bid-status">
            <div className="pr-number">PR #: {bidDetails.prNumber}</div>
            <span className={getStatusBadgeClass(bidDetails.status)}>{bidDetails.status}</span>
          </div>
        </div>

        <div className="bid-details">
          <div className="details-left">
            <div className="detail-item">
              <span className="detail-label">Bid Type:</span>
              <span className="detail-value">{bidDetails.bidType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Requestor:</span>
              <div className="user-info">
                <Icon icon="mdi:account" className="user-icon" />
                <span className="user-name">{bidDetails.requestor}</span>
                <span className="user-email">{bidDetails.requestorEmail}</span>
              </div>
            </div>
          </div>
          <div className="details-right">
            <div className="detail-item">
              <span className="detail-label">Bid Open Date:</span>
              <span className="detail-value">{bidDetails.bidOpenDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Bid Close Date:</span>
              <span className="detail-value">{bidDetails.bidCloseDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Terms:</span>
              <span className="detail-value">{bidDetails.paymentTerms}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Buyer:</span>
              <div className="user-info">
                <Icon icon="mdi:account" className="user-icon" />
                <span className="user-name">{bidDetails.buyer}</span>
                <span className="user-email">{bidDetails.buyerEmail}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-label">Delivery Location:</span>
              <div className="location-info">
                <Icon icon="mdi:map-marker" className="location-icon" />
                <span className="location-text">{bidDetails.deliveryLocation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Description */}
      <div className="info-description">
        <p>
          Detail Information about various sections of the RFP, RFQ and Tender. Like Scope of work, 
          Invited suppliers, All Bid related documents and complete detailed audit history on the bid process. 
          This information will help to track the information and documents shared with suppliers.
        </p>
      </div>

      {/* Scope of Work Section */}
      <div className="section">
        <h6 className="section-title">Scope of Work</h6>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Qty</th>
                <th>UOM</th>
                <th>Unit/Indicative/Expected Price</th>
                <th>Need by From</th>
                <th>Need by To</th>
              </tr>
            </thead>
            <tbody>
              {scopeOfWork.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.category}</td>
                  <td>{item.qty}</td>
                  <td>{item.uom}</td>
                  <td>{item.price}</td>
                  <td>{item.needByFrom}</td>
                  <td>{item.needByTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invited Suppliers Section */}
      <div className="section">
        <h6 className="section-title">Invited Suppliers</h6>
        <div className="suppliers-grid">
          {invitedSuppliers.map((supplier, index) => (
            <div key={index} className="supplier-card">
              <div className="supplier-header">
                <Icon icon="mdi:account" className="supplier-icon" />
                <span className="supplier-name">{supplier.name}</span>
              </div>
              <div className="supplier-contact">
                <span className="contact-name">{supplier.contact}</span>
              </div>
              <div className="supplier-details">
                <div className="contact-item">
                  <Icon icon="mdi:phone" className="contact-icon" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="contact-item">
                  <Icon icon="mdi:email" className="contact-icon" />
                  <span>{supplier.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluation Tabs */}
      <div className="evaluation-section">
        <div className="evaluation-tabs">
          <button 
            className={`tab ${activeTab === 'Evaluation Team' ? 'active' : ''}`}
            onClick={() => setActiveTab('Evaluation Team')}
          >
            Evaluation Team
          </button>
          <button 
            className={`tab ${activeTab === 'Evaluation Criteria' ? 'active' : ''}`}
            onClick={() => setActiveTab('Evaluation Criteria')}
          >
            Evaluation Criteria
          </button>
          <button 
            className={`tab ${activeTab === 'Terms and Conditions' ? 'active' : ''}`}
            onClick={() => setActiveTab('Terms and Conditions')}
          >
            Terms and Conditions
          </button>
          <button 
            className={`tab ${activeTab === 'Instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('Instructions')}
          >
            Instructions
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'Evaluation Team' && (
            <div className="evaluation-team">
              {evaluationTeam.map((member, index) => (
                <div key={index} className="team-member-card">
                  <div className="member-header">
                    <Icon icon="mdi:account" className="member-icon" />
                    <span className="member-name">{member.name}</span>
                  </div>
                  <div className="member-role">{member.role}</div>
                  <div className="member-email">{member.email}</div>
                  <div className="member-team">
                    <span className="team-badge">{member.team}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Evaluation Criteria' && (
            <div className="evaluation-criteria">
              <p>Evaluation criteria content will be displayed here.</p>
            </div>
          )}
          {activeTab === 'Terms and Conditions' && (
            <div className="terms-conditions">
              <p>Terms and conditions content will be displayed here.</p>
            </div>
          )}
          {activeTab === 'Instructions' && (
            <div className="instructions">
              <p>Instructions content will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bid Documents Section */}
      <div className="section">
        <h6 className="section-title">Bid Documents</h6>
        <p className="section-description">
          All standard terms and conditions, instructions, technical specifications, evaluation criteria documents which are shared with the suppliers.
        </p>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Last Updated By</th>
                <th>Last Updated Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="no-data">No records to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit History Section */}
      <div className="section">
        <h6 className="section-title">Audit History</h6>
        <p className="section-description">
          Detailed audit of actions performed on this bid starting from bid creation to awarding.
        </p>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Action Date</th>
                <th>Action</th>
                <th>Action By</th>
              </tr>
            </thead>
            <tbody>
              {auditHistory.map((audit, index) => (
                <tr key={index}>
                  <td>{audit.actionDate}</td>
                  <td>{audit.action}</td>
                  <td>{audit.actionBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-section">
          <div className="pagination-info">
            <span>5 rows</span>
            <span>1-5 of 12</span>
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn">
              <Icon icon="mdi:chevron-left" />
            </button>
            <button className="pagination-btn">
              <Icon icon="mdi:chevron-right" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="chat-section">
        <button className="btn btn-primary chat-btn">CHAT</button>
      </div>

      <style jsx>{`
        .procurement-bid-view {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .bid-view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          padding: 8px 0;
        }

        .back-icon {
          font-size: 20px;
        }

        .progress-indicator {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .progress-description {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 14px;
        }

        .progress-steps {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .step {
          padding: 8px 12px;
          background: #f0f0f0;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .step.active {
          background: #28a745;
          color: white;
        }

        .bid-summary-card {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          background: #e9ecef;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-placeholder {
          font-size: 12px;
          font-weight: 600;
          color: #666;
        }

        .bid-info {
          flex: 1;
          margin-left: 20px;
        }

        .bid-ref {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .ref-number {
          color: #007bff;
          cursor: pointer;
        }

        .bid-title {
          font-size: 14px;
          color: #666;
        }

        .bid-status {
          text-align: right;
        }

        .pr-number {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.awarded {
          background: #d4edda;
          color: #155724;
        }

        .bid-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .detail-item {
          margin-bottom: 15px;
        }

        .detail-label {
          font-weight: 600;
          color: #333;
          margin-right: 8px;
        }

        .detail-value {
          color: #666;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-icon {
          font-size: 16px;
          color: #666;
        }

        .user-name {
          font-weight: 500;
        }

        .user-email {
          color: #666;
          font-size: 12px;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .location-icon {
          font-size: 16px;
          color: #666;
        }

        .info-description {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .info-description p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        .section {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .section-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .data-table th,
        .data-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e9ecef;
        }

        .data-table th {
          background: #f8f9fa;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .data-table td {
          color: #666;
          font-size: 14px;
        }

        .no-data {
          text-align: center;
          color: #999;
          font-style: italic;
        }

        .suppliers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .supplier-card {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          background: #f8f9fa;
        }

        .supplier-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .supplier-icon {
          font-size: 20px;
          color: #666;
        }

        .supplier-name {
          font-weight: 600;
          color: #333;
        }

        .supplier-contact {
          margin-bottom: 15px;
        }

        .contact-name {
          font-weight: 500;
          color: #333;
        }

        .supplier-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }

        .contact-icon {
          font-size: 16px;
        }

        .evaluation-section {
          background: white;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .evaluation-tabs {
          display: flex;
          border-bottom: 1px solid #e9ecef;
        }

        .tab {
          padding: 15px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #666;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .tab-content {
          padding: 25px;
        }

        .evaluation-team {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .team-member-card {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          background: #f8f9fa;
        }

        .member-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .member-icon {
          font-size: 20px;
          color: #666;
        }

        .member-name {
          font-weight: 600;
          color: #333;
        }

        .member-role {
          font-weight: 500;
          color: #333;
          margin-bottom: 5px;
        }

        .member-email {
          color: #666;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .team-badge {
          background: #007bff;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }

        .pagination-info {
          display: flex;
          gap: 15px;
          color: #666;
          font-size: 14px;
        }

        .pagination-controls {
          display: flex;
          gap: 5px;
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
        }

        .pagination-btn:hover {
          background: #f8f9fa;
        }

        .chat-section {
          text-align: center;
          margin-top: 30px;
        }

        .chat-btn {
          padding: 12px 30px;
          font-size: 16px;
          font-weight: 600;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .bid-details {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .summary-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .bid-info {
            margin-left: 0;
          }

          .progress-steps {
            flex-direction: column;
            gap: 10px;
          }

          .suppliers-grid {
            grid-template-columns: 1fr;
          }

          .evaluation-team {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementBidViewLayer;




