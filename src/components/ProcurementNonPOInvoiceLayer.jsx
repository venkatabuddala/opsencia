import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProcurementAddInvoiceLinesModal from "./ProcurementAddInvoiceLinesModal";
import ProcurementImportExcelModal from "./ProcurementImportExcelModal";

const ProcurementNonPOInvoiceLayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier: '',
    invoiceNumber: '',
    invoiceType: 'Standard',
    invoiceDescription: '',
    budget: '',
    department: '',
    invoiceDate: '2025-08-06',
    invoiceCurrency: 'United States dollar',
    reasonForNonPO: '',
    paymentTerms: '30 Days',
    invoiceAmount: '0.00',
    taxAmount: '0.00',
    totalAmount: ''
  });

  const [invoiceLines, setInvoiceLines] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showAddLinesModal, setShowAddLinesModal] = useState(false);
  const [showImportExcelModal, setShowImportExcelModal] = useState(false);

  // Mock data for dropdowns
  const suppliers = [
    'ABC Trading Company',
    'XYZ Suppliers Ltd',
    'Global Procurement Inc',
    'Tech Solutions Corp'
  ];

  const budgets = [
    'Budget for 25. IT Consulting Services',
    'Marketing Budget 2025',
    'Operations Budget',
    'Capital Expenditure Budget'
  ];

  const departments = [
    'IT Department',
    'Finance Department',
    'Operations',
    'Human Resources',
    'Marketing'
  ];

  const currencies = [
    'United States dollar',
    'Euro',
    'British Pound',
    'UAE Dirham',
    'Indian Rupee'
  ];

  const paymentTermsOptions = [
    '15 Days',
    '30 Days',
    '45 Days',
    '60 Days',
    '90 Days'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addInvoiceLine = () => {
    const newLine = {
      id: Date.now(),
      item: '',
      category: '',
      deliveryDate: '',
      orderQty: '',
      orderUnit: '',
      unitCost: '',
      lineCost: '',
      taxRateCode: '',
      taxAmount: ''
    };
    setInvoiceLines(prev => [...prev, newLine]);
  };

  const removeInvoiceLine = (id) => {
    setInvoiceLines(prev => prev.filter(line => line.id !== id));
  };

  const updateInvoiceLine = (id, field, value) => {
    setInvoiceLines(prev => prev.map(line => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value };
        
        // Calculate line cost if qty and unit cost are provided
        if (field === 'orderQty' || field === 'unitCost') {
          const qty = field === 'orderQty' ? parseFloat(value) : parseFloat(line.orderQty);
          const cost = field === 'unitCost' ? parseFloat(value) : parseFloat(line.unitCost);
          if (!isNaN(qty) && !isNaN(cost)) {
            updatedLine.lineCost = (qty * cost).toFixed(2);
          }
        }
        
        return updatedLine;
      }
      return line;
    }));
  };

  const calculateTotals = () => {
    const totalLineCost = invoiceLines.reduce((sum, line) => {
      return sum + (parseFloat(line.lineCost) || 0);
    }, 0);
    
    const totalTax = invoiceLines.reduce((sum, line) => {
      return sum + (parseFloat(line.taxAmount) || 0);
    }, 0);
    
    const total = totalLineCost + totalTax;
    
    setFormData(prev => ({
      ...prev,
      invoiceAmount: totalLineCost.toFixed(2),
      taxAmount: totalTax.toFixed(2),
      totalAmount: total.toFixed(2)
    }));
  };

  const handleSubmit = () => {
    if (!agreeToTerms) {
      alert('Please agree to Terms & Conditions');
      return;
    }
    
    console.log('NON-PO Invoice submitted:', {
      formData,
      invoiceLines,
      uploadedFiles
    });
    
    alert('NON-PO Invoice submitted successfully!');
    navigate('/procurement/invoices');
  };

  const handleCancel = () => {
    navigate('/procurement/invoices');
  };

  const handleAddInvoiceLines = (newLines) => {
    setInvoiceLines(prev => [...prev, ...newLines]);
  };

  const handleImportExcelLines = (importedLines) => {
    setInvoiceLines(prev => [...prev, ...importedLines]);
  };

  // Recalculate totals when invoice lines change
  useEffect(() => {
    calculateTotals();
  }, [invoiceLines]);

  return (
    <div className="procurement-non-po-invoice">
      <div className="form-container">
        {/* Header */}
        <div className="form-header">
          <h6>Create NON-PO Invoice</h6>
          <p>Please enter all fields for creating NON-PO Invoice.</p>
        </div>

        {/* Main Form */}
        <div className="form-content">
          {/* Form Fields */}
          <div className="form-fields">
            <div className="form-row">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="supplier">Supplier*</label>
                  <div className="search-input-container">
                    <input
                      type="text"
                      id="supplier"
                      value={formData.supplier}
                      onChange={(e) => handleInputChange('supplier', e.target.value)}
                      placeholder="Search by Name..."
                      className="form-input"
                    />
                    <Icon icon="mdi:magnify" className="search-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="invoiceNumber">Invoice Number*</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      className="form-input"
                    />
                    <Icon icon="mdi:book" className="input-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="invoiceType">Invoice Type*</label>
                  <select
                    id="invoiceType"
                    value={formData.invoiceType}
                    onChange={(e) => handleInputChange('invoiceType', e.target.value)}
                    className="form-select"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="invoiceDescription">Invoice Description*</label>
                  <textarea
                    id="invoiceDescription"
                    value={formData.invoiceDescription}
                    onChange={(e) => handleInputChange('invoiceDescription', e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Enter invoice description..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget*</label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Budget</option>
                    {budgets.map((budget, index) => (
                      <option key={index} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="department">Department*</label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="invoiceDate">Invoice Date*</label>
                  <div className="date-input-container">
                    <input
                      type="date"
                      id="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                      className="form-input"
                    />
                    <Icon icon="mdi:calendar" className="calendar-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="invoiceCurrency">Invoice Currency*</label>
                  <select
                    id="invoiceCurrency"
                    value={formData.invoiceCurrency}
                    onChange={(e) => handleInputChange('invoiceCurrency', e.target.value)}
                    className="form-select"
                  >
                    {currencies.map((currency, index) => (
                      <option key={index} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reasonForNonPO">Reason for NON-PO Invoice*</label>
                  <textarea
                    id="reasonForNonPO"
                    value={formData.reasonForNonPO}
                    onChange={(e) => handleInputChange('reasonForNonPO', e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Enter reason for NON-PO invoice..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="paymentTerms">Payment Terms*</label>
                  <select
                    id="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                    className="form-select"
                  >
                    {paymentTermsOptions.map((term, index) => (
                      <option key={index} value={term}>{term}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="document-upload-section">
            <h6>Document Upload</h6>
            <div 
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Icon icon="mdi:upload" className="upload-icon" />
              <p>Click here or Drag and Drop to Upload Documents *</p>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <Icon icon="mdi:file-document" className="file-icon" />
                    <span className="file-name">{file.name}</span>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-file-btn"
                    >
                      <Icon icon="mdi:close" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Invoice Lines Section */}
          <div className="invoice-lines-section">
            <div className="section-header">
              <h6>Invoice Lines</h6>
              <div className="section-actions">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setShowAddLinesModal(true)}
                >
                  + ADD INVOICE LINES
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowImportExcelModal(true)}
                >
                  IMPORT EXCEL
                </button>
              </div>
            </div>

            <div className="invoice-lines-table-container">
              <table className="invoice-lines-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Delivery Date</th>
                    <th>Order Qty</th>
                    <th>Order Unit</th>
                    <th>Unit Cost</th>
                    <th>Line Cost</th>
                    <th>Tax Rate Code</th>
                    <th>Tax Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceLines.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="no-records">
                        No records to display
                      </td>
                    </tr>
                  ) : (
                    invoiceLines.map((line) => (
                      <tr key={line.id}>
                        <td>
                          <input
                            type="text"
                            value={line.item}
                            onChange={(e) => updateInvoiceLine(line.id, 'item', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={line.category}
                            onChange={(e) => updateInvoiceLine(line.id, 'category', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={line.deliveryDate}
                            onChange={(e) => updateInvoiceLine(line.id, 'deliveryDate', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={line.orderQty}
                            onChange={(e) => updateInvoiceLine(line.id, 'orderQty', e.target.value)}
                            className="table-input"
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={line.orderUnit}
                            onChange={(e) => updateInvoiceLine(line.id, 'orderUnit', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={line.unitCost}
                            onChange={(e) => updateInvoiceLine(line.id, 'unitCost', e.target.value)}
                            className="table-input"
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={line.lineCost}
                            readOnly
                            className="table-input readonly"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={line.taxRateCode}
                            onChange={(e) => updateInvoiceLine(line.id, 'taxRateCode', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={line.taxAmount}
                            onChange={(e) => updateInvoiceLine(line.id, 'taxAmount', e.target.value)}
                            className="table-input"
                            step="0.01"
                            min="0"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => removeInvoiceLine(line.id)}
                            className="remove-btn"
                          >
                            <Icon icon="mdi:delete" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="summary-section">
            <div className="summary-fields">
              <div className="summary-field">
                <label htmlFor="invoiceAmount">Invoice Amount*</label>
                <div className="amount-input-container">
                  <input
                    type="number"
                    id="invoiceAmount"
                    value={formData.invoiceAmount}
                    onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
                    className="form-input amount-input"
                    step="0.01"
                    min="0"
                    readOnly
                  />
                  <Icon icon="mdi:calculator" className="calculator-icon" />
                </div>
              </div>

              <div className="summary-field">
                <label htmlFor="taxAmount">Tax Amount*</label>
                <input
                  type="number"
                  id="taxAmount"
                  value={formData.taxAmount}
                  onChange={(e) => handleInputChange('taxAmount', e.target.value)}
                  className="form-input amount-input"
                  step="0.01"
                  min="0"
                  readOnly
                />
              </div>

              <div className="summary-field">
                <label htmlFor="totalAmount">Total Amount*</label>
                <input
                  type="number"
                  id="totalAmount"
                  value={formData.totalAmount}
                  onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                  className="form-input amount-input"
                  step="0.01"
                  min="0"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-section">
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <label htmlFor="agreeTerms">I Agree to Terms & Conditions</label>
            </div>

            <div className="action-buttons">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!agreeToTerms}
              >
                SUBMIT INVOICE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Invoice Lines Modal */}
      <ProcurementAddInvoiceLinesModal
        isOpen={showAddLinesModal}
        onClose={() => setShowAddLinesModal(false)}
        onAddLines={handleAddInvoiceLines}
      />

      {/* Import Excel Modal */}
      <ProcurementImportExcelModal
        isOpen={showImportExcelModal}
        onClose={() => setShowImportExcelModal(false)}
        onImportLines={handleImportExcelLines}
      />

      <style jsx>{`
        .procurement-non-po-invoice {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .form-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .form-header {
          padding: 30px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .form-header h6 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0 0 10px 0;
        }

        .form-header p {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .form-content {
          padding: 30px;
        }

        .form-fields {
          margin-bottom: 30px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input, .form-select, .form-textarea {
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          font-size: 16px;
          color: #333;
          background: white;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .search-input-container, .input-with-icon, .date-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon, .input-icon, .calendar-icon {
          position: absolute;
          right: 15px;
          font-size: 20px;
          color: #666;
          pointer-events: none;
        }

        .search-input-container .form-input {
          padding-right: 45px;
        }

        .input-with-icon .form-input {
          padding-right: 45px;
        }

        .date-input-container .form-input {
          padding-right: 45px;
        }

        .document-upload-section {
          margin-bottom: 30px;
        }

        .document-upload-section h6 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 15px 0;
        }

        .upload-area {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s ease;
          background: #f8f9fa;
        }

        .upload-area:hover {
          border-color: #007bff;
        }

        .upload-icon {
          font-size: 48px;
          color: #666;
          margin-bottom: 15px;
        }

        .upload-area p {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .uploaded-files {
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .file-icon {
          font-size: 20px;
          color: #007bff;
        }

        .file-name {
          flex: 1;
          font-size: 14px;
          color: #333;
        }

        .remove-file-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          padding: 5px;
        }

        .invoice-lines-section {
          margin-bottom: 30px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h6 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .section-actions {
          display: flex;
          gap: 10px;
        }

        .invoice-lines-table-container {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }

        .invoice-lines-table {
          width: 100%;
          border-collapse: collapse;
        }

        .invoice-lines-table th {
          background: #f8f9fa;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #e9ecef;
        }

        .invoice-lines-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f3f4;
        }

        .table-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          background: white;
        }

        .table-input:focus {
          outline: none;
          border-color: #007bff;
        }

        .table-input.readonly {
          background: #f8f9fa;
          color: #666;
        }

        .no-records {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 40px;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .remove-btn:hover {
          background: #f8f9fa;
        }

        .summary-section {
          margin-bottom: 30px;
          display: flex;
          justify-content: flex-end;
        }

        .summary-fields {
          display: flex;
          gap: 20px;
        }

        .summary-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 150px;
        }

        .summary-field label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .amount-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .amount-input {
          padding-right: 45px;
        }

        .calculator-icon {
          position: absolute;
          right: 15px;
          font-size: 20px;
          color: #666;
          pointer-events: none;
        }

        .action-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }

        .terms-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .terms-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #007bff;
        }

        .terms-checkbox label {
          font-size: 14px;
          color: #333;
          cursor: pointer;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
        }

        .btn {
          padding: 12px 24px;
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

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn-primary:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #545b62;
        }

        @media (max-width: 768px) {
          .procurement-non-po-invoice {
            padding: 10px;
          }

          .form-content {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .section-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .section-actions {
            width: 100%;
            justify-content: stretch;
          }

          .section-actions .btn {
            flex: 1;
            justify-content: center;
          }

          .summary-fields {
            flex-direction: column;
            gap: 15px;
          }

          .action-section {
            flex-direction: column;
            gap: 20px;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: stretch;
          }

          .action-buttons .btn {
            flex: 1;
            justify-content: center;
          }

          .invoice-lines-table {
            font-size: 12px;
          }

          .invoice-lines-table th,
          .invoice-lines-table td {
            padding: 8px 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementNonPOInvoiceLayer;
