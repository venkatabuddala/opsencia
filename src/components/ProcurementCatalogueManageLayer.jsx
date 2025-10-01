import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementCatalogueManageLayer = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showImportExcelModal, setShowImportExcelModal] = useState(false);

  return (
    <div className="procurement-catalogue-manage">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Products and Services</h6>
          <p className="page-description">Define and maintain all products from various suppliers!</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddProductModal(true)}
          >
            <Icon icon="mdi:plus" className="mr-2" />
            ADD PRODUCT
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowImportExcelModal(true)}
          >
            <Icon icon="mdi:file-excel" className="mr-2" />
            IMPORT EXCEL
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Id</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Item Name</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>UOM</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Price</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Tax</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Ava. Qty</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Category</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Supplier</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="no-records">
                <td colSpan="8">
                  <div className="no-records-content">
                    <Icon icon="mdi:database-off" className="no-records-icon" />
                    <span>No records to display</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="pagination-section">
          <div className="pagination-info">
            <span>10 rows</span>
          </div>
          <div className="pagination-controls">
            <span className="pagination-text">0-0 of 0</span>
            <div className="pagination-buttons">
              <button className="pagination-btn">
                <Icon icon="mdi:page-first" />
              </button>
              <button className="pagination-btn">
                <Icon icon="mdi:chevron-left" />
              </button>
              <button className="pagination-btn">
                <Icon icon="mdi:chevron-right" />
              </button>
              <button className="pagination-btn">
                <Icon icon="mdi:page-last" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h6 className="modal-title">
                <Icon icon="mdi:information" className="info-icon" />
                  Add New Product
                </h6>
              <button 
                className="modal-close"
                onClick={() => setShowAddProductModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="mandatory-note">*Indicates mandatory fields.</p>
              
              <div className="form-sections">
                <div className="form-section">
                  <h6>Product Information</h6>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Category *</label>
                      <select className="form-select">
                        <option>Select Category</option>
                        <option>IT Hardware</option>
                        <option>Software</option>
                        <option>Office Supplies</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Supplier *</label>
                      <select className="form-select">
                        <option>Select Supplier</option>
                        <option>TechCorp Solutions</option>
                        <option>DataFlow Inc</option>
                        <option>WebServ Technologies</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Item Name *</label>
                      <input type="text" className="form-input" placeholder="Enter item name" />
                    </div>
                    <div className="form-group">
                      <label>Features</label>
                      <textarea className="form-textarea" placeholder="Enter product features" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                      <label>Item Type *</label>
                      <select className="form-select">
                        <option>Select Item Type</option>
                        <option>Product</option>
                        <option>Service</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>UOM *</label>
                      <select className="form-select">
                        <option>Select UOM</option>
                        <option>Pieces</option>
                        <option>Kilograms</option>
                        <option>Liters</option>
                        <option>Meters</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Stock Qty Available with Supplier</label>
                      <input type="number" className="form-input" placeholder="Enter quantity" />
                    </div>
                    <div className="form-group">
                      <label>Unit Price *</label>
                      <input type="number" className="form-input" placeholder="Enter unit price" />
                    </div>
                    <div className="form-group">
                      <label>Currency *</label>
                      <select className="form-select">
                        <option>United States dollar</option>
                        <option>Euro</option>
                        <option>British Pound</option>
                        <option>Indian Rupee</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tax Rate</label>
                      <select className="form-select">
                        <option>VAT - 5%</option>
                        <option>GST - 18%</option>
                        <option>No Tax</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h6>Upload Product Image</h6>
                  <p className="section-description">Click on image to upload a relevant image for the product!</p>
                  <div className="image-upload-area">
                    <Icon icon="mdi:image-plus" className="upload-icon" />
                    <span>Click to upload image</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary">CANCEL</button>
              <button className="btn btn-primary">ADD</button>
            </div>
          </div>
        </div>
      )}

      {/* Import Excel Modal */}
      {showImportExcelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
                <h6 className="modal-title">Import Excel</h6>
              <button 
                className="modal-close"
                onClick={() => setShowImportExcelModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="import-instructions">
                <h6>Instructions:</h6>
                <ol>
                  <li>Download a template</li>
                  <li>Open the downloaded file and fill in template.</li>
                  <li>Note: You can add or update a maximum of 500 rows for upload.</li>
                  <li>Select the updated file to import.</li>
                </ol>
              </div>
              
              <div className="file-upload-section">
                <input type="file" className="file-input" accept=".xlsx,.xls" />
                <div className="upload-buttons">
                  <button className="btn btn-primary">UPLOAD</button>
                  <button className="btn btn-secondary">DOWNLOAD TEMPLATE</button>
                </div>
              </div>
              
              <div className="preview-section">
                <h6>Preview Lines</h6>
                <div className="preview-table">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Error Msg</th>
                        <th>Item Type</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>UOM</th>
                        <th>Price</th>
                        <th>Tax</th>
                        <th>Ava. Qty</th>
                        <th>Supplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="no-records">
                        <td colSpan="9">
                          <div className="no-records-content">
                            <span>No records to display</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Preview Pagination */}
                <div className="preview-pagination">
                  <div className="pagination-info">
                    <span>10 rows</span>
                  </div>
                  <div className="pagination-controls">
                    <span className="pagination-text">0-0 of 0</span>
                    <div className="pagination-buttons">
                      <button className="pagination-btn">
                        <Icon icon="mdi:page-first" />
                      </button>
                      <button className="pagination-btn">
                        <Icon icon="mdi:chevron-left" />
                      </button>
                      <button className="pagination-btn">
                        <Icon icon="mdi:chevron-right" />
                      </button>
                      <button className="pagination-btn">
                        <Icon icon="mdi:page-last" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary">CANCEL</button>
              <button className="btn btn-primary">PROCEED</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .procurement-catalogue-manage {
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
          font-size: 14px;
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

        .no-records {
          text-align: center;
        }

        .no-records-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 40px;
          color: #6c757d;
        }

        .no-records-icon {
          font-size: 48px;
          color: #dee2e6;
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
          max-width: 900px;
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

        .form-input, .form-select, .form-textarea {
          padding: 10px 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: #007bff;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .section-description {
          font-size: 14px;
          color: #6c757d;
          margin: 0 0 20px 0;
        }

        .image-upload-area {
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          background: #f8f9fa;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .image-upload-area:hover {
          border-color: #007bff;
          background: #e3f2fd;
        }

        .upload-icon {
          font-size: 48px;
          color: #6c757d;
          margin-bottom: 12px;
        }

        .import-instructions {
          margin-bottom: 24px;
        }

        .import-instructions h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .import-instructions ol {
          margin: 0;
          padding-left: 20px;
        }

        .import-instructions li {
          margin-bottom: 8px;
          color: #495057;
        }

        .file-upload-section {
          margin-bottom: 24px;
        }

        .file-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          margin-bottom: 16px;
        }

        .upload-buttons {
          display: flex;
          gap: 12px;
        }

        .preview-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .preview-table {
          margin-bottom: 20px;
        }

        .preview-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-top: 1px solid #e9ecef;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .procurement-catalogue-manage {
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

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            width: 95%;
            margin: 20px;
          }

          .upload-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementCatalogueManageLayer;


