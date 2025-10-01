import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const CreateBidModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    bidTitle: '',
    bidType: '',
    buyer: 'Super Admin',
    requestor: 'Super Admin',
    currency: 'United States dollar',
    member: '',
    bidOpenDate: '',
    bidCloseDate: '',
    deliveryLocation: '',
    paymentTerms: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bidTitle.trim()) {
      newErrors.bidTitle = 'Bid Title is required';
    }
    if (!formData.bidType) {
      newErrors.bidType = 'Bid Type is required';
    }
    if (!formData.bidOpenDate) {
      newErrors.bidOpenDate = 'Bid Open Date is required';
    }
    if (!formData.bidCloseDate) {
      newErrors.bidCloseDate = 'Bid Close Date is required';
    }
    if (!formData.deliveryLocation) {
      newErrors.deliveryLocation = 'Delivery Location is required';
    }
    if (!formData.paymentTerms) {
      newErrors.paymentTerms = 'Payment Terms is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      bidTitle: '',
      bidType: '',
      buyer: 'Super Admin',
      requestor: 'Super Admin',
      currency: 'United States dollar',
      member: '',
      bidOpenDate: '',
      bidCloseDate: '',
      deliveryLocation: '',
      paymentTerms: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="create-bid-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h6 className="modal-title">Create Bid</h6>
            <div className="header-info">
              <Icon icon="mdi:information" className="info-icon" />
              <span className="mandatory-indicator">*Indicates mandatory fields</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <Icon icon="mdi:close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="create-bid-form">
            {/* Basic Bid Information */}
            <div className="form-section">
              <h6 className="section-title">Basic Bid Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label required">
                    Bid Title
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.bidTitle ? 'error' : ''}`}
                    value={formData.bidTitle}
                    onChange={(e) => handleInputChange('bidTitle', e.target.value)}
                    placeholder="Enter bid title"
                  />
                  {errors.bidTitle && <span className="error-message">{errors.bidTitle}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">
                    Bid Type
                  </label>
                  <div className="select-wrapper">
                    <select
                      className={`form-select ${errors.bidType ? 'error' : ''}`}
                      value={formData.bidType}
                      onChange={(e) => handleInputChange('bidType', e.target.value)}
                    >
                      <option value="">Select Bid Type</option>
                      <option value="RFP">RFP</option>
                      <option value="RFQ">RFQ</option>
                      <option value="Tender">Tender</option>
                      <option value="Quote">Quote</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                  {errors.bidType && <span className="error-message">{errors.bidType}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Buyer
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={formData.buyer}
                      onChange={(e) => handleInputChange('buyer', e.target.value)}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Requestor
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={formData.requestor}
                      onChange={(e) => handleInputChange('requestor', e.target.value)}
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Currency
                  </label>
                  <div className="select-wrapper">
                    <select
                      className="form-select"
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                    >
                      <option value="United States dollar">United States dollar</option>
                      <option value="Euro">Euro</option>
                      <option value="British Pound">British Pound</option>
                      <option value="Indian Rupee">Indian Rupee</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bid Preparation Team */}
            <div className="form-section">
              <h6 className="section-title">Bid Preparation Team</h6>
              <div className="form-group">
                <label className="form-label">
                  Select Member
                </label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    value={formData.member}
                    onChange={(e) => handleInputChange('member', e.target.value)}
                    placeholder="Select Member"
                  />
                  <Icon icon="mdi:magnify" className="search-icon" />
                </div>
              </div>
            </div>

            {/* Timelines */}
            <div className="form-section">
              <h6 className="section-title">Timelines</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label required">
                    Bid Open Date
                  </label>
                  <div className="date-input-wrapper">
                    <input
                      type="date"
                      className={`form-input ${errors.bidOpenDate ? 'error' : ''}`}
                      value={formData.bidOpenDate}
                      onChange={(e) => handleInputChange('bidOpenDate', e.target.value)}
                    />
                    <Icon icon="mdi:calendar" className="calendar-icon" />
                  </div>
                  {errors.bidOpenDate && <span className="error-message">{errors.bidOpenDate}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">
                    Bid Close Date
                  </label>
                  <div className="date-input-wrapper">
                    <input
                      type="date"
                      className={`form-input ${errors.bidCloseDate ? 'error' : ''}`}
                      value={formData.bidCloseDate}
                      onChange={(e) => handleInputChange('bidCloseDate', e.target.value)}
                    />
                    <Icon icon="mdi:calendar" className="calendar-icon" />
                  </div>
                  {errors.bidCloseDate && <span className="error-message">{errors.bidCloseDate}</span>}
                </div>
              </div>
            </div>

            {/* General Terms */}
            <div className="form-section">
              <h6 className="section-title">General Terms</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label required">
                    Delivery Location
                  </label>
                  <div className="select-wrapper">
                    <select
                      className={`form-select ${errors.deliveryLocation ? 'error' : ''}`}
                      value={formData.deliveryLocation}
                      onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                    >
                      <option value="">Select Delivery Location</option>
                      <option value="Head Quarters - Hyderabad">Head Quarters - Hyderabad</option>
                      <option value="Branch Office - Mumbai">Branch Office - Mumbai</option>
                      <option value="Branch Office - Delhi">Branch Office - Delhi</option>
                      <option value="Branch Office - Bangalore">Branch Office - Bangalore</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                  {errors.deliveryLocation && <span className="error-message">{errors.deliveryLocation}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label required">
                    Payment Terms
                  </label>
                  <div className="select-wrapper">
                    <select
                      className={`form-select ${errors.paymentTerms ? 'error' : ''}`}
                      value={formData.paymentTerms}
                      onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                    >
                      <option value="">Select Payment Terms</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Net 45">Net 45</option>
                      <option value="Net 60">Net 60</option>
                      <option value="COD">COD</option>
                      <option value="Advance Payment">Advance Payment</option>
                    </select>
                    <Icon icon="mdi:chevron-down" className="select-arrow" />
                  </div>
                  {errors.paymentTerms && <span className="error-message">{errors.paymentTerms}</span>}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button type="button" className="btn btn-create" onClick={handleSubmit}>
            CREATE
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Modal Overlay */
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
          padding: 20px;
        }

        /* Modal Container */
        .create-bid-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Modal Header */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 24px 24px 16px 24px;
          border-bottom: 1px solid #e9ecef;
        }

        .header-left {
          flex: 1;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-icon {
          font-size: 16px;
          color: #007bff;
        }

        .mandatory-indicator {
          font-size: 14px;
          color: #6c757d;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #6c757d;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          background: #f8f9fa;
          color: #495057;
        }

        /* Modal Body */
        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .create-bid-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Form Sections */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #e9ecef;
        }

        /* Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Form Groups */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #495057;
          margin: 0;
        }

        .form-label.required::after {
          content: ' *';
          color: #dc3545;
        }

        .form-input,
        .form-select {
          padding: 12px 16px;
          border: 1px solid #ced4da;
          border-radius: 6px;
          font-size: 14px;
          color: #495057;
          background: white;
          transition: all 0.2s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        }

        .form-input.error,
        .form-select.error {
          border-color: #dc3545;
        }

        .error-message {
          font-size: 12px;
          color: #dc3545;
          margin-top: 4px;
        }

        /* Select Wrapper */
        .select-wrapper {
          position: relative;
        }

        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #6c757d;
          pointer-events: none;
        }

        /* Search Input */
        .search-input-wrapper {
          position: relative;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #6c757d;
          pointer-events: none;
        }

        /* Date Input */
        .date-input-wrapper {
          position: relative;
        }

        .calendar-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #6c757d;
          pointer-events: none;
        }

        /* Modal Footer */
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 100px;
        }

        .btn-cancel {
          background: #6c757d;
          color: white;
        }

        .btn-cancel:hover {
          background: #545b62;
        }

        .btn-create {
          background: #007bff;
          color: white;
        }

        .btn-create:hover {
          background: #0056b3;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 10px;
          }

          .create-bid-modal {
            max-height: 95vh;
          }

          .modal-header {
            padding: 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .modal-footer {
            padding: 16px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-title {
            font-size: 20px;
          }
        }

        @media (max-width: 480px) {
          .modal-overlay {
            padding: 5px;
          }

          .create-bid-modal {
            max-height: 98vh;
          }

          .form-grid {
            gap: 16px;
          }

          .btn {
            padding: 10px 20px;
            min-width: 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateBidModal;
