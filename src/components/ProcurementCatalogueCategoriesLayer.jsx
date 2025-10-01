import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ProcurementCatalogueCategoriesLayer = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Mock data for categories
  const categories = [
    {
      id: 'CTC250008',
      name: 'Packaging for desserts',
      parentCategory: 'Packaging services',
      description: 'Desserts packaging',
      status: true
    },
    {
      id: 'CTC250007',
      name: 'Chocolate Decorative',
      parentCategory: 'NA',
      description: 'Chocolate Decoratives',
      status: true
    },
    {
      id: '359096199',
      name: '1-phase',
      parentCategory: 'Snacking',
      description: 'coverings',
      status: true
    },
    {
      id: '359096198',
      name: '2-phase',
      parentCategory: 'Smart meters',
      description: '2-phase meters',
      status: true
    },
    {
      id: '359096197',
      name: '3-phase',
      parentCategory: 'Smart meters',
      description: '3-phase meters',
      status: true
    },
    {
      id: '359096196',
      name: 'Single phase',
      parentCategory: 'Smart meters',
      description: 'Single phase meters',
      status: true
    },
    {
      id: '359096195',
      name: 'Multi phase',
      parentCategory: 'Smart meters',
      description: 'Multi phase meters',
      status: true
    },
    {
      id: '359096194',
      name: 'Digital meters',
      parentCategory: 'Smart meters',
      description: 'Digital smart meters',
      status: true
    },
    {
      id: '359096193',
      name: 'Analog meters',
      parentCategory: 'Smart meters',
      description: 'Analog meters',
      status: true
    },
    {
      id: '359096192',
      name: 'Smart meters',
      parentCategory: 'NA',
      description: 'Smart electricity meters',
      status: true
    }
  ];

  return (
    <div className="procurement-catalogue-categories">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h6 className="page-title">Products and Services Categories</h6>
          <p className="page-description">Define and maintain all Products/Services categories!</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddCategoryModal(true)}
          >
            <Icon icon="mdi:plus" className="mr-2" />
            ADD NEW
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Status</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Category Id</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Category Name</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Parent Category Name</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <div className="header-content">
                    <span>Description</span>
                    <Icon icon="mdi:filter-variant" className="filter-icon" />
                  </div>
                </th>
                <th className="table-header-cell">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="table-row">
                  <td className="status-cell">
                    <div className="toggle-switch">
                      <input 
                        type="checkbox" 
                        id={`toggle-${category.id}`}
                        checked={category.status}
                        onChange={() => {}}
                        className="toggle-input"
                      />
                      <label htmlFor={`toggle-${category.id}`} className="toggle-label"></label>
                    </div>
                  </td>
                  <td className="category-id">{category.id}</td>
                  <td className="category-name">{category.name}</td>
                  <td className="parent-category">{category.parentCategory}</td>
                  <td className="description">{category.description}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button className="action-btn edit-btn" title="Edit">
                        <Icon icon="mdi:pencil" />
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
                        <Icon icon="mdi:delete" />
                      </button>
                    </div>
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
            <span className="pagination-text">1-10 of 164</span>
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

      {/* Add Sub Category Modal */}
      {showAddCategoryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Add New Sub Category</h6>
              <button 
                className="modal-close"
                onClick={() => setShowAddCategoryModal(false)}
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            
            <div className="modal-body">
              <p className="mandatory-note">*Indicates mandatory fields.</p>
              
              <div className="form-section">
                <div className="form-group">
                  <label>Type *</label>
                  <select className="form-select">
                    <option>Sub Category</option>
                    <option>Main Category</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select className="form-select">
                    <option>Select Category</option>
                    <option>Smart meters</option>
                    <option>Packaging services</option>
                    <option>Snacking</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Sub Category Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter sub category name" 
                  />
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Enter description" 
                    rows="3"
                  ></textarea>
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

      <style jsx>{`
        .procurement-catalogue-categories {
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

        .table-row {
          border-bottom: 1px solid #e9ecef;
        }

        .table-row:nth-child(even) {
          background: #f8f9fa;
        }

        .table-row:hover {
          background: #e3f2fd;
        }

        .status-cell {
          padding: 16px 12px;
          text-align: center;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .toggle-input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-label {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }

        .toggle-label:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        .toggle-input:checked + .toggle-label {
          background-color: #28a745;
        }

        .toggle-input:checked + .toggle-label:before {
          transform: translateX(26px);
        }

        .category-id, .category-name, .parent-category, .description {
          padding: 16px 12px;
          color: #495057;
        }

        .actions-cell {
          padding: 16px 12px;
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #ffc107;
          color: #212529;
        }

        .edit-btn:hover {
          background: #e0a800;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:hover {
          background: #c82333;
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
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e9ecef;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
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

        .form-section {
          display: flex;
          flex-direction: column;
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

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .procurement-catalogue-categories {
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

          .modal-content {
            width: 95%;
            margin: 20px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProcurementCatalogueCategoriesLayer;


