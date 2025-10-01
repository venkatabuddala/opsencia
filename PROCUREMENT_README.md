# Procurement Section

This document describes the procurement section that has been added to the Opsencia application.

## Overview

The procurement section provides a comprehensive procurement management system with the following features:

- **Dashboard**: Overview of procurement metrics, pending approvals, tasks, and budgets
- **Suppliers**: Manage supplier relationships and information
- **Catalogue**: Product and service catalog management
- **Requisitions**: Purchase requisition creation and management
- **Auctions**: Tender and auction management
- **Purchase Orders**: Order creation and tracking
- **Invoices**: Invoice management, tracking, and payment processing
- **Budgets**: Budget tracking and management
- **Reports**: Procurement analytics and reporting

## Menu Structure

The procurement section has been added to the main navigation menu with the following structure:

```
Procurement
├── Dashboard
├── Suppliers
│   ├── All Suppliers
│   ├── Add Supplier
│   └── Pending Registrations
├── Catalogue
│   ├── Categories
│   ├── Products
│   └── Services
├── Requisitions
├── Auctions
│   ├── Active Auctions
│   ├── Upcoming
│   └── Completed
├── Purchase Orders
│   ├── Draft Orders
│   ├── Active Orders
│   └── Pending Delivery
├── Invoices
├── Budgets
└── Reports
```

## Components Created

### Pages
- `ProcurementDashboardPage.jsx` - Main procurement dashboard
- `ProcurementSuppliersListPage.jsx` - Suppliers list page
- `ProcurementRequisitionsListPage.jsx` - Purchase Requests list page
- `ProcurementRequisitionViewPage.jsx` - Purchase Requisition detail view page
- `ProcurementInvoicesListPage.jsx` - Invoices list page
- `ProcurementInvoiceViewPage.jsx` - Invoice detail view page
- `ProcurementNonPOInvoicePage.jsx` - Create NON-PO Invoice page

### Components
- `ProcurementDashboardLayer.jsx` - Dashboard widgets and metrics
- `ProcurementSuppliersListLayer.jsx` - Suppliers table with search and filters
- `ProcurementRequisitionsListLayer.jsx` - Purchase Requests table with search and filters
- `ProcurementCreateRequisitionModal.jsx` - Modal for creating purchase requisitions
- `ProcurementRequisitionViewLayer.jsx` - Detailed view of purchase requisition
- `ProcurementInvoicesListLayer.jsx` - Invoices table with search and filters
- `ProcurementInvoiceViewLayer.jsx` - Detailed view of invoice with payment processing
- `ProcurementNonPOInvoiceLayer.jsx` - NON-PO Invoice creation form
- `ProcurementAddInvoiceLinesModal.jsx` - Modal for adding invoice lines
- `ProcurementImportExcelModal.jsx` - Modal for importing invoice lines from Excel

### Data
- `procurementData.js` - Mock data for suppliers, requisitions, purchase orders, etc.

## Routes Added

The following routes have been added to the application:

- `/procurement` - Procurement dashboard
- `/procurement/suppliers/list` - Suppliers list
- `/procurement/requisitions/all` - Requisitions list
- `/procurement/invoices` - Invoices list page
- `/procurement/invoices/:id` - Invoice detail view page
- `/procurement/invoices/create-non-po` - Create NON-PO Invoice page

## Features

### Dashboard
- Key metrics (Total Users, Active Organizations, Supplier Users)
- Pending approval requests
- Tasks to do
- Recent activity
- My requests overview
- Available budgets with progress bars
- Recent comments

### Suppliers Management
- Supplier listing with search and filters
- Status management (Active, Pending, Inactive)
- Contact information
- Rating system
- Order history

### Requisitions Management
- Requisition listing with search and filters
- Status tracking (Draft, Pending Approval, Approved, Rejected)
- Priority levels (High, Medium, Low)
- Amount tracking
- Department categorization

## Styling

The procurement section uses:
- Modern card-based design
- Consistent color scheme with the existing application
- Responsive design for mobile devices
- Hover effects and transitions
- Icon integration using Iconify

## Future Enhancements

Potential future enhancements could include:
- Supplier registration forms
- Requisition creation wizards
- Purchase order generation
- Invoice processing workflows
- Budget approval workflows
- Advanced reporting and analytics
- Integration with external procurement systems

## Technical Notes

- All components follow the same structure as existing ITSM components
- Uses React hooks for state management
- Implements responsive design patterns
- Follows the existing component naming conventions
- Uses the same styling approach as other sections




