import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementCreateRequisitionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    prDescription: '',
    deliveryLocation: '',
    needByDate: '',
    requestor: '',
    requestorDepartment: '',
    buyer: '',
    currency: 'USD',
    budgeted: 'Yes',
    budget: '',
    notesToApprover: ''
  });

  const [errors, setErrors] = useState({});

  // Mock data for dropdowns
  const deliveryLocations = [
    'Main Office - Dubai',
    'Branch Office - Abu Dhabi',
    'Warehouse - Sharjah',
    'Site Office - Ras Al Khaimah',
    'Remote Location'
  ];

  const departments = [
    'Admin Department',
    'IT Department',
    'Operations Department',
    'Finance Department',
    'HR Department',
    'Engineering Department',
    'Marketing Department'
  ];

  const buyers = [
    'Super Admin',
    'Procurement Officer',
    'Buyer 1',
    'Buyer 2',
    'Senior Buyer'
  ];

  const currencies = [
    'USD',
    'AED',
    'EUR',
    'GBP',
    'INR',
    'SAR'
  ];

  const budgets = [
    'IT Hardware Budget',
    'Software Licenses Budget',
    'Office Equipment Budget',
    'Operations Budget',
    'Marketing Budget',
    'General Budget'
  ];

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

    if (!formData.prDescription.trim()) newErrors.prDescription = 'PR Description is required';
    if (!formData.deliveryLocation.trim()) newErrors.deliveryLocation = 'Delivery Location is required';
    if (!formData.needByDate.trim()) newErrors.needByDate = 'Need By Date is required';
    if (!formData.requestor.trim()) newErrors.requestor = 'Requestor is required';
    if (!formData.requestorDepartment.trim()) newErrors.requestorDepartment = 'Requestor Department is required';
    if (!formData.buyer.trim()) newErrors.buyer = 'Buyer is required';
    if (!formData.currency.trim()) newErrors.currency = 'Currency is required';
    if (formData.budgeted === 'Yes' && !formData.budget.trim()) {
      newErrors.budget = 'Budget is required when Budgeted is Yes';
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

  const handleClose = () => {
    setFormData({
      prDescription: '',
      deliveryLocation: '',
      needByDate: '',
      requestor: '',
      requestorDepartment: '',
      buyer: '',
      currency: 'USD',
      budgeted: 'Yes',
      budget: '',
      notesToApprover: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h6 className="modal-title">
            <Icon icon="mdi:clipboard-text-plus" className="info-icon" />
            Create Purchase Requisition
          </h6>
          <button 
            className="modal-close"
            onClick={handleClose}
          >
            <Icon icon="mdi:close" />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="mandatory-note">*Indicates mandatory fields.</p>
          
          <form onSubmit={handleSubmit} className="requisition-form">
            {/* PR Description Section */}
            <div className="form-section">
              <div className="form-group full-width">
                <label>PR Description *</label>
                <textarea 
                  className={`form-textarea ${errors.prDescription ? 'error' : ''}`}
                  value={formData.prDescription}
                  onChange={(e) => handleInputChange('prDescription', e.target.value)}
                  placeholder="Enter a brief description of the purchase requisition"
                  rows="4"
                />
                {errors.prDescription && <span className="error-message">{errors.prDescription}</span>}
              </div>
            </div>

            {/* Delivery Information Section */}
            <div className="form-section">
              <h6>Delivery Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>Delivery Location *</label>
                  <select 
                    className={`form-select ${errors.deliveryLocation ? 'error' : ''}`}
                    value={formData.deliveryLocation}
                    onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                  >
                    <option value="">Select Delivery Location</option>
                    {deliveryLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  {errors.deliveryLocation && <span className="error-message">{errors.deliveryLocation}</span>}
                </div>
                
                <div className="form-group">
                  <label>Need By Date *</label>
                  <div className="input-with-icon">
                    <input 
                      type="date" 
                      className={`form-input ${errors.needByDate ? 'error' : ''}`}
                      value={formData.needByDate}
                      onChange={(e) => handleInputChange('needByDate', e.target.value)}
                    />
                    <Icon icon="mdi:calendar" className="input-icon" />
                  </div>
                  {errors.needByDate && <span className="error-message">{errors.needByDate}</span>}
                </div>
              </div>
            </div>

            {/* Requestor Information Section */}
            <div className="form-section">
              <h6>Requestor Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>Requestor *</label>
                  <input 
                    type="text" 
                    className={`form-input ${errors.requestor ? 'error' : ''}`}
                    value={formData.requestor}
                    onChange={(e) => handleInputChange('requestor', e.target.value)}
                    placeholder="Enter requestor name"
                  />
                  {errors.requestor && <span className="error-message">{errors.requestor}</span>}
                </div>
                
                <div className="form-group">
                  <label>Requestor Department *</label>
                  <select 
                    className={`form-select ${errors.requestorDepartment ? 'error' : ''}`}
                    value={formData.requestorDepartment}
                    onChange={(e) => handleInputChange('requestorDepartment', e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.requestorDepartment && <span className="error-message">{errors.requestorDepartment}</span>}
                </div>
              </div>
            </div>

            {/* Procurement Information Section */}
            <div className="form-section">
              <h6>Procurement Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>Buyer *</label>
                  <select 
                    className={`form-select ${errors.buyer ? 'error' : ''}`}
                    value={formData.buyer}
                    onChange={(e) => handleInputChange('buyer', e.target.value)}
                  >
                    <option value="">Select Buyer</option>
                    {buyers.map(buyer => (
                      <option key={buyer} value={buyer}>{buyer}</option>
                    ))}
                  </select>
                  {errors.buyer && <span className="error-message">{errors.buyer}</span>}
                </div>
                
                <div className="form-group">
                  <label>Currency *</label>
                  <select 
                    className={`form-select ${errors.currency ? 'error' : ''}`}
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                  {errors.currency && <span className="error-message">{errors.currency}</span>}
                </div>
              </div>
            </div>

            {/* Budget Information Section */}
            <div className="form-section">
              <h6>Budget Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>Budgeted *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="budgeted" 
                        value="Yes"
                        checked={formData.budgeted === 'Yes'}
                        onChange={(e) => handleInputChange('budgeted', e.target.value)}
                      />
                      <span className="radio-text">Yes</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="budgeted" 
                        value="No"
                        checked={formData.budgeted === 'No'}
                        onChange={(e) => handleInputChange('budgeted', e.target.value)}
                      />
                      <span className="radio-text">No</span>
                    </label>
                  </div>
                </div>
                
                {formData.budgeted === 'Yes' && (
                  <div className="form-group">
                    <label>Budget *</label>
                    <select 
                      className={`form-select ${errors.budget ? 'error' : ''}`}
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                    >
                      <option value="">Select Budget</option>
                      {budgets.map(budget => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                    {errors.budget && <span className="error-message">{errors.budget}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="form-section">
              <div className="form-group full-width">
                <label>Notes to Approver</label>
                <textarea 
                  className="form-textarea"
                  value={formData.notesToApprover}
                  onChange={(e) => handleInputChange('notesToApprover', e.target.value)}
                  placeholder="Enter any additional notes for the approver"
                  rows="3"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleClose}
              >
                CANCEL
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
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

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
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
          color: #6c757d;
        }

        .modal-close:hover {
          background: #f8f9fa;
          color: #333;
        }

        .modal-body {
          padding: 24px;
          max-height: calc(90vh - 120px);
          overflow-y: auto;
        }

        .mandatory-note {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .requisition-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 24px;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .form-section h6 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 6px;
        }

        .form-input, .form-select, .form-textarea {
          padding: 10px 12px;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s ease;
          background: white;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }

        .form-input.error, .form-select.error, .form-textarea.error {
          border-color: #dc3545;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
          font-size: 18px;
          pointer-events: none;
        }

        .radio-group {
          display: flex;
          gap: 20px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-label input[type="radio"] {
          margin: 0;
          cursor: pointer;
        }

        .radio-text {
          font-size: 14px;
          color: #333;
        }

        .error-message {
          color: #dc3545;
          font-size: 12px;
          margin-top: 4px;
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
          font-size: 14px;
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

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
          border-radius: 0 0 12px 12px;
        }

        @media (max-width: 768px) {
          .modal-content.large {
            max-width: 95vw;
            margin: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .radio-group {
            flex-direction: column;
            gap: 10px;
          }

          .modal-footer {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementCreateRequisitionModal;


