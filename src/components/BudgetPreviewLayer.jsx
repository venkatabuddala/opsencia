import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  mockBudgets, 
  mockCostCenters, 
  mockApprovalHistory, 
  budgetStatusToBadge, 
  formatCurrency, 
  formatDate 
} from "../mock/procurementData";

const BudgetPreviewLayer = ({ budgetId }) => {
  const navigate = useNavigate();
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);
  
  // Find the budget by ID
  const budget = mockBudgets.find(b => b.id === budgetId) || mockBudgets[0];
  
  // Get cost centers for this budget
  const costCenters = mockCostCenters.filter(cc => cc.budgetId === budgetId);
  
  // Get approval history for this budget
  const approvalHistory = mockApprovalHistory.filter(ah => ah.budgetId === budgetId);
  
  // Calculate consumed and available amounts
  const consumedAmount = 0; // In real app, this would be calculated from actual spending
  const availableAmount = budget.totalAmount - consumedAmount;

  const handleBack = () => {
    navigate('/procurement/budgets');
  };

  const handleApprove = () => {
    // In real app, this would make an API call
    console.log('Approving budget:', budgetId);
  };

  const handleAddDocuments = () => {
    // In real app, this would open a document upload modal
    console.log('Adding documents for budget:', budgetId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-success-main';
      case 'Pending': return 'bg-warning-main';
      case 'Rejected': return 'bg-danger-main';
      default: return 'bg-info-main';
    }
  };

  return (
    <div className="budget-preview">
      {/* Header with Back Button */}
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary me-3"
          onClick={handleBack}
        >
          <Icon icon="ri-arrow-left-line" className="me-2" />
          Back
        </button>
 
      </div>

      {/* Main Budget Card */}
      <div className="card">
        <div className="card-body p-4">
          {/* Budget Header */}
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="w-60-px h-60-px bg-primary rounded d-flex align-items-center justify-content-center">
                    <Icon icon="ri-building-line" className="text-white text-2xl" />
                  </div>
                  <small className="text-muted d-block text-center mt-1">COMPANY</small>
                </div>
                <div>
                  <h6 className="mb-1">Budget for {budget.businessEntity}</h6>
                  <p className="text-muted mb-0">{budget.description}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="mb-2">
                <h6 className="mb-0 fw-bold text-primary">
                  Total Amount: {formatCurrency(budget.totalAmount, budget.currency)}
                </h6>
              </div>
              <span className={`badge ${budgetStatusToBadge(budget.status)} fs-6`}>
                {budget.status}
              </span>
            </div>
          </div>

          {/* Budget Details Grid */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-user-line" className="text-primary me-2" />
                <div>
                  <small className="text-muted d-block">Budget Owner</small>
                  <span className="fw-medium">{budget.owner}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-calendar-line" className="text-primary me-2" />
                <div>
                  <small className="text-muted d-block">Period</small>
                  <span className="fw-medium">Annually</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-calendar-check-line" className="text-primary me-2" />
                <div>
                  <small className="text-muted d-block">Start Date</small>
                  <span className="fw-medium">{formatDate(budget.startDate)}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-calendar-close-line" className="text-primary me-2" />
                <div>
                  <small className="text-muted d-block">End Date</small>
                  <span className="fw-medium">{formatDate(budget.endDate)}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-money-dollar-circle-line" className="text-danger me-2" />
                <div>
                  <small className="text-muted d-block">Consumed Amount</small>
                  <span className="fw-medium text-danger">
                    {formatCurrency(consumedAmount, budget.currency)}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="d-flex align-items-center">
                <Icon icon="ri-wallet-3-line" className="text-success me-2" />
                <div>
                  <small className="text-muted d-block">Available Amount</small>
                  <span className="fw-medium text-success">
                    {formatCurrency(availableAmount, budget.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Approval History Section */}
          <div className="mb-4">
            <div 
              className="d-flex align-items-center justify-content-between cursor-pointer"
              onClick={() => setShowApprovalHistory(!showApprovalHistory)}
              style={{ cursor: 'pointer' }}
            >
              <h6 className="mb-0">Approval History</h6>
              <Icon 
                icon={showApprovalHistory ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} 
                className="text-muted"
              />
            </div>
            
            {showApprovalHistory && (
              <div className="mt-3">
                {approvalHistory.map((approval, index) => (
                  <div key={approval.id} className="d-flex align-items-center mb-3">
                    <div className="w-40-px h-40-px bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                      <Icon icon="ri-user-line" className="text-primary" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-medium">{approval.approver}</span>
                        <span className={`badge ${getStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                      </div>
                      <small className="text-muted">{approval.comments}</small>
                      <div className="text-muted small">{formatDate(approval.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-3">
            <div className="dropdown">
              <button 
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <Icon icon="ri-check-line" className="me-2" />
                APPROVE
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#" onClick={handleApprove}>Approve Budget</a></li>
                <li><a className="dropdown-item" href="#">Approve with Conditions</a></li>
                <li><a className="dropdown-item" href="#">Request Changes</a></li>
              </ul>
            </div>
            <button 
              className="btn btn-outline-primary"
              onClick={handleAddDocuments}
            >
              <Icon icon="ri-add-line" className="me-2" />
              ADD DOCUMENTS
            </button>
          </div>
        </div>
      </div>

      {/* Cost Centre Details */}
      <div className="card mt-4">
        <div className="card-header text-white" style={{ background: 'linear-gradient(135deg, #090f7c 0%, #e40580 100%)' }}>
          <h6 className="mb-0 text-white">Cost Centre Details</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="border-0">Cost Centre</th>
                  <th className="border-0">Department</th>
                  <th className="border-0">Location</th>
                  <th className="border-0 text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {costCenters.length > 0 ? (
                  costCenters.map((costCenter) => (
                    <tr key={costCenter.id}>
                      <td className="fw-medium">{costCenter.costCentre}</td>
                      <td>{costCenter.department}</td>
                      <td>{costCenter.location}</td>
                      <td className="text-end fw-semibold">
                        {formatCurrency(costCenter.amount, costCenter.currency)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No cost centers assigned to this budget
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPreviewLayer;

