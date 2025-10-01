import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateBudgetModal = ({ show, onHide, onSubmit, businessEntities, budgetOwners }) => {
  const [formData, setFormData] = useState({
    budgetName: '',
    businessEntity: '',
    budgetOwner: '',
    period: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    currency: 'USD',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.budgetName.trim()) {
      newErrors.budgetName = 'Budget name is required';
    }

    if (!formData.businessEntity) {
      newErrors.businessEntity = 'Business entity is required';
    }

    if (!formData.budgetOwner) {
      newErrors.budgetOwner = 'Budget owner is required';
    }

    if (!formData.period) {
      newErrors.period = 'Period is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData.totalAmount || formData.totalAmount <= 0) {
      newErrors.totalAmount = 'Total amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      toast.success('Budget created successfully!');
      handleClose();
    } else {
      toast.error('Please fix the errors and try again.');
    }
  };

  const handleClose = () => {
    setFormData({
      budgetName: '',
      businessEntity: '',
      budgetOwner: '',
      period: '',
      startDate: '',
      endDate: '',
      totalAmount: '',
      currency: 'USD',
      description: ''
    });
    setErrors({});
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0 pb-0">
            <div className="d-flex align-items-center gap-2">
              <Icon icon="ri-information-line" className="text-primary" />
              <h5 className="modal-title">Create Budget</h5>
              <span className="text-muted small">*Indicates mandatory fields.</span>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Budget Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.budgetName ? 'is-invalid' : ''}`}
                    name="budgetName"
                    value={formData.budgetName}
                    onChange={handleInputChange}
                    placeholder="Enter budget name"
                  />
                  {errors.budgetName && (
                    <div className="invalid-feedback">{errors.budgetName}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Business Entity <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.businessEntity ? 'is-invalid' : ''}`}
                    name="businessEntity"
                    value={formData.businessEntity}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Business Entity</option>
                    {businessEntities.map(entity => (
                      <option key={entity.id} value={entity.name}>
                        {entity.name} - {entity.code}
                      </option>
                    ))}
                  </select>
                  {errors.businessEntity && (
                    <div className="invalid-feedback">{errors.businessEntity}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Budget Owner <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.budgetOwner ? 'is-invalid' : ''}`}
                    name="budgetOwner"
                    value={formData.budgetOwner}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Budget Owner</option>
                    {budgetOwners.map(owner => (
                      <option key={owner.id} value={owner.name}>
                        {owner.name}
                      </option>
                    ))}
                  </select>
                  {errors.budgetOwner && (
                    <div className="invalid-feedback">{errors.budgetOwner}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Period <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.period ? 'is-invalid' : ''}`}
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Period</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Semi-Annual">Semi-Annual</option>
                    <option value="Annual">Annual</option>
                    <option value="Custom">Custom</option>
                  </select>
                  {errors.period && (
                    <div className="invalid-feedback">{errors.period}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Start Date <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="date"
                      className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    <Icon 
                      icon="ri-calendar-line" 
                      className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                    />
                  </div>
                  {errors.startDate && (
                    <div className="invalid-feedback">{errors.startDate}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    End Date <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="date"
                      className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                    <Icon 
                      icon="ri-calendar-line" 
                      className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                    />
                  </div>
                  {errors.endDate && (
                    <div className="invalid-feedback">{errors.endDate}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">
                    Total Amount <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className={`form-control ${errors.totalAmount ? 'is-invalid' : ''}`}
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <select
                      className="form-select"
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="AUD">AUD</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                  {errors.totalAmount && (
                    <div className="invalid-feedback">{errors.totalAmount}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter budget description (optional)"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0 pt-0">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
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
    </div>
  );
};

export default CreateBudgetModal;

