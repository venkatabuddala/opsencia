import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const ProcurementAuctionsLayer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Closed');

  // Mock data for auctions
  const auctions = [
    {
      id: 'LC 0807',
      status: 'Award Under Process',
      publishedOn: '08-07-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT', 'BID AWARDS']
    },
    {
      id: '0607',
      status: 'Award Under Process',
      publishedOn: '08-07-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT', 'WAITING LIST', 'BID AWARDS']
    },
    {
      id: '250806',
      status: 'Awarded',
      publishedOn: '08-07-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT', 'BID AWARDS']
    },
    {
      id: '214314',
      status: 'Pending Awarded',
      publishedOn: '08-06-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT', 'PROCEED']
    },
    {
      id: '250806_1',
      status: 'Pending Awarded',
      publishedOn: '08-06-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT']
    },
    {
      id: '250806_3',
      status: 'Pending Awarded',
      publishedOn: '08-06-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT', 'PROCEED']
    },
    {
      id: '250806_2',
      status: 'Pending Awarded',
      publishedOn: '08-06-2025',
      location: 'Head Quarters - Hyderabad',
      type: 'Reverse Auction',
      actions: ['REPORT']
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Awarded': return 'bg-success-main';
      case 'Award Under Process': return 'bg-warning-main';
      case 'Pending Awarded': return 'bg-warning-main';
      default: return 'bg-info-main';
    }
  };

  const handleAuctionClick = (auction) => {
    navigate('/procurement/auctions/view');
  };

  return (
    <div className="procurement-auctions-list">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">AUCTIONS</h6>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            CREATE AUCTION
            <Icon icon="mdi:chevron-down" className="dropdown-icon" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="auction-tabs">
        <button 
          className={`tab ${activeTab === 'Live' ? 'active' : ''}`}
          onClick={() => setActiveTab('Live')}
        >
          Live
        </button>
        <button 
          className={`tab ${activeTab === 'Scheduled' ? 'active' : ''}`}
          onClick={() => setActiveTab('Scheduled')}
        >
          Scheduled
        </button>
        <button 
          className={`tab ${activeTab === 'Closed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Closed')}
        >
          Closed
        </button>
        <button 
          className={`tab ${activeTab === 'Drafts' ? 'active' : ''}`}
          onClick={() => setActiveTab('Drafts')}
        >
          Drafts
        </button>
      </div>

      {/* Auctions List */}
      <div className="auctions-container">
        {auctions.map((auction, index) => (
          <div key={index} className="auction-card" onClick={() => handleAuctionClick(auction)}>
            <div className="auction-left">
              <Icon icon="mdi:trophy" className="trophy-icon" />
              <div className="auction-details">
                <div className="auction-name">Name: {auction.id}</div>
                <div className="auction-meta">
                  <Icon icon="mdi:account" className="meta-icon" />
                  <span>Published On: {auction.publishedOn}</span>
                </div>
                <div className="auction-meta">
                  <Icon icon="mdi:map-marker" className="meta-icon" />
                  <span>Location: {auction.location}</span>
                </div>
              </div>
            </div>
            
            <div className="auction-right">
              <div className="auction-status-section">
                <div className={`auction-status ${getStatusBadge(auction.status)}`}>
                  {auction.status}
                </div>
                <div className="auction-type-badge">
                  Reverse Auction
                </div>
              </div>
              <div className="auction-actions">
                {auction.actions.map((action, actionIndex) => (
                  <button 
                    key={actionIndex} 
                    className="action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Action button functionality can be added here
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-section">
        <div className="pagination-controls">
          <span className="pagination-info">{"<<"}Prev</span>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">4</button>
          <button className="pagination-btn">5</button>
          <span className="pagination-info">Next{">>"}</span>
        </div>
      </div>

      <style jsx>{`
        /* Common Styles */
        .procurement-auctions-list {
          padding: 20px;
          background: #f8f9fc;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .page-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
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

        .dropdown-icon {
          margin-left: 8px;
        }

        /* Tabs */
        .auction-tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
          background: white;
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .tab {
          padding: 12px 24px;
          border: none;
          background: transparent;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6c757d;
        }

        .tab.active {
          background: #007bff;
          color: white;
        }

        .tab:hover:not(.active) {
          background: #f8f9fa;
        }

        /* Auctions List */
        .auctions-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .auction-card {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .auction-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transform: translateY(-2px);
        }

        .auction-left {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .trophy-icon {
          font-size: 32px;
          color: #ffc107;
          margin-top: 4px;
        }

        .auction-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .auction-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .auction-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6c757d;
        }

        .meta-icon {
          font-size: 16px;
          color: #6c757d;
        }

        .auction-status-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .auction-status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: white;
          text-align: center;
        }

        .bg-success-main {
          background: #28a745;
        }

        .bg-warning-main {
          background: #ffc107;
          color: #212529;
        }

        .bg-info-main {
          background: #17a2b8;
        }

        .auction-type-badge {
          background: #e9ecef;
          color: #495057;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .auction-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 6px 12px;
          border: 1px solid #007bff;
          background: white;
          color: #007bff;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #007bff;
          color: white;
        }

        /* Pagination */
        .pagination-section {
          display: flex;
          justify-content: center;
          margin-top: 24px;
        }

        .pagination-controls {
          display: flex;
          gap: 4px;
        }

        .pagination-btn {
          padding: 8px 12px;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .pagination-btn:hover:not(.active) {
          background: #f8f9fa;
        }

        .pagination-info {
          padding: 8px 12px;
          color: #6c757d;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .procurement-auctions-list {
            padding: 16px;
          }

          .page-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .header-actions {
            justify-content: center;
          }

          .auction-card {
            flex-direction: column;
            gap: 16px;
          }

          .auction-left {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .auction-right {
            align-items: center;
          }

          .auction-tabs {
            flex-wrap: wrap;
          }

          .tab {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementAuctionsLayer;
