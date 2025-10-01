import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementInvoiceViewLayer = () => {
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('invoice-lines');
  const [paymentForm, setPaymentForm] = useState({
    paymentMethod: 'Cash',
    paymentDescription: '',
    paymentDate: '2025-08-06',
    totalInvoiceAmount: '10500.00',
    amountToBePaid: '10500.00'
  });

  // Mock data for the invoice details
  const invoiceData = {
    invoiceNo: '31212',
    description: 'awdawawd',
    totalAmount: '$10,500.00',
    status: 'Approved',
    invoiceId: '369813555',
    invoiceType: 'STANDARD',
    poNo: 'PO_00098',
    poDescription: 'PO test',
    supplier: {
      name: 'Tamayuz Trading',
      contact: 'Rahul',
      email: 'info@tamayuz.com'
    },
    invoiceGrossAmount: '$10,500.00',
    approvalHistory: [
      {
        approver: 'Super Admin',
        status: 'Approved',
        date: '07-21-2025',
        action: 'approved'
      }
    ],
    invoiceDate: '07-21-2025',
    submittedDate: '07-21-2025',
    dueDate: '08-20-2025',
    requestor: {
      name: 'Department User',
      email: 'manikanta.thokachichu@p...'
    },
    submittedBy: 'Fareed',
    poTotalAmount: '$10,500.00',
    invoicedAmount: '$10,500.00',
    invoiceNetAmount: '$10,500.00',
    buyer: {
      name: 'Super Admin',
      email: 'gautamrao.l@Opsencia.com'
    },
    paymentTerms: '30 Days',
    taxAmount: '$0.00',
    budget: 'Budget for 25. IT Consulting Services',
    availableAmount: '$1,489,500.00',
    documents: [
      {
        name: 'Dummy PDF file',
        type: 'Invoice Document'
      }
    ],
    bankDetails: {
      bankName: 'Abu Dhabi Commercial ...',
      accountNo: 'AE0703312345678',
      accountType: 'Current',
      beneficiaryName: 'Tamayuz holding LLC',
      bankAddress: 'Abu Dhabi Islamic Bank - UAE - All Branches,,,,, AE',
      ibanNumber: '',
      swiftCode: '',
      isPrimary: true
    },
    invoiceLines: [
      {
        receiptId: '369813557',
        poLineNo: 1,
        itemName: 'laptops',
        category: 'Computer Hardware',
        qty: 10,
        unitCost: '$1,000.00',
        ordUnit: 'Pieces',
        price: '$10,000.00',
        taxRate: 'NA',
        tax: 'NA',
        recDate: '07-21-2025',
        recBy: 'Super Admin'
      },
      {
        receiptId: '369813558',
        poLineNo: 2,
        itemName: 'Mouse',
        category: 'Computer Hardware',
        qty: 10,
        unitCost: '$50.00',
        ordUnit: 'Box',
        price: '$500.00',
        taxRate: 'NA',
        tax: 'NA',
        recDate: '07-21-2025',
        recBy: 'Super Admin'
      }
    ]
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-badge approved';
      case 'Paid':
        return 'status-badge paid';
      case 'Pending':
        return 'status-badge pending';
      case 'Draft':
        return 'status-badge draft';
      default:
        return 'status-badge';
    }
  };

  const handlePaymentFormChange = (field, value) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePay = () => {
    console.log('Payment submitted:', paymentForm);
    // Here you would typically submit the payment
    alert('Payment submitted successfully!');
  };

  return (
    <div className="procurement-invoice-view">
      <div className="view-container">
        {/* Main Content */}
        <div className="main-content">
          {/* Header Section */}
          <div className="header-section">
            <div className="invoice-header">
              <div className="invoice-info">
                <h6 className="invoice-number">Invoice No.: {invoiceData.invoiceNo}</h6>
                <p className="invoice-description">{invoiceData.description}</p>
                <div className="invoice-amount">
                  <span className="amount-label">Total Amount:</span>
                  <span className="amount-value">{invoiceData.totalAmount}</span>
                  <span className={getStatusBadgeClass(invoiceData.status)}>
                    {invoiceData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="details-section">
            <div className="details-grid">
              <div className="left-column">
                <div className="detail-group">
                  <h6>Invoice Id/Type:</h6>
                  <p>{invoiceData.invoiceId}, {invoiceData.invoiceType}</p>
                </div>

                <div className="detail-group">
                  <h6>PO No:</h6>
                  <p className="po-link">{invoiceData.poNo}</p>
                </div>

                <div className="detail-group">
                  <h6>PO Description:</h6>
                  <p>{invoiceData.poDescription}</p>
                </div>

                <div className="detail-group">
                  <h6>Supplier:</h6>
                  <div className="supplier-info">
                    <span className="supplier-name">{invoiceData.supplier.name}</span>
                    <div className="supplier-details">
                      <span>{invoiceData.supplier.contact}</span>
                      <span className="supplier-email">{invoiceData.supplier.email}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <h6>Invoice Gross Amount:</h6>
                  <p className="amount">{invoiceData.invoiceGrossAmount}</p>
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
                      {invoiceData.approvalHistory.map((approval, index) => (
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
                          <div className="approval-action">
                            {approval.action}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="right-column">
                <div className="detail-group">
                  <h6>Invoice Date/Submitted Date:</h6>
                  <p>{invoiceData.invoiceDate} / {invoiceData.submittedDate}</p>
                </div>

                <div className="detail-group">
                  <h6>Invoice Due Date:</h6>
                  <p>{invoiceData.dueDate}</p>
                </div>

                <div className="detail-group">
                  <h6>Requestor:</h6>
                  <div className="user-info">
                    <span className="user-name">{invoiceData.requestor.name}</span>
                    <div className="user-email">
                      <Icon icon="mdi:account" className="user-icon" />
                      <span>{invoiceData.requestor.email}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <h6>Submitted By:</h6>
                  <p>{invoiceData.submittedBy}</p>
                </div>

                <div className="detail-group">
                  <h6>PO Total Amount / Invoiced Amount:</h6>
                  <p>{invoiceData.poTotalAmount} / {invoiceData.invoicedAmount}</p>
                </div>

                <div className="detail-group">
                  <h6>Invoice Net Amount:</h6>
                  <p className="amount">{invoiceData.invoiceNetAmount}</p>
                </div>

                <div className="detail-group">
                  <h6>Buyer:</h6>
                  <div className="user-info">
                    <span className="user-name">{invoiceData.buyer.name}</span>
                    <div className="user-email">
                      <Icon icon="mdi:account" className="user-icon" />
                      <span>{invoiceData.buyer.email}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-group">
                  <h6>Payment Terms:</h6>
                  <p>{invoiceData.paymentTerms}</p>
                </div>

                <div className="detail-group">
                  <h6>Invoice Tax Amount:</h6>
                  <p className="amount">{invoiceData.taxAmount}</p>
                </div>
              </div>
            </div>

            {/* Budget Section */}
            <div className="budget-section">
              <div className="budget-info">
                <h6>Budget:</h6>
                <p>{invoiceData.budget}</p>
              </div>
              <div className="available-amount">
                <h6>Available Amount:</h6>
                <p className="amount available">{invoiceData.availableAmount}</p>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs-section">
              <div className="tabs-header">
                <button 
                  className={`tab-button ${activeTab === 'invoice-lines' ? 'active' : ''}`}
                  onClick={() => setActiveTab('invoice-lines')}
                >
                  Invoice Lines
                </button>
                <button 
                  className={`tab-button ${activeTab === 'payment-details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payment-details')}
                >
                  Payment Details
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'invoice-lines' && (
                  <div className="invoice-lines-table-container">
                    <table className="invoice-lines-table">
                      <thead>
                        <tr>
                          <th>Receipt Id</th>
                          <th>PO Line No</th>
                          <th>Item Name</th>
                          <th>Category</th>
                          <th>Qty</th>
                          <th>Unit Cost</th>
                          <th>Ord. Unit</th>
                          <th>Price</th>
                          <th>Tax Rate</th>
                          <th>Tax</th>
                          <th>Rec. Date</th>
                          <th>Rec. By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.invoiceLines.map((line, index) => (
                          <tr key={index}>
                            <td>{line.receiptId}</td>
                            <td>{line.poLineNo}</td>
                            <td>{line.itemName}</td>
                            <td>{line.category}</td>
                            <td>{line.qty}</td>
                            <td className="amount">{line.unitCost}</td>
                            <td>{line.ordUnit}</td>
                            <td className="amount">{line.price}</td>
                            <td>{line.taxRate}</td>
                            <td>{line.tax}</td>
                            <td>{line.recDate}</td>
                            <td>{line.recBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'payment-details' && (
                  <div className="payment-details">
                    <div className="payment-details-content">
                      {/* Bank Details Section */}
                      <div className="bank-details-section">
                        <h6 className="section-title">Bank Details</h6>
                        <div className="bank-details-grid">
                          <div className="bank-detail-item">
                            <label>Bank Name:</label>
                            <span>{invoiceData.bankDetails.bankName}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>Account No:</label>
                            <span>{invoiceData.bankDetails.accountNo}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>Account Type:</label>
                            <span>{invoiceData.bankDetails.accountType}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>Beneficiary Name:</label>
                            <span>{invoiceData.bankDetails.beneficiaryName}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>Bank Address:</label>
                            <span>{invoiceData.bankDetails.bankAddress}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>IBAN Number:</label>
                            <span className="empty-field">{invoiceData.bankDetails.ibanNumber || 'Not provided'}</span>
                          </div>
                          <div className="bank-detail-item">
                            <label>SWIFT Code:</label>
                            <span className="empty-field">{invoiceData.bankDetails.swiftCode || 'Not provided'}</span>
                            {invoiceData.bankDetails.isPrimary && (
                              <span className="primary-tag">Primary</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Payment Information Section */}
                      <div className="payment-information-section">
                        <h6 className="section-title">Payment Information</h6>
                        <div className="payment-form">
                          <div className="form-group">
                            <label htmlFor="paymentMethod">Payment Method*</label>
                            <select
                              id="paymentMethod"
                              value={paymentForm.paymentMethod}
                              onChange={(e) => handlePaymentFormChange('paymentMethod', e.target.value)}
                              className="form-select"
                            >
                              <option value="Cash">Cash</option>
                              <option value="Bank Transfer">Bank Transfer</option>
                              <option value="Check">Check</option>
                              <option value="Credit Card">Credit Card</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="paymentDescription">Payment Description*</label>
                            <textarea
                              id="paymentDescription"
                              value={paymentForm.paymentDescription}
                              onChange={(e) => handlePaymentFormChange('paymentDescription', e.target.value)}
                              className="form-textarea"
                              placeholder="Enter payment description..."
                              rows="3"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="paymentDate">Payment Date*</label>
                            <div className="date-input-container">
                              <input
                                type="date"
                                id="paymentDate"
                                value={paymentForm.paymentDate}
                                onChange={(e) => handlePaymentFormChange('paymentDate', e.target.value)}
                                className="form-input"
                              />
                              <Icon icon="mdi:calendar" className="calendar-icon" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="totalInvoiceAmount">Total Invoice Amount*</label>
                            <input
                              type="number"
                              id="totalInvoiceAmount"
                              value={paymentForm.totalInvoiceAmount}
                              onChange={(e) => handlePaymentFormChange('totalInvoiceAmount', e.target.value)}
                              className="form-input"
                              step="0.01"
                              min="0"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="amountToBePaid">Amount To be Paid*</label>
                            <input
                              type="number"
                              id="amountToBePaid"
                              value={paymentForm.amountToBePaid}
                              onChange={(e) => handlePaymentFormChange('amountToBePaid', e.target.value)}
                              className="form-input"
                              step="0.01"
                              min="0"
                            />
                          </div>

                          <div className="form-actions">
                            <button 
                              type="button" 
                              className="btn btn-primary pay-button"
                              onClick={handlePay}
                            >
                              PAY
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
            
            <div className="documents-section">
              {invoiceData.documents.map((doc, index) => (
                <div key={index} className="document-item">
                  <div className="document-icon">
                    <Icon icon="mdi:file-pdf-box" />
                  </div>
                  <div className="document-info">
                    <span className="document-name">{doc.name}</span>
                    <span className="document-type">{doc.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="chat-button-container">
        <button className="btn btn-primary chat-button">
          <Icon icon="mdi:chat" />
          CHAT
        </button>
      </div>

      <style jsx>{`
        .procurement-invoice-view {
          padding: 20px;
          background-color: #f8f9fa;
          min-height: 100vh;
          position: relative;
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

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .invoice-info h6 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin: 0 0 10px 0;
        }

        .invoice-description {
          font-size: 16px;
          color: #666;
          margin: 0 0 15px 0;
        }

        .invoice-amount {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .amount-label {
          font-size: 16px;
          color: #666;
        }

        .amount-value {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .details-section {
          margin-bottom: 30px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
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

        .po-link {
          color: #007bff;
          cursor: pointer;
        }

        .po-link:hover {
          text-decoration: underline;
        }

        .supplier-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .supplier-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .supplier-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          color: #666;
          font-size: 14px;
        }

        .supplier-email {
          color: #007bff;
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

        .amount {
          font-weight: 600;
          color: #333;
        }

        .amount.available {
          color: #dc3545;
        }

        .approval-section {
          margin-top: 20px;
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
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 20px;
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

        .approval-date, .approval-action {
          font-size: 14px;
          color: #666;
        }

        .budget-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .budget-info h6, .available-amount h6 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 10px 0;
        }

        .budget-info p, .available-amount p {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .tabs-section {
          margin-bottom: 30px;
        }

        .tabs-header {
          display: flex;
          border-bottom: 2px solid #e9ecef;
          margin-bottom: 20px;
        }

        .tab-button {
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #666;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
        }

        .tab-button.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .tab-button:hover {
          color: #007bff;
        }

        .invoice-lines-table-container {
          overflow-x: auto;
          border: 1px solid #e9ecef;
          border-radius: 8px;
        }

        .invoice-lines-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
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
          padding: 15px 12px;
          border-bottom: 1px solid #f1f3f4;
          color: #333;
          font-size: 14px;
        }

        .invoice-lines-table tbody tr:hover {
          background: #f8f9fa;
        }

        .documents-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .document-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          border: 2px solid #ffc107;
          border-radius: 8px;
          background: white;
        }

        .document-icon {
          font-size: 24px;
          color: #dc3545;
        }

        .document-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .document-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .document-type {
          font-size: 12px;
          color: #666;
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

        .chat-button-container {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
        }

        .chat-button {
          padding: 15px 30px;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
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

        .status-badge.approved {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.paid {
          background: #e2e3f1;
          color: #6f42c1;
        }

        .status-badge.pending {
          background: #fff3cd;
          color: #856404;
        }

        .status-badge.draft {
          background: #cce5ff;
          color: #0066cc;
        }

        /* Payment Details Styles */
        .payment-details {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .payment-details-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .bank-details-section, .payment-information-section {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #e9ecef;
        }

        .bank-details-grid {
          display: grid;
          gap: 15px;
        }

        .bank-detail-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .bank-detail-item label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .bank-detail-item span {
          font-size: 16px;
          color: #333;
          padding: 8px 0;
        }

        .empty-field {
          color: #999;
          font-style: italic;
        }

        .primary-tag {
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          margin-top: 5px;
          width: fit-content;
        }

        .payment-form {
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

        .form-select, .form-input, .form-textarea {
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          font-size: 16px;
          color: #333;
          background: white;
          transition: border-color 0.2s ease;
        }

        .form-select:focus, .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .date-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .date-input-container .form-input {
          padding-right: 45px;
        }

        .calendar-icon {
          position: absolute;
          right: 15px;
          font-size: 20px;
          color: #666;
          pointer-events: none;
        }

        .form-actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }

        .pay-button {
          padding: 15px 40px;
          font-size: 16px;
          font-weight: 600;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .pay-button:hover {
          background: #0056b3;
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
          .procurement-invoice-view {
            padding: 10px;
          }

          .main-content {
            padding: 20px;
          }

          .details-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .approval-item {
            grid-template-columns: 1fr;
            gap: 10px;
            text-align: left;
          }

          .budget-section {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
          }

          .invoice-lines-table {
            font-size: 12px;
          }

          .invoice-lines-table th,
          .invoice-lines-table td {
            padding: 10px 8px;
          }

          .payment-details-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .bank-details-section, .payment-information-section {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementInvoiceViewLayer;
