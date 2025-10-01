import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementCreatePurchaseOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // Purchase Order Details
    poNumber: '',
    requisitionNumber: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDeliveryDate: '',
    priority: 'Medium',
    department: '',
    requestor: '',
    buyer: '',
    notes: '',
    
    // Supplier Information
    supplier: '',
    supplierContact: '',
    supplierEmail: '',
    supplierPhone: '',
    supplierAddress: '',
    
    // Items
    items: [
      {
        id: 1,
        itemName: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        uom: 'Pieces',
        taxRate: 0
      }
    ],
    
    // Totals
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0
  });

  const [errors, setErrors] = useState({});

  // Mock data for dropdowns
  const departments = [
    'Admin Department',
    'IT Department', 
    'Operations Department',
    'Finance Department',
    'HR Department'
  ];

  const suppliers = [
    'Al Zahra Auto Spare Parts',
    'Tamayuz Trading',
    'Rozi International Group',
    'Mehul Nickel Alloys',
    'Onpassive IT Consulting'
  ];

  const uomOptions = [
    'Pieces',
    'Kilograms',
    'Liters',
    'Meters',
    'Hours',
    'Days'
  ];

  const taxRates = [
    { label: 'No Tax', value: 0 },
    { label: 'VAT - 5%', value: 5 },
    { label: 'GST - 18%', value: 18 },
    { label: 'Sales Tax - 10%', value: 10 }
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

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    // Calculate total price for this item
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? parseFloat(value) || 0 : newItems[index].unitPrice;
      newItems[index].totalPrice = quantity * unitPrice;
    }

    setFormData(prev => ({
      ...prev,
      items: newItems
    }));

    calculateTotals(newItems);
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    const taxAmount = items.reduce((sum, item) => {
      const itemTax = (item.totalPrice || 0) * (item.taxRate || 0) / 100;
      return sum + itemTax;
    }, 0);
    const totalAmount = subtotal + taxAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount
    }));
  };

  const addItem = () => {
    const newItem = {
      id: formData.items.length + 1,
      itemName: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      uom: 'Pieces',
      taxRate: 0
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
      calculateTotals(newItems);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.poNumber.trim()) newErrors.poNumber = 'PO Number is required';
    if (!formData.supplier.trim()) newErrors.supplier = 'Supplier is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.requestor.trim()) newErrors.requestor = 'Requestor is required';
    if (!formData.buyer.trim()) newErrors.buyer = 'Buyer is required';

    // Validate items
    formData.items.forEach((item, index) => {
      if (!item.itemName.trim()) {
        newErrors[`itemName_${index}`] = 'Item name is required';
      }
      if (item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
      }
      if (item.unitPrice <= 0) {
        newErrors[`unitPrice_${index}`] = 'Unit price must be greater than 0';
      }
    });

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

  const handleSaveDraft = () => {
    onSubmit({ ...formData, status: 'draft' });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      poNumber: '',
      requisitionNumber: '',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: '',
      priority: 'Medium',
      department: '',
      requestor: '',
      buyer: '',
      notes: '',
      supplier: '',
      supplierContact: '',
      supplierEmail: '',
      supplierPhone: '',
      supplierAddress: '',
      items: [{
        id: 1,
        itemName: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        uom: 'Pieces',
        taxRate: 0
      }],
      subtotal: 0,
      taxAmount: 0,
      totalAmount: 0
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content extra-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h6 className="modal-title">
            <Icon icon="mdi:file-document-plus" className="info-icon" />
            Create Purchase Order
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
          
          <form onSubmit={handleSubmit} className="po-form">
            {/* Purchase Order Details Section */}
            <div className="form-section">
              <h6>Purchase Order Details</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>PO Number *</label>
                  <input 
                    type="text" 
                    className={`form-input ${errors.poNumber ? 'error' : ''}`}
                    value={formData.poNumber}
                    onChange={(e) => handleInputChange('poNumber', e.target.value)}
                    placeholder="Enter PO number"
                  />
                  {errors.poNumber && <span className="error-message">{errors.poNumber}</span>}
                </div>
                
                <div className="form-group">
                  <label>Requisition Number</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.requisitionNumber}
                    onChange={(e) => handleInputChange('requisitionNumber', e.target.value)}
                    placeholder="Enter requisition number"
                  />
                </div>
                
                <div className="form-group">
                  <label>Order Date *</label>
                  <div className="input-with-icon">
                    <input 
                      type="date" 
                      className="form-input"
                      value={formData.orderDate}
                      onChange={(e) => handleInputChange('orderDate', e.target.value)}
                    />
                    <Icon icon="mdi:calendar" className="input-icon" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Expected Delivery Date</label>
                  <div className="input-with-icon">
                    <input 
                      type="date" 
                      className="form-input"
                      value={formData.expectedDeliveryDate}
                      onChange={(e) => handleInputChange('expectedDeliveryDate', e.target.value)}
                    />
                    <Icon icon="mdi:calendar" className="input-icon" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    className="form-select"
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Department *</label>
                  <select 
                    className={`form-select ${errors.department ? 'error' : ''}`}
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <span className="error-message">{errors.department}</span>}
                </div>
                
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
                  <label>Buyer *</label>
                  <input 
                    type="text" 
                    className={`form-input ${errors.buyer ? 'error' : ''}`}
                    value={formData.buyer}
                    onChange={(e) => handleInputChange('buyer', e.target.value)}
                    placeholder="Enter buyer name"
                  />
                  {errors.buyer && <span className="error-message">{errors.buyer}</span>}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Notes</label>
                <textarea 
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter any additional notes"
                  rows="3"
                />
              </div>
            </div>

            {/* Supplier Information Section */}
            <div className="form-section">
              <h6>Supplier Information</h6>
              <div className="form-grid">
                <div className="form-group">
                  <label>Supplier *</label>
                  <select 
                    className={`form-select ${errors.supplier ? 'error' : ''}`}
                    value={formData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                  {errors.supplier && <span className="error-message">{errors.supplier}</span>}
                </div>
                
                <div className="form-group">
                  <label>Contact Person</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={formData.supplierContact}
                    onChange={(e) => handleInputChange('supplierContact', e.target.value)}
                    placeholder="Enter contact person name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={formData.supplierEmail}
                    onChange={(e) => handleInputChange('supplierEmail', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    value={formData.supplierPhone}
                    onChange={(e) => handleInputChange('supplierPhone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Address</label>
                <textarea 
                  className="form-textarea"
                  value={formData.supplierAddress}
                  onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                  placeholder="Enter supplier address"
                  rows="2"
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="form-section">
              <div className="section-header">
                <h6>Items</h6>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={addItem}
                >
                  <Icon icon="mdi:plus" />
                  Add Item
                </button>
              </div>
              
              <div className="items-table-container">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Item Name *</th>
                      <th>Description</th>
                      <th>Quantity *</th>
                      <th>UOM</th>
                      <th>Unit Price *</th>
                      <th>Tax Rate</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          <input 
                            type="text" 
                            className={`form-input ${errors[`itemName_${index}`] ? 'error' : ''}`}
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                            placeholder="Enter item name"
                          />
                          {errors[`itemName_${index}`] && (
                            <span className="error-message">{errors[`itemName_${index}`]}</span>
                          )}
                        </td>
                        <td>
                          <input 
                            type="text" 
                            className="form-input"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            placeholder="Enter description"
                          />
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className={`form-input ${errors[`quantity_${index}`] ? 'error' : ''}`}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            min="1"
                            step="1"
                          />
                          {errors[`quantity_${index}`] && (
                            <span className="error-message">{errors[`quantity_${index}`]}</span>
                          )}
                        </td>
                        <td>
                          <select 
                            className="form-select"
                            value={item.uom}
                            onChange={(e) => handleItemChange(index, 'uom', e.target.value)}
                          >
                            {uomOptions.map(uom => (
                              <option key={uom} value={uom}>{uom}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input 
                            type="number" 
                            className={`form-input ${errors[`unitPrice_${index}`] ? 'error' : ''}`}
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            min="0"
                            step="0.01"
                          />
                          {errors[`unitPrice_${index}`] && (
                            <span className="error-message">{errors[`unitPrice_${index}`]}</span>
                          )}
                        </td>
                        <td>
                          <select 
                            className="form-select"
                            value={item.taxRate}
                            onChange={(e) => handleItemChange(index, 'taxRate', parseFloat(e.target.value))}
                          >
                            {taxRates.map(tax => (
                              <option key={tax.value} value={tax.value}>{tax.label}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <span className="total-price">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          <button 
                            type="button" 
                            className="btn btn-icon danger"
                            onClick={() => removeItem(index)}
                            disabled={formData.items.length === 1}
                          >
                            <Icon icon="mdi:delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="form-section totals-section">
              <div className="totals-container">
                <div className="total-row">
                  <span className="total-label">Subtotal:</span>
                  <span className="total-value">${formData.subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span className="total-label">Tax Amount:</span>
                  <span className="total-value">${formData.taxAmount.toFixed(2)}</span>
                </div>
                <div className="total-row total-final">
                  <span className="total-label">Total Amount:</span>
                  <span className="total-value">${formData.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleSaveDraft}
              >
                SAVE DRAFT
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                CREATE PO
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

        .modal-content.extra-large {
          max-width: 1200px;
          max-height: 95vh;
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
          max-height: calc(95vh - 120px);
          overflow-y: auto;
        }

        .mandatory-note {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .po-form {
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

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h6 {
          margin: 0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
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

        .form-input.error, .form-select.error {
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

        .btn-outline {
          background: transparent;
          color: #007bff;
          border: 1px solid #007bff;
        }

        .btn-outline:hover {
          background: #007bff;
          color: white;
        }

        .btn-icon {
          padding: 8px;
          background: #f8f9fa;
          color: #666;
          border: 1px solid #e9ecef;
        }

        .btn-icon.danger {
          color: #dc3545;
        }

        .btn-icon.danger:hover {
          background: #f8d7da;
        }

        .btn-icon:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .items-table-container {
          overflow-x: auto;
          border: 1px solid #e9ecef;
          border-radius: 6px;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .items-table th {
          background: #f8f9fa;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #e9ecef;
        }

        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f3f4;
          vertical-align: top;
        }

        .items-table tbody tr:hover {
          background: #f8f9fa;
        }

        .items-table .form-input, .items-table .form-select {
          width: 100%;
          margin: 0;
        }

        .total-price {
          font-weight: 600;
          color: #333;
        }

        .totals-section {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 20px;
          margin-top: 20px;
        }

        .totals-container {
          max-width: 300px;
          margin-left: auto;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .total-row:last-child {
          border-bottom: none;
        }

        .total-final {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          border-top: 2px solid #007bff;
          margin-top: 8px;
          padding-top: 12px;
        }

        .total-label {
          color: #666;
        }

        .total-value {
          font-weight: 500;
          color: #333;
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
          .modal-content.extra-large {
            max-width: 95vw;
            margin: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .totals-container {
            max-width: 100%;
          }

          .modal-footer {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementCreatePurchaseOrderModal;


