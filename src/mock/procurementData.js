// Centralized mock data for Procurement lists

export const mockSuppliers = [
  { 
    id: '363554056', 
    name: 'Infra Solt Solutions', 
    status: 'Active', 
    category: 'Pvt Limited', 
    contactPerson: 'gautamrao.l@Opsencia...', 
    email: 'infra@ucn121212.com', 
    phone: '+91 132 423 2534', 
    rating: 4.5,
    totalOrders: 45,
    lastOrder: '2025-08-01'
  },
  { 
    id: '351062074', 
    name: 'Supplier_4', 
    status: 'Draft', 
    category: 'Pvt Limited', 
    contactPerson: 'info@supplier4.com', 
    email: 'info@supplier4.com', 
    phone: '+91 99999 99998', 
    rating: 0,
    totalOrders: 0,
    lastOrder: null
  },
  { 
    id: '343552174', 
    name: 'Supplier_3', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'supplier3@example.com', 
    phone: '+971 50 123 4567', 
    rating: 4.2,
    totalOrders: 28,
    lastOrder: '2025-07-25'
  },
  { 
    id: '343552173', 
    name: 'Supplier_2', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'supplier2@example.com', 
    phone: '+971 50 234 5678', 
    rating: 4.6,
    totalOrders: 38,
    lastOrder: '2025-07-30'
  },
  { 
    id: '343552172', 
    name: 'Supplier_1', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'supplier1@example.com', 
    phone: '+971 50 345 6789', 
    rating: 4.8,
    totalOrders: 32,
    lastOrder: '2025-07-28'
  },
  { 
    id: '342107850', 
    name: 'Rozi International Group', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'rozi@example.com', 
    phone: '+971 50 456 7890', 
    rating: 4.4,
    totalOrders: 25,
    lastOrder: '2025-07-20'
  },
  { 
    id: '342107849', 
    name: 'Tamayuz Trading', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'tamayuz@example.com', 
    phone: '+971 50 567 8901', 
    rating: 4.7,
    totalOrders: 42,
    lastOrder: '2025-07-22'
  },
  { 
    id: '342107848', 
    name: 'Al Zahra Auto Spare Parts', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'alzahra@example.com', 
    phone: '+971 50 678 9012', 
    rating: 4.3,
    totalOrders: 19,
    lastOrder: '2025-07-15'
  },
  { 
    id: '342107847', 
    name: 'Mehul Nickel Alloys', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'mehul@example.com', 
    phone: '+971 50 789 0123', 
    rating: 4.5,
    totalOrders: 31,
    lastOrder: '2025-07-18'
  },
  { 
    id: '342107846', 
    name: 'Onpassive IT Consulting', 
    status: 'Active', 
    category: 'Individual', 
    contactPerson: 'Super Admin', 
    email: 'onpassive@example.com', 
    phone: '+971 50 890 1234', 
    rating: 4.6,
    totalOrders: 35,
    lastOrder: '2025-07-25'
  }
];

export const mockRequisitions = [
  { 
    id: 'REQ-001', 
    title: 'Office Equipment Purchase', 
    status: 'Draft', 
    priority: 'Medium', 
    requester: 'John Doe', 
    department: 'IT', 
    createdDate: '2025-08-05', 
    totalAmount: 2500,
    items: 3
  },
  { 
    id: 'REQ-002', 
    title: 'Software Licenses Renewal', 
    status: 'Pending Approval', 
    priority: 'High', 
    requester: 'Jane Smith', 
    department: 'Operations', 
    createdDate: '2025-08-04', 
    totalAmount: 15000,
    items: 5
  },
  { 
    id: 'REQ-003', 
    title: 'Hardware Upgrade', 
    status: 'Approved', 
    priority: 'High', 
    requester: 'Bob Johnson', 
    department: 'Engineering', 
    createdDate: '2025-08-03', 
    totalAmount: 45000,
    items: 12
  },
  { 
    id: 'REQ-004', 
    title: 'Office Supplies', 
    status: 'Draft', 
    priority: 'Low', 
    requester: 'Alice Brown', 
    department: 'Admin', 
    createdDate: '2025-08-02', 
    totalAmount: 800,
    items: 25
  },
  { 
    id: 'REQ-005', 
    title: 'Training Materials', 
    status: 'Pending Approval', 
    priority: 'Medium', 
    requester: 'Charlie Wilson', 
    department: 'HR', 
    createdDate: '2025-08-01', 
    totalAmount: 3200,
    items: 8
  }
];

export const mockPurchaseOrders = [
  { 
    id: 'PO-001', 
    requisitionId: 'REQ-003', 
    supplier: 'TechCorp Solutions', 
    status: 'Active', 
    orderDate: '2025-08-03', 
    expectedDelivery: '2025-08-15', 
    totalAmount: 45000,
    items: 12
  },
  { 
    id: 'PO-002', 
    requisitionId: 'REQ-002', 
    supplier: 'DataFlow Inc', 
    status: 'Draft', 
    orderDate: '2025-08-04', 
    expectedDelivery: '2025-08-20', 
    totalAmount: 15000,
    items: 5
  },
  { 
    id: 'PO-003', 
    requisitionId: 'REQ-005', 
    supplier: 'WebServ Technologies', 
    status: 'Draft', 
    orderDate: '2025-08-01', 
    expectedDelivery: '2025-08-25', 
    totalAmount: 3200,
    items: 8
  }
];

export const mockInvoices = [
  { 
    id: 'INV-001', 
    purchaseOrderId: 'PO-001', 
    supplier: 'TechCorp Solutions', 
    status: 'Pending Approval', 
    invoiceDate: '2025-08-10', 
    dueDate: '2025-09-10', 
    totalAmount: 45000,
    items: 12
  },
  { 
    id: 'INV-002', 
    purchaseOrderId: 'PO-002', 
    supplier: 'DataFlow Inc', 
    status: 'Approved', 
    invoiceDate: '2025-08-08', 
    dueDate: '2025-09-08', 
    totalAmount: 15000,
    items: 5
  }
];




export const mockCategories = [
  { 
    id: 'CAT-001', 
    name: 'IT Hardware', 
    description: 'Computer hardware and peripherals', 
    parentCategory: null, 
    totalProducts: 45,
    status: 'Active'
  },
  { 
    id: 'CAT-002', 
    name: 'Software', 
    description: 'Software licenses and applications', 
    parentCategory: null, 
    totalProducts: 23,
    status: 'Active'
  },
  { 
    id: 'CAT-003', 
    name: 'Office Supplies', 
    description: 'General office supplies and stationery', 
    parentCategory: null, 
    totalProducts: 67,
    status: 'Active'
  },
  { 
    id: 'CAT-004', 
    name: 'Laptops', 
    description: 'Portable computers and accessories', 
    parentCategory: 'CAT-001', 
    totalProducts: 15,
    status: 'Active'
  },
  { 
    id: 'CAT-005', 
    name: 'Servers', 
    description: 'Server hardware and components', 
    parentCategory: 'CAT-001', 
    totalProducts: 8,
    status: 'Active'
  }
];

export const mockProducts = [
  { 
    id: 'PROD-001', 
    name: 'Dell Latitude 5520', 
    category: 'Laptops', 
    supplier: 'TechCorp Solutions', 
    price: 1200, 
    currency: 'USD',
    stock: 25,
    status: 'Active'
  },
  { 
    id: 'PROD-002', 
    name: 'HP ProBook 450', 
    category: 'Laptops', 
    supplier: 'TechCorp Solutions', 
    price: 1100, 
    currency: 'USD',
    stock: 18,
    status: 'Active'
  },
  { 
    id: 'PROD-003', 
    name: 'Microsoft Office 365', 
    category: 'Software', 
    supplier: 'DataFlow Inc', 
    price: 150, 
    currency: 'USD',
    stock: 1000,
    status: 'Active'
  }
];

export const statusToBadge = (status) => {
  switch (status) {
    case 'Active': return 'bg-success-main';
    case 'Pending': return 'bg-warning-main';
    case 'Draft': return 'bg-info-main';
    case 'Approved': return 'bg-success-main';
    case 'Completed': return 'bg-neutral-400';
    case 'Upcoming': return 'bg-primary-600';
    default: return 'bg-neutral-400';
  }
};

