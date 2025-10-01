import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementAddInvoiceLinesModal = ({ isOpen, onClose, onAddLines }) => {
  const [invoiceLines, setInvoiceLines] = useState([
    {
      id: 1,
      itemType: '',
      category: '',
      itemName: '',
      orderQuantity: '',
      uom: '',
      unitCost: '',
      deliveryDate: '',
      taxRate: 'VAT - 5%'
    },
    {
      id: 2,
      itemType: '',
      category: '',
      itemName: '',
      orderQuantity: '',
      uom: '',
      unitCost: '',
      deliveryDate: '',
      taxRate: 'VAT - 5%'
    }
  ]);

  // Mock data for dropdowns
  const itemTypes = [
    'Product',
    'Service',
    'Equipment',
    'Software',
    'Consulting'
  ];

  const categories = [
    'Computer Hardware',
    'Office Supplies',
    'IT Services',
    'Marketing',
    'Consulting Services',
    'Equipment Rental'
  ];

  const itemNames = [
    'Laptop Computer',
    'Desktop Computer',
    'Office Chair',
    'Printer',
    'Software License',
    'Consulting Hours'
  ];

  const uomOptions = [
    'Pieces',
    'Box',
    'Hours',
    'Days',
    'Months',
    'Units',
    'Kilograms',
    'Liters'
  ];

  const taxRates = [
    'VAT - 5%',
    'VAT - 10%',
    'VAT - 15%',
    'No Tax',
    'GST - 5%',
    'GST - 10%',
    'GST - 15%'
  ];

  const handleInputChange = (lineId, field, value) => {
    setInvoiceLines(prev => prev.map(line => {
      if (line.id === lineId) {
        return { ...line, [field]: value };
      }
      return line;
    }));
  };

  const addNewLine = () => {
    const newLine = {
      id: Date.now(),
      itemType: '',
      category: '',
      itemName: '',
      orderQuantity: '',
      uom: '',
      unitCost: '',
      deliveryDate: '',
      taxRate: 'VAT - 5%'
    };
    setInvoiceLines(prev => [...prev, newLine]);
  };

  const removeLine = (lineId) => {
    if (invoiceLines.length > 1) {
      setInvoiceLines(prev => prev.filter(line => line.id !== lineId));
    }
  };

  const handleAdd = () => {
    // Filter out empty lines and validate required fields
    const validLines = invoiceLines.filter(line => 
      line.itemType && line.category && line.itemName && 
      line.orderQuantity && line.uom && line.unitCost && line.deliveryDate
    );

    if (validLines.length === 0) {
      alert('Please fill in at least one complete invoice line');
      return;
    }

    // Convert to the format expected by the parent component
    const formattedLines = validLines.map(line => ({
      id: Date.now() + Math.random(), // Generate unique ID
      item: line.itemName,
      category: line.category,
      deliveryDate: line.deliveryDate,
      orderQty: line.orderQuantity,
      orderUnit: line.uom,
      unitCost: line.unitCost,
      lineCost: (parseFloat(line.orderQuantity) * parseFloat(line.unitCost)).toFixed(2),
      taxRateCode: line.taxRate,
      taxAmount: ((parseFloat(line.orderQuantity) * parseFloat(line.unitCost)) * 0.05).toFixed(2) // 5% tax calculation
    }));

    onAddLines(formattedLines);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h6>Add Invoice Lines</h6>
          <button className="close-button" onClick={handleCancel}>
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="modal-body">
          <p className="mandatory-note">*Indicates mandatory fields.</p>

          <div className="invoice-lines-form">
            {invoiceLines.map((line, index) => (
              <div key={line.id} className="line-item">
                <div className="line-header">
                  <h6>Line Item {index + 1}</h6>
                  {invoiceLines.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-line-btn"
                      onClick={() => removeLine(line.id)}
                    >
                      <Icon icon="mdi:delete" />
                    </button>
                  )}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor={`itemType-${line.id}`}>Item Type*</label>
                    <select
                      id={`itemType-${line.id}`}
                      value={line.itemType}
                      onChange={(e) => handleInputChange(line.id, 'itemType', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Item Type</option>
                      {itemTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`category-${line.id}`}>Category*</label>
                    <select
                      id={`category-${line.id}`}
                      value={line.category}
                      onChange={(e) => handleInputChange(line.id, 'category', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`itemName-${line.id}`}>Item Name*</label>
                    <select
                      id={`itemName-${line.id}`}
                      value={line.itemName}
                      onChange={(e) => handleInputChange(line.id, 'itemName', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select Item</option>
                      {itemNames.map((item, idx) => (
                        <option key={idx} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`orderQuantity-${line.id}`}>Order Quantity*</label>
                    <input
                      type="number"
                      id={`orderQuantity-${line.id}`}
                      value={line.orderQuantity}
                      onChange={(e) => handleInputChange(line.id, 'orderQuantity', e.target.value)}
                      className="form-input"
                      step="0.01"
                      min="0"
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`uom-${line.id}`}>UOM*</label>
                    <select
                      id={`uom-${line.id}`}
                      value={line.uom}
                      onChange={(e) => handleInputChange(line.id, 'uom', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select UOM</option>
                      {uomOptions.map((uom, idx) => (
                        <option key={idx} value={uom}>{uom}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`unitCost-${line.id}`}>Unit Cost*</label>
                    <input
                      type="number"
                      id={`unitCost-${line.id}`}
                      value={line.unitCost}
                      onChange={(e) => handleInputChange(line.id, 'unitCost', e.target.value)}
                      className="form-input"
                      step="0.01"
                      min="0"
                      placeholder="Enter unit cost"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`deliveryDate-${line.id}`}>Delivery Date*</label>
                    <div className="date-input-container">
                      <input
                        type="date"
                        id={`deliveryDate-${line.id}`}
                        value={line.deliveryDate}
                        onChange={(e) => handleInputChange(line.id, 'deliveryDate', e.target.value)}
                        className="form-input"
                      />
                      <Icon icon="mdi:calendar" className="calendar-icon" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`taxRate-${line.id}`}>Tax Rate</label>
                    <select
                      id={`taxRate-${line.id}`}
                      value={line.taxRate}
                      onChange={(e) => handleInputChange(line.id, 'taxRate', e.target.value)}
                      className="form-select"
                    >
                      {taxRates.map((rate, idx) => (
                        <option key={idx} value={rate}>{rate}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="add-line-section">
              <button 
                type="button" 
                className="btn btn-outline add-line-btn"
                onClick={addNewLine}
              >
                <Icon icon="mdi:plus" />
                Add Another Line
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
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
            onClick={handleAdd}
          >
            ADD
            <Icon icon="mdi:brain" className="brain-icon" />
          </button>
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
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-container {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .modal-header h6 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          color: #666;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .close-button:hover {
          background: #e9ecef;
        }

        .modal-body {
          padding: 30px;
          overflow-y: auto;
          flex: 1;
        }

        .mandatory-note {
          font-size: 14px;
          color: #666;
          margin: 0 0 20px 0;
          font-style: italic;
        }

        .invoice-lines-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .line-item {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          background: #f8f9fa;
        }

        .line-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .line-header h6 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .remove-line-btn {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .remove-line-btn:hover {
          background: #c82333;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
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

        .form-input, .form-select {
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          font-size: 16px;
          color: #333;
          background: white;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #007bff;
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

        .add-line-section {
          display: flex;
          justify-content: center;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }

        .add-line-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 2px solid #007bff;
          background: white;
          color: #007bff;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .add-line-btn:hover {
          background: #007bff;
          color: white;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          padding: 20px 30px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
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

        .brain-icon {
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .modal-container {
            width: 95%;
            margin: 20px;
          }

          .modal-header, .modal-body, .modal-footer {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .line-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }

          .modal-footer {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementAddInvoiceLinesModal;


