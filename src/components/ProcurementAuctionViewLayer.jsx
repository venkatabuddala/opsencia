import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ProcurementAuctionViewLayer = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  // Mock data for auction details
  const auctionDetails = {
    id: 'LC 0807',
    name: 'LC 0807',
    strategy: 'Rank Auction',
    organization: 'Opsencia',
    deliveryDate: '08-30-2025',
    type: 'Reverse Auction',
    lotBased: true,
    timeRemaining: 'Closed',
    lotLeading: '77000.00',
    packagingLeading: '77000.0',
    ranking: [
      {
        rank: 1,
        supplier: 'Tamayuz Tr...',
        date: '08-07-2025 11:58 AM',
        amount: '77000 USD',
        bidsCount: 2
      },
      {
        rank: 2,
        supplier: 'Rozi Inter...',
        date: '08-07-2025 11:58 AM',
        amount: '78000 USD',
        bidsCount: 2
      }
    ]
  };

  const handleBackToList = () => {
    navigate('/procurement/auctions');
  };

  return (
    <div className="procurement-auction-view">
      {/* Header */}
      <div className="view-header">
        <button className="back-button" onClick={handleBackToList}>
          <Icon icon="mdi:arrow-left" />
          View Auction
        </button>
      </div>

      {/* Auction Summary Card */}
      <div className="auction-summary-card">
        <div className="auction-info-left">
          <div className="trophy-section">
            <Icon icon="mdi:trophy" className="trophy-icon" />
            <span className="auction-type-badge">Reverse Auction</span>
          </div>
          <div className="auction-details">
            <div className="detail-row">
              <span className="label">Auction Name:</span>
              <span className="value">{auctionDetails.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Auction Strategy:</span>
              <span className="value">{auctionDetails.strategy}</span>
            </div>
            <div className="detail-row">
              <span className="label">
                <Icon icon="mdi:file-document" className="doc-icon" />
                Terms and Conditions
              </span>
            </div>
          </div>
        </div>
        
        <div className="auction-info-middle">
          <div className="detail-row">
            <span className="label">Organization Name:</span>
            <span className="value">{auctionDetails.organization}</span>
          </div>
          <div className="detail-row">
            <span className="label">Delivery Date:</span>
            <span className="value">{auctionDetails.deliveryDate}</span>
          </div>
        </div>
        
        <div className="auction-info-right">
          <div className="lot-based-badge">
            <Icon icon="mdi:package-variant" className="package-icon" />
            <span>Lot Based</span>
          </div>
          <button className="copy-auction-btn">COPY AUCTION</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="auction-view-tabs">
        <button 
          className={`view-tab ${activeTab === 'Overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </button>
        <button 
          className={`view-tab ${activeTab === 'Auction Details' ? 'active' : ''}`}
          onClick={() => setActiveTab('Auction Details')}
        >
          Auction Details
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'Overview' && (
          <div className="overview-content">
            <div className="overview-grid">
              <div className="overview-section">
                <div className="section-header">
                  <Icon icon="mdi:trending-up" className="trend-icon" />
                  <span>Lot Leading Price:</span>
                </div>
                <div className="section-value">77000.00 USD</div>
              </div>
              
              <div className="overview-section">
                <div className="section-header">
                  <Icon icon="mdi:clock-outline" className="clock-icon" />
                  <span>Time Remaining:</span>
                </div>
                <div className="section-value">{auctionDetails.timeRemaining}</div>
              </div>
            </div>

            <div className="packaging-section">
              <div className="packaging-header">
                <Icon icon="mdi:trending-up" className="trend-icon" />
                <span>Packaging for d ...</span>
              </div>
              <div className="packaging-details">
                <div className="packaging-detail">
                  <span className="detail-label">Leading Price:</span>
                  <span className="detail-value">77000.00 USD</span>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="actions-section">
              <h6>Actions:</h6>
              <div className="action-links">
                <button className="action-link">Withdraw Auction</button>
                <button className="action-link">Edit Min Bid Diff</button>
                <button className="action-link">Place Proxy</button>
                <button className="action-link">Broadcast Message</button>
                <button className="action-link">Compare Bids</button>
                <button className="action-link">Order Activity</button>
                <button className="action-link">Bid Summary</button>
                <button className="action-link">Suppliers List</button>
              </div>
            </div>

            {/* Ranking Section */}
            <div className="ranking-section">
              <h6>Ranking:</h6>
              <div className="ranking-list">
                {auctionDetails.ranking.map((rank, index) => (
                  <div key={index} className="ranking-item">
                    <div className="rank-medal">
                      <Icon icon="mdi:medal" className={`medal-icon ${index === 0 ? 'gold' : 'silver'}`} />
                      <span className="rank-number">{rank.rank}</span>
                    </div>
                    <div className="rank-details">
                      <div className="supplier-name">{rank.supplier}</div>
                      <div className="rank-date">{rank.date}</div>
                      <div className="rank-amount">{rank.amount}</div>
                      <div className="rank-bids">Bids Count: {rank.bidsCount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Auction Details' && (
          <div className="auction-details-content">
            <div className="time-remaining-section">
              <span className="time-label">Time Remaining:</span>
              <span className="time-value">{auctionDetails.timeRemaining}</span>
            </div>

            <div className="auction-items-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Delivery Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="item-name">
                        Packaging for desserts
                        <Icon icon="mdi:information" className="info-icon" />
                      </div>
                    </td>
                    <td>40 Box</td>
                    <td>Head Quarters - Hyderabad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Common Styles */
        .procurement-auction-view {
          padding: 20px;
          background: #f8f9fc;
          min-height: 100vh;
        }

        /* View Auction Styles */
        .view-header {
          margin-bottom: 24px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #007bff;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
        }

        .back-button:hover {
          text-decoration: underline;
        }

        .auction-summary-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
        }

        .auction-info-left {
          display: flex;
          gap: 24px;
        }

        .auction-info-middle {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trophy-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .trophy-icon {
          font-size: 48px;
          color: #ffc107;
        }

        .auction-type-badge {
          background: #28a745;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .auction-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .label {
          font-weight: 500;
          color: #495057;
          min-width: 140px;
        }

        .value {
          color: #1a1a1a;
        }

        .doc-icon {
          font-size: 16px;
          color: #007bff;
          cursor: pointer;
        }

        .auction-info-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }

        .lot-based-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #e9ecef;
          color: #495057;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .package-icon {
          font-size: 16px;
        }

        .copy-auction-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-auction-btn:hover {
          background: #0056b3;
        }

        /* Auction View Tabs */
        .auction-view-tabs {
          display: flex;
          gap: 0;
          margin-bottom: 0;
          background: transparent;
          padding: 0;
          border-radius: 0;
          box-shadow: none;
        }

        .view-tab {
          padding: 12px 24px;
          border: none;
          background: #e9ecef;
          border-radius: 0;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #495057;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }

        .view-tab.active {
          background: #007bff;
          color: white;
        }

        .view-tab:hover:not(.active) {
          background: #dee2e6;
        }

        .tab-content {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
        }

        /* Overview Content */
        .overview-content {
          padding: 24px;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 24px;
        }

        .overview-section {
          padding: 20px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 500;
          color: #495057;
        }

        .trend-icon,
        .clock-icon {
          font-size: 20px;
          color: #28a745;
        }

        .section-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .packaging-section {
          margin-bottom: 32px;
        }

        .packaging-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-weight: 600;
          color: #1a1a1a;
          font-size: 14px;
        }

        .packaging-details {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .packaging-detail {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-label {
          font-weight: 500;
          color: #495057;
        }

        .detail-value {
          font-weight: 600;
          color: #1a1a1a;
        }

        /* Actions Section */
        .actions-section {
          margin-bottom: 32px;
        }

        .actions-section h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .action-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .action-link {
          background: none;
          border: none;
          color: #007bff;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }

        .action-link:hover {
          color: #0056b3;
        }

        /* Ranking Section */
        .ranking-section h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .ranking-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ranking-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .rank-medal {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 700;
          color: #ffc107;
        }

        .medal-icon {
          font-size: 32px;
        }

        .medal-icon.gold {
          color: #ffd700;
        }

        .medal-icon.silver {
          color: #c0c0c0;
        }

        .rank-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .supplier-name {
          font-weight: 500;
          color: #1a1a1a;
        }

        .rank-date,
        .rank-bids {
          font-size: 12px;
          color: #6c757d;
        }

        .rank-amount {
          font-weight: 600;
          color: #28a745;
        }

        /* Auction Details Content */
        .auction-details-content {
          padding: 24px;
        }

        .time-remaining-section {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .time-label {
          font-weight: 500;
          color: #495057;
        }

        .time-value {
          font-weight: 600;
          color: #1a1a1a;
        }

        .auction-items-table {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #fdd5d5;
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 1px solid #e9ecef;
        }

        .data-table td {
          padding: 16px 12px;
          border-bottom: 1px solid #e9ecef;
          color: #495057;
        }

        .item-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          font-size: 16px;
          color: #ffc107;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .procurement-auction-view {
            padding: 16px;
          }

          .auction-summary-card {
            flex-direction: column;
            gap: 24px;
          }

          .auction-info-left {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .auction-info-middle {
            align-items: center;
            text-align: center;
          }

          .auction-info-right {
            align-items: center;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }

          .action-links {
            justify-content: center;
          }

          .ranking-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementAuctionViewLayer;
