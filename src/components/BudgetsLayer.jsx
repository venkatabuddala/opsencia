import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockBudgets, mockBusinessEntities, mockBudgetOwners, budgetStatusToBadge, formatCurrency, formatDate } from "../mock/procurementData";
import CreateBudgetModal from "./CreateBudgetModal";

const BudgetsLayer = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filteredBudgets, setFilteredBudgets] = useState(mockBudgets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter budgets based on search and status
  const handleFilter = () => {
    let filtered = mockBudgets;

    if (searchTerm) {
      filtered = filtered.filter(budget => 
        budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        budget.owner.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(budget => budget.status === statusFilter);
    }

    setFilteredBudgets(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredBudgets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBudgets = filteredBudgets.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleCreateBudget = (budgetData) => {
    // In a real app, this would make an API call
    console.log('Creating budget:', budgetData);
    setShowCreateModal(false);
    // Refresh the list
    handleFilter();
  };

  const handleBudgetClick = (budgetId) => {
    navigate(`/procurement/budgets/${budgetId}/preview`);
  };

  return (
    <>
      <div className="card">
        <div className="card-header border-bottom-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h6 className="mb-2">Budgets</h6>
              <p className="text-secondary-light mb-0">
                Define and manage all budgets w.r.t locations and departments!
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0 fw-medium">Year *</label>
                <select 
                  className="form-select form-select-sm" 
                  style={{ width: '120px' }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <button 
                className="btn btn-primary d-flex align-items-center gap-2"
                onClick={() => setShowCreateModal(true)}
              >
                <Icon icon="ri-add-line" />
                CREATE NEW
              </button>
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <Icon icon="ri-more-2-line" />
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#"><Icon icon="ri-download-line" className="me-2" />Export</a></li>
                  <li><a className="dropdown-item" href="#"><Icon icon="ri-upload-line" className="me-2" />Import</a></li>
                  <li><a className="dropdown-item" href="#"><Icon icon="ri-settings-3-line" className="me-2" />Settings</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <Icon icon="ri-search-line" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search budgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-primary w-100"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
            <div className="col-md-3 text-end">
              <button 
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setFilteredBudgets(mockBudgets);
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Budgets Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Id
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Name
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Status
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Owner
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Business Entity
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Creation Date
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      Start Date
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>
                    <div className="d-flex align-items-center gap-2">
                      End Date
                      <Icon icon="ri-filter-line" className="text-muted" />
                    </div>
                  </th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBudgets.map((budget) => (
                  <tr key={budget.id}>
                    <td>
                      <span 
                        className="fw-semibold text-primary cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleBudgetClick(budget.id)}
                      >
                        {budget.id}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div className="fw-medium">{budget.name}</div>
                        <small className="text-muted">{budget.description}</small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${budgetStatusToBadge(budget.status)}`}>
                        {budget.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="w-8-px h-8-px bg-primary rounded-circle"></div>
                        <span>{budget.owner}</span>
                      </div>
                    </td>
                    <td>{budget.businessEntity}</td>
                    <td>{formatDate(budget.creationDate)}</td>
                    <td>{formatDate(budget.startDate)}</td>
                    <td>{formatDate(budget.endDate)}</td>
                    <td>
                      <span className="fw-semibold">
                        {formatCurrency(budget.totalAmount, budget.currency)}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button 
                          className="btn btn-sm btn-outline-secondary" 
                          type="button" 
                          data-bs-toggle="dropdown"
                        >
                          <Icon icon="ri-more-2-line" />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a 
                              className="dropdown-item" 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleBudgetClick(budget.id);
                              }}
                            >
                              <Icon icon="ri-eye-line" className="me-2" />View
                            </a>
                          </li>
                          <li><a className="dropdown-item" href="#"><Icon icon="ri-edit-line" className="me-2" />Edit</a></li>
                          <li><a className="dropdown-item" href="#"><Icon icon="ri-copy-line" className="me-2" />Duplicate</a></li>
                          <li><hr className="dropdown-divider" /></li>
                          <li><a className="dropdown-item text-danger" href="#"><Icon icon="ri-delete-bin-line" className="me-2" />Delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">Show</span>
              <select 
                className="form-select form-select-sm" 
                style={{ width: '80px' }}
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-muted">entries</span>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted">
                {startIndex + 1}-{Math.min(endIndex, filteredBudgets.length)} of {filteredBudgets.length}
              </span>
              
              <div className="btn-group" role="group">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <Icon icon="ri-skip-back-line" />
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icon icon="ri-arrow-left-s-line" />
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <Icon icon="ri-arrow-right-s-line" />
                </button>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <Icon icon="ri-skip-forward-line" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Budget Modal */}
      <CreateBudgetModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={handleCreateBudget}
        businessEntities={mockBusinessEntities}
        budgetOwners={mockBudgetOwners}
      />
    </>
  );
};

export default BudgetsLayer;