export const priorityToBadge = (priority) => {
  switch (priority) {
    case 'High': return 'bg-danger-main';
    case 'Medium': return 'bg-warning-main';
    case 'Low': return 'bg-info-main';
    default: return 'bg-neutral-400';
  }
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const mockBudgets = [
  {
    id: 'BUD250006',
    name: 'Budget for',
    status: 'Pending Approval',
    owner: 'Proc_Officer',
    businessEntity: 'Opsencia',
    creationDate: '2025-07-21',
    startDate: '2025-07-21',
    endDate: '2026-07-21',
    totalAmount: 1000000,
    currency: 'USD',
    description: 'General budget allocation'
  },
  {
    id: 'BUD250004',
    name: 'Budget for 25',
    status: 'Approved',
    owner: 'Super Admin',
    businessEntity: 'Opsencia',
    creationDate: '2025-06-30',
    startDate: '2025-06-30',
    endDate: '2026-06-30',
    totalAmount: 2500000,
    currency: 'USD',
    description: 'Annual budget for 2025'
  },
  {
    id: 'BUD250003',
    name: 'IT',
    status: 'Draft',
    owner: 'Proc_Officer',
    businessEntity: 'Opsencia UAE',
    creationDate: '2025-06-24',
    startDate: '2025-06-24',
    endDate: '2026-06-24',
    totalAmount: 500000,
    currency: 'USD',
    description: 'IT infrastructure budget'
  },
  {
    id: 'BUD250002',
    name: 'IT Purchases',
    status: 'Draft',
    owner: 'Proc_Officer',
    businessEntity: 'Opsencia',
    creationDate: '2025-05-14',
    startDate: '2025-05-14',
    endDate: '2026-05-14',
    totalAmount: 750000,
    currency: 'USD',
    description: 'IT equipment and software purchases'
  },
  {
    id: 'BUD250001',
    name: 'NTPC',
    status: 'Draft',
    owner: 'Super Admin',
    businessEntity: 'Opsencia',
    creationDate: '2025-05-13',
    startDate: '2025-05-13',
    endDate: '2026-05-13',
    totalAmount: 2000000,
    currency: 'USD',
    description: 'NTPC project budget'
  },
  {
    id: '19',
    name: 'IT Software',
    status: 'Draft',
    owner: 'IT Manager',
    businessEntity: 'Opsencia',
    creationDate: '2025-02-13',
    startDate: '2025-02-13',
    endDate: '2025-05-14',
    totalAmount: 300000,
    currency: 'USD',
    description: 'Software licenses and subscriptions'
  },
  {
    id: '18',
    name: 'Office Equipment Budget',
    status: 'Approved',
    owner: 'Super Admin',
    businessEntity: 'Opsencia',
    creationDate: '2025-02-11',
    startDate: '2025-02-05',
    endDate: '2026-02-05',
    totalAmount: 150000,
    currency: 'USD',
    description: 'Office furniture and equipment'
  },
  {
    id: '16',
    name: 'IT Hardware',
    status: 'Approved',
    owner: 'Procurement Officer',
    businessEntity: 'Opsencia',
    creationDate: '2025-01-02',
    startDate: '2025-01-02',
    endDate: '2026-01-02',
    totalAmount: 800000,
    currency: 'USD',
    description: 'Hardware procurement budget'
  },
  {
    id: '15',
    name: 'IT Hardware Australia',
    status: 'Approved',
    owner: 'Proc Officer Aus',
    businessEntity: 'Opsencia Australia',
    creationDate: '2025-01-02',
    startDate: '2025-01-02',
    endDate: '2026-01-02',
    totalAmount: 600000,
    currency: 'AUD',
    description: 'Australia hardware budget'
  },
  {
    id: '14',
    name: 'IT UK',
    status: 'Approved',
    owner: 'Proc Officer UK',
    businessEntity: 'Opsencia UK',
    creationDate: '2025-01-02',
    startDate: '2025-01-02',
    endDate: '2026-01-02',
    totalAmount: 500000,
    currency: 'GBP',
    description: 'UK operations budget'
  }
];

export const mockBusinessEntities = [
  { id: 1, name: 'Opsencia', code: 'PROK' },
  { id: 2, name: 'Opsencia UAE', code: 'PROK-UAE' },
  { id: 3, name: 'Opsencia Australia', code: 'PROK-AUS' },
  { id: 4, name: 'Opsencia UK', code: 'PROK-UK' }
];

export const mockBudgetOwners = [
  { id: 1, name: 'Super Admin', email: 'admin@Opsencia.com' },
  { id: 2, name: 'Proc_Officer', email: 'proc@Opsencia.com' },
  { id: 3, name: 'IT Manager', email: 'it@Opsencia.com' },
  { id: 4, name: 'Procurement Officer', email: 'procurement@Opsencia.com' },
  { id: 5, name: 'Proc Officer Aus', email: 'proc.aus@Opsencia.com' },
  { id: 6, name: 'Proc Officer UK', email: 'proc.uk@Opsencia.com' }
];

export const budgetStatusToBadge = (status) => {
  switch (status) {
    case 'Approved': return 'bg-success-main';
    case 'Pending Approval': return 'bg-warning-main';
    case 'Draft': return 'bg-info-main';
    case 'Rejected': return 'bg-danger-main';
    default: return 'bg-neutral-400';
  }
};

export const mockCostCenters = [
  {
    id: 1,
    costCentre: 'IT Consulting Services',
    department: 'All',
    location: 'All',
    amount: 100000,
    currency: 'USD',
    budgetId: 'BUD250006'
  },
  {
    id: 2,
    costCentre: 'Hardware Procurement',
    department: 'IT',
    location: 'Head Office',
    amount: 250000,
    currency: 'USD',
    budgetId: 'BUD250004'
  },
  {
    id: 3,
    costCentre: 'Software Licenses',
    department: 'IT',
    location: 'All',
    amount: 150000,
    currency: 'USD',
    budgetId: 'BUD250004'
  }
];

export const mockApprovalHistory = [
  {
    id: 1,
    approver: 'Super Admin',
    status: 'Pending',
    date: '2025-07-21',
    comments: 'Budget submitted for approval',
    budgetId: 'BUD250006'
  },
  {
    id: 2,
    approver: 'Procurement Manager',
    status: 'Approved',
    date: '2025-06-30',
    comments: 'Budget approved for Q3',
    budgetId: 'BUD250004'
  },
  {
    id: 3,
    approver: 'Finance Director',
    status: 'Approved',
    date: '2025-06-30',
    comments: 'Final approval granted',
    budgetId: 'BUD250004'
  }
];
