import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { mockSuppliers, statusToBadge } from "../mock/procurementData";

const ProcurementSuppliersListLayer = () => {
  const [suppliers] = useState(mockSuppliers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success-main';
      case 'Pending': return 'text-warning-main';
      case 'Draft': return 'text-info-main';
      case 'Inactive': return 'text-danger-main';
      default: return 'text-neutral-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return 'mdi:check-circle';
      case 'Pending': return 'mdi:clock-outline';
      case 'Draft': return 'mdi:file-document-outline';
      case 'Inactive': return 'mdi:close-circle';
      default: return 'mdi:help-circle';
    }
  };

  return (
    <div className="procurement-suppliers-list">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Suppliers</h6>
          <p className="page-description">Browse and manage all registered suppliers from here.</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Icon icon="mdi:plus" className="mr-2" />
            CREATE SUPPLIER
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowInviteModal(true)}
          >
            <Icon icon="mdi:email-outline" className="mr-2" />
            INVITE SUPPLIER
          </button>
          <button className="btn btn-icon">
            <Icon icon="mdi:dots-vertical" />
          </button>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Ref No.</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Supplier Name</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Status</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Type</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Country</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Contact Email</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Contact No</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Created By</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>User</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="table-row">
                  <td className="table-cell">
                    <span className="ref-number">{supplier.id}</span>
                  </td>
                  <td className="table-cell">
                    <div className="supplier-info">
                      <div className="supplier-avatar">
                        <Icon icon="mdi:domain" className="text-primary-600" />
                      </div>
                      <div className="supplier-details">
                        <div className="supplier-name">{supplier.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${statusToBadge(supplier.status)}`}>
                      <Icon icon={getStatusIcon(supplier.status)} className="status-icon" />
                      {supplier.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="type-tag">{supplier.category}</span>
                  </td>
                  <td className="table-cell">
                    <div className="country-info">
                      <Icon icon="mdi:map-marker" className="country-icon" />
                      <span className="country-code">IN</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="contact-info">
                      <Icon icon="mdi:email" className="contact-icon" />
                      <span className="contact-email">{supplier.email}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="contact-info">
                      <Icon icon="mdi:phone" className="contact-icon" />
                      <span className="contact-phone">{supplier.phone}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="created-by">{supplier.contactPerson}</span>
                  </td>
                  <td className="table-cell">
                    <span className="user-status">Yes</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="pagination-section">
          <div className="pagination-info">
            <span>10 rows</span>
          </div>
          <div className="pagination-controls">
            <span className="pagination-text">1-10 of {suppliers.length}</span>
            <div className="pagination-buttons">
              <button className="pagination-btn">
                <Icon icon="mdi:chevron-left" />
              </button>
              <button className="pagination-btn">
                <Icon icon="mdi:chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Supplier Modal */}
      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">
                <Icon icon="mdi:information" className="info-icon" />
                  Invite Suppliers
                </h6>
              <button 
                className="modal-close"
                onClick={() => setShowInviteModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="mandatory-note">*Indicates mandatory fields.</p>
              
              <div className="invite-section">
                <div className="invite-row">
                  <div className="form-group">
                    <label>Supplier Company Name *</label>
                    <input type="text" className="form-input" placeholder="Enter company name" />
                  </div>
                  <div className="form-group">
                    <label>Email Id *</label>
                    <div className="input-with-icon">
                      <Icon icon="mdi:email" className="input-icon" />
                      <input type="email" className="form-input" placeholder="Enter email address" />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm">INVITE</button>
                </div>
                <div className="invite-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <Icon icon="mdi:information" className="info-icon" />
                    Invite Anyway
                  </label>
                </div>
              </div>
              
              <div className="warning-message">
                <Icon icon="mdi:alert-circle" className="warning-icon" />
                Note: Please kindly check if any duplicate invitations exists with same company name or similar company names before inviting a new supplier company for registration!
              </div>
              
              <div className="tabs-section">
                <div className="tab active">Invited Suppliers</div>
                <div className="tab">Invite Migrated Suppliers</div>
              </div>
              
              <div className="invitations-section">
                <h6>List of Invitations</h6>
                <p className="section-description">Browse and manage all invitations sent for suppliers from here.</p>
                
                <div className="invitations-table">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Inv. Id</th>
                        <th>Supplier Name</th>
                        <th>Email Id</th>
                        <th>Inv. Date</th>
                        <th>Status</th>
                        <th>Inv. Cnt</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>INV001</td>
                        <td>surya developers</td>
                        <td>suryadeveloper123@gm...</td>
                        <td>07-14-2025</td>
                        <td><span className="status-dot blue">Account Created</span></td>
                        <td>1</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-icon btn-warning" title="Resend">
                              <Icon icon="mdi:refresh" />
                            </button>
                            <button className="btn btn-icon btn-danger" title="Delete">
                              <Icon icon="mdi:close" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>INV002</td>
                        <td>Infra Solt Solutions</td>
                        <td>infra@ucn121212.com</td>
                        <td>05-30-2025</td>
                        <td><span className="status-dot green">Active</span></td>
                        <td>1</td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-icon btn-warning" title="Resend">
                              <Icon icon="mdi:refresh" />
                            </button>
                            <button className="btn btn-icon btn-danger" title="Delete">
                              <Icon icon="mdi:close" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary">CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Supplier Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
                <h6 className="modal-title">Create New Supplier</h6>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="mandatory-note">*Indicates mandatory fields.</p>
              
              <div className="form-sections">
                <div className="form-section">
                  <h6>Supplier Information</h6>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Organization Name *</label>
                      <input type="text" className="form-input" placeholder="Enter organization name" />
                    </div>
                    <div className="form-group">
                      <label>Address *</label>
                      <input type="text" className="form-input" placeholder="Enter address" />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input type="text" className="form-input" placeholder="Enter city" />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input type="text" className="form-input" placeholder="Enter state" />
                    </div>
                    <div className="form-group">
                      <label>Country *</label>
                      <select className="form-select">
                        <option>INDIA</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Zip / Postal Code *</label>
                      <input type="text" className="form-input" placeholder="Enter zip code" />
                    </div>
                    <div className="form-group">
                      <label>Type of Legal Entity *</label>
                      <select className="form-select">
                        <option>Select Legal Entity</option>
                        <option>Private Limited</option>
                        <option>Public Limited</option>
                        <option>Partnership</option>
                        <option>Proprietorship</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>License Number *</label>
                      <input type="text" className="form-input" placeholder="Enter license number" />
                    </div>
                    <div className="form-group">
                      <label>Licence Place of Issue *</label>
                      <input type="text" className="form-input" placeholder="Enter place of issue" />
                    </div>
                    <div className="form-group">
                      <label>Incorporation Date *</label>
                      <div className="input-with-icon">
                        <input type="date" className="form-input" />
                        <Icon icon="mdi:calendar" className="input-icon" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h6>Contact Details</h6>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Contact Name *</label>
                      <input type="text" className="form-input" placeholder="Enter contact name" />
                    </div>
                    <div className="form-group">
                      <label>Designation</label>
                      <input type="text" className="form-input" placeholder="Enter designation" />
                    </div>
                    <div className="form-group">
                      <label>Email ID *</label>
                      <input type="email" className="form-input" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input type="tel" className="form-input" placeholder="Enter mobile number" />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h6>Bank Details (Optional)</h6>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Bank Name</label>
                      <input type="text" className="form-input" placeholder="Enter bank name" />
                    </div>
                    <div className="form-group">
                      <label>Account / Beneficiary Name</label>
                      <input type="text" className="form-input" placeholder="Enter beneficiary name" />
                    </div>
                    <div className="form-group">
                      <label>Bank / Branch Address</label>
                      <input type="text" className="form-input" placeholder="Enter bank address" />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" className="form-input" placeholder="Enter city" />
                    </div>
                    <div className="form-group">
                      <label>Account Number</label>
                      <input type="text" className="form-input" placeholder="Enter account number" />
                    </div>
                    <div className="form-group">
                      <label>Confirm Account Number</label>
                      <input type="text" className="form-input" placeholder="Confirm account number" />
                    </div>
                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input type="text" className="form-input" placeholder="Enter IFSC code" />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select className="form-select">
                        <option>INDIA</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Zip / Postal Code</label>
                      <input type="text" className="form-input" placeholder="Enter zip code" />
                    </div>
                    <div className="form-group">
                      <label>Swift/BIC/ABA Routing No</label>
                      <input type="text" className="form-input" placeholder="Enter routing number" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary">CANCEL</button>
              <button className="btn btn-primary">CREATE</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .procurement-suppliers-list {
          padding: 20px;
          background: #f8f9fc;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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
          margin: 0 0 8px 0;
        }

        .page-description {
          font-size: 12px;
          color: #6c757d;
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

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
        }

        .btn-icon {
          padding: 8px;
          min-width: 40px;
          justify-content: center;
        }

        .mr-2 {
          margin-right: 8px;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-header-cell {
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: #495057;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          white-space: nowrap;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .filter-icon {
          font-size: 16px;
          color: #6c757d;
          cursor: pointer;
        }

        .table-cell {
          padding: 16px 12px;
          border-bottom: 1px solid #e9ecef;
          vertical-align: middle;
        }

        .table-row:hover {
          background: #f8f9fa;
        }

        .ref-number {
          font-weight: 600;
          color: #1a1a1a;
        }

        .supplier-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .supplier-avatar {
          width: 40px;
          height: 40px;
          background: #e3f2fd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .supplier-name {
          font-weight: 600;
          color: #1a1a1a;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          color: white;
          text-transform: uppercase;
        }

        .status-icon {
          font-size: 14px;
        }

        .type-tag {
          padding: 4px 8px;
          background: #e9ecef;
          border-radius: 4px;
          font-size: 12px;
          color: #495057;
        }

        .country-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .country-icon {
          font-size: 16px;
          color: #6c757d;
        }

        .country-code {
          font-weight: 500;
          color: #1a1a1a;
        }

        .contact-info {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-icon {
          font-size: 16px;
          color: #6c757d;
        }

        .contact-email {
          color: #007bff;
        }

        .contact-phone {
          color: #495057;
        }

        .created-by {
          color: #495057;
        }

        .user-status {
          color: #28a745;
          font-weight: 500;
        }

        .pagination-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-top: 1px solid #e9ecef;
        }

        .pagination-info {
          font-size: 14px;
          color: #6c757d;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pagination-text {
          font-size: 14px;
          color: #6c757d;
        }

        .pagination-buttons {
          display: flex;
          gap: 4px;
        }

        .pagination-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #dee2e6;
          background: white;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover {
          background: #f8f9fa;
          border-color: #adb5bd;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content.large {
          max-width: 800px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e9ecef;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .info-icon {
          font-size: 20px;
          color: #007bff;
        }

        .modal-close {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: #f8f9fa;
        }

        .modal-body {
          padding: 24px;
        }

        .mandatory-note {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .invite-section {
          margin-bottom: 20px;
        }

        .invite-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 16px;
          align-items: end;
          margin-bottom: 12px;
        }

        .invite-options {
          margin-bottom: 20px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #495057;
        }

        .warning-message {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px;
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #856404;
        }

        .warning-icon {
          font-size: 16px;
          color: #f39c12;
          margin-top: 2px;
        }

        .tabs-section {
          display: flex;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 20px;
        }

        .tab {
          padding: 12px 24px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }

        .tab.active {
          border-bottom-color: #007bff;
          color: #007bff;
          font-weight: 500;
        }

        .invitations-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .section-description {
          font-size: 14px;
          color: #6c757d;
          margin: 0 0 20px 0;
        }

        .invitations-table {
          margin-top: 20px;
        }

        .status-dot {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .status-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.blue::before {
          background: #007bff;
        }

        .status-dot.green::before {
          background: #28a745;
        }

        .status-dot.red::before {
          background: #dc3545;
        }

        .action-buttons {
          display: flex;
          gap: 4px;
        }

        .btn-warning {
          background: #ffc107;
          color: #212529;
        }

        .btn-danger {
          background: #dc3545;
          color: white;
        }

        .form-sections {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .form-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 20px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #e9ecef;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #495057;
        }

        .form-input, .form-select {
          padding: 10px 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
          border-color: #007bff;
        }

        .input-with-icon {
          position: relative;
        }

        .input-with-icon .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          font-size: 16px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e9ecef;
        }

        .text-primary-600 {
          color: #007bff;
        }

        .text-success-main {
          color: #28a745;
        }

        .text-warning-main {
          color: #ffc107;
        }

        .text-info-main {
          color: #17a2b8;
        }

        .text-danger-main {
          color: #dc3545;
        }

        .text-neutral-400 {
          color: #6c757d;
        }

        @media (max-width: 768px) {
          .procurement-suppliers-list {
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

          .invite-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            width: 95%;
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementSuppliersListLayer;
