import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementImportExcelModal = ({ isOpen, onClose, onImportLines }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Simulate parsing Excel file and generating preview data
      generatePreviewData(file);
    }
  };

  const generatePreviewData = (file) => {
    // Mock data for preview - in real implementation, this would parse the Excel file
    const mockData = [
      {
        id: 1,
        errorMsg: '',
        no: 1,
        itemType: 'Product',
        category: 'Computer Hardware',
        item: 'Laptop Computer',
        deliveryDate: '2025-08-15',
        orderQty: '5',
        orderUnit: 'Pieces',
        unitCost: '1000.00',
        taxRateCode: 'VAT - 5%'
      },
      {
        id: 2,
        errorMsg: 'Invalid item type',
        no: 2,
        itemType: 'Invalid',
        category: 'Office Supplies',
        item: 'Office Chair',
        deliveryDate: '2025-08-20',
        orderQty: '10',
        orderUnit: 'Pieces',
        unitCost: '150.00',
        taxRateCode: 'VAT - 5%'
      },
      {
        id: 3,
        errorMsg: '',
        no: 3,
        itemType: 'Service',
        category: 'IT Services',
        item: 'Consulting Hours',
        deliveryDate: '2025-08-25',
        orderQty: '20',
        orderUnit: 'Hours',
        unitCost: '75.00',
        taxRateCode: 'VAT - 10%'
      }
    ];
    setPreviewData(mockData);
  };

  const handleDownloadTemplate = () => {
    // Create a simple CSV template
    const templateData = [
      ['Item Type', 'Category', 'Item', 'Delivery Date', 'Order Qty', 'Order Unit', 'Unit Cost', 'Tax Rate Code'],
      ['Product', 'Computer Hardware', 'Laptop Computer', '2025-08-15', '5', 'Pieces', '1000.00', 'VAT - 5%'],
      ['Service', 'IT Services', 'Consulting Hours', '2025-08-20', '10', 'Hours', '75.00', 'VAT - 10%']
    ];

    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice_lines_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    // Filter out rows with errors
    const validData = previewData.filter(row => !row.errorMsg);
    
    if (validData.length === 0) {
      alert('No valid data found. Please check for errors and try again.');
      return;
    }

    // Convert to the format expected by the parent component
    const formattedLines = validData.map(row => ({
      id: Date.now() + Math.random(),
      item: row.item,
      category: row.category,
      deliveryDate: row.deliveryDate,
      orderQty: row.orderQty,
      orderUnit: row.orderUnit,
      unitCost: row.unitCost,
      lineCost: (parseFloat(row.orderQty) * parseFloat(row.unitCost)).toFixed(2),
      taxRateCode: row.taxRateCode,
      taxAmount: ((parseFloat(row.orderQty) * parseFloat(row.unitCost)) * 0.05).toFixed(2)
    }));

    onImportLines(formattedLines);
    onClose();
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewData([]);
    onClose();
  };

  // Pagination logic
  const totalPages = Math.ceil(previewData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = previewData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="header-left">
            <Icon icon="mdi:information" className="info-icon" />
            <h6>Import Excel</h6>
          </div>
          <button className="close-button" onClick={handleCancel}>
            <Icon icon="mdi:close" />
          </button>
        </div>

        <div className="modal-body">
          <div className="instructions-section">
            <div className="instruction-item">
              <span className="step-number">1.</span>
              <span>Download a template</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">2.</span>
              <span>Open the downloaded file and fill in template.</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">3.</span>
              <span>Note: You can add or update a maximum of 500 rows for upload.</span>
            </div>
            <div className="instruction-item">
              <span className="step-number">4.</span>
              <span>Select the updated file to import.</span>
            </div>
          </div>

          <div className="file-upload-section">
            <div className="file-input-container">
              <input
                type="file"
                id="excelFile"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="file-input"
              />
              <label htmlFor="excelFile" className="file-input-label">
                {selectedFile ? selectedFile.name : 'No File Chosen'}
              </label>
              <button 
                type="button" 
                className="btn btn-primary upload-btn"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                UPLOAD
              </button>
            </div>
            
            <button 
              type="button" 
              className="btn btn-primary download-btn"
              onClick={handleDownloadTemplate}
            >
              DOWNLOAD TEMPLATE
            </button>
          </div>

          <div className="preview-section">
            <h6>Preview Lines</h6>
            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Error Msg</th>
                    <th>No</th>
                    <th>Item Type</th>
                    <th>Category</th>
                    <th className="highlighted">Item</th>
                    <th>Delivery Date</th>
                    <th>Order Qty</th>
                    <th>Order Unit</th>
                    <th>Unit Cost</th>
                    <th>Tax Rate Code</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="no-records">
                        No records to display
                      </td>
                    </tr>
                  ) : (
                    currentData.map((row) => (
                      <tr key={row.id} className={row.errorMsg ? 'error-row' : ''}>
                        <td className="error-cell">
                          {row.errorMsg && (
                            <span className="error-message">{row.errorMsg}</span>
                          )}
                        </td>
                        <td>{row.no}</td>
                        <td>{row.itemType}</td>
                        <td>{row.category}</td>
                        <td className="highlighted">{row.item}</td>
                        <td>{row.deliveryDate}</td>
                        <td>{row.orderQty}</td>
                        <td>{row.orderUnit}</td>
                        <td>{row.unitCost}</td>
                        <td>{row.taxRateCode}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {previewData.length > 0 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  <span>10 rows</span>
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <Icon icon="mdi:chevron-left" />
                  </button>
                  <span className="pagination-text">
                    {startIndex + 1}-{Math.min(endIndex, previewData.length)} of {previewData.length}
                  </span>
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <Icon icon="mdi:chevron-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
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
          max-width: 1000px;
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

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .info-icon {
          font-size: 20px;
          color: #007bff;
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

        .instructions-section {
          margin-bottom: 30px;
        }

        .instruction-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
          font-size: 14px;
          color: #333;
        }

        .step-number {
          font-weight: 600;
          color: #007bff;
          min-width: 20px;
        }

        .file-upload-section {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .file-input-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .file-input {
          display: none;
        }

        .file-input-label {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 16px;
          color: #666;
          transition: border-color 0.2s ease;
        }

        .file-input-label:hover {
          border-color: #007bff;
        }

        .upload-btn {
          padding: 12px 24px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .upload-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .upload-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        .download-btn {
          padding: 12px 24px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s ease;
          width: fit-content;
        }

        .download-btn:hover {
          background: #0056b3;
        }

        .preview-section h6 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 20px 0;
        }

        .preview-table-container {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .preview-table {
          width: 100%;
          border-collapse: collapse;
        }

        .preview-table th {
          background: #f8f9fa;
          padding: 15px 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
          font-size: 14px;
          border-bottom: 1px solid #e9ecef;
        }

        .preview-table th.highlighted {
          background: #fff3cd;
          position: relative;
        }

        .preview-table th.highlighted::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 5px;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #ffc107;
          border-radius: 50%;
        }

        .preview-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f3f4;
          font-size: 14px;
          color: #333;
        }

        .preview-table td.highlighted {
          background: #fff3cd;
        }

        .error-row {
          background: #f8d7da;
        }

        .error-cell {
          color: #dc3545;
        }

        .error-message {
          font-size: 12px;
          color: #dc3545;
        }

        .no-records {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 40px;
        }

        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
        }

        .pagination-info {
          font-size: 14px;
          color: #666;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .pagination-btn {
          background: none;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-text {
          font-size: 14px;
          color: #333;
        }

        @media (max-width: 768px) {
          .modal-container {
            width: 95%;
            margin: 20px;
          }

          .modal-header, .modal-body {
            padding: 20px;
          }

          .file-input-container {
            flex-direction: column;
            align-items: stretch;
          }

          .preview-table {
            font-size: 12px;
          }

          .preview-table th,
          .preview-table td {
            padding: 8px 6px;
          }

          .pagination-container {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementImportExcelModal;


