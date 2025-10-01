import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePageOne from "./pages/HomePageOne";
import ItsmDashboardPage from "./pages/ItsmDashboardPage";
import ItsmEventsOpenPage from "./pages/ItsmEventsOpenPage";
import ItsmEventsHistoryPage from "./pages/ItsmEventsHistoryPage";
import ItsmMyIncidentsPage from "./pages/ItsmMyIncidentsPage";
import ItsmAllIncidentsPage from "./pages/ItsmAllIncidentsPage";
import ItsmCreateIncidentPage from "./pages/ItsmCreateIncidentPage";
import ItsmReportsPage from "./pages/ItsmReportsPage";
import ItsmPartnersPage from "./pages/ItsmPartnersPage";
import ItsmClientsPage from "./pages/ItsmClientsPage";
import ItsmUsersPage from "./pages/ItsmUsersPage";
import ItsmCreatePartnerPage from "./pages/ItsmCreatePartnerPage";
import ItsmCreateClientPage from "./pages/ItsmCreateClientPage";
import ItsmCreateUserPage from "./pages/ItsmCreateUserPage";
import ItsmIncidentWorkbenchPage from "./pages/ItsmIncidentWorkbenchPage";
import ProcurementDashboardPage from "./pages/ProcurementDashboardPage";
import ProcurementSuppliersListPage from "./pages/ProcurementSuppliersListPage";
import ProcurementCatalogueManagePage from "./pages/ProcurementCatalogueManagePage";
import ProcurementCatalogueCategoriesPage from "./pages/ProcurementCatalogueCategoriesPage";
import ProcurementAuctionsPage from "./pages/ProcurementAuctionsPage";
import ProcurementAuctionViewPage from "./pages/ProcurementAuctionViewPage";
import ProcurementBidsPage from "./pages/ProcurementBidsPage";
import ProcurementBidViewPage from "./pages/ProcurementBidViewPage";
import ProcurementPurchaseOrdersPage from "./pages/ProcurementPurchaseOrdersPage";
import ProcurementRequisitionsListPage from "./pages/ProcurementRequisitionsListPage";
import ProcurementRequisitionViewPage from "./pages/ProcurementRequisitionViewPage";
import ProcurementInvoicesListPage from "./pages/ProcurementInvoicesListPage";
import ProcurementInvoiceViewPage from "./pages/ProcurementInvoiceViewPage";
import ProcurementNonPOInvoicePage from "./pages/ProcurementNonPOInvoicePage";
import ProcurementBudgetsListPage from "./pages/ProcurementBudgetsListPage";
import ProcurementBudgetPreviewPage from "./pages/ProcurementBudgetPreviewPage";

import HomePageTwo from "./pages/HomePageTwo";
import HomePageThree from "./pages/HomePageThree";
import HomePageFour from "./pages/HomePageFour";
import HomePageFive from "./pages/HomePageFive";
import HomePageSix from "./pages/HomePageSix";
import HomePageSeven from "./pages/HomePageSeven";
import EmailPage from "./pages/EmailPage";
import AddUserPage from "./pages/AddUserPage";
import AlertPage from "./pages/AlertPage";
import AssignRolePage from "./pages/AssignRolePage";
import AvatarPage from "./pages/AvatarPage";
import BadgesPage from "./pages/BadgesPage";
import ButtonPage from "./pages/ButtonPage";
import CalendarMainPage from "./pages/CalendarMainPage";
import CardPage from "./pages/CardPage";
import CarouselPage from "./pages/CarouselPage";
import ChatMessagePage from "./pages/ChatMessagePage";
import ChatProfilePage from "./pages/ChatProfilePage";
import CodeGeneratorNewPage from "./pages/CodeGeneratorNewPage";
import CodeGeneratorPage from "./pages/CodeGeneratorPage";
import ColorsPage from "./pages/ColorsPage";
import ColumnChartPage from "./pages/ColumnChartPage";
import CompanyPage from "./pages/CompanyPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import DropdownPage from "./pages/DropdownPage";
import ErrorPage from "./pages/ErrorPage";
import FaqPage from "./pages/FaqPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FormLayoutPage from "./pages/FormLayoutPage";
import FormValidationPage from "./pages/FormValidationPage";
import FormPage from "./pages/FormPage";
import GalleryPage from "./pages/GalleryPage";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import InvoiceAddPage from "./pages/InvoiceAddPage";
import InvoiceEditPage from "./pages/InvoiceEditPage";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoicePreviewPage from "./pages/InvoicePreviewPage";
import KanbanPage from "./pages/KanbanPage";
import LanguagePage from "./pages/LanguagePage";
import LineChartPage from "./pages/LineChartPage";
import ListPage from "./pages/ListPage";
import MarketplaceDetailsPage from "./pages/MarketplaceDetailsPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotificationAlertPage from "./pages/NotificationAlertPage";
import NotificationPage from "./pages/NotificationPage";
import PaginationPage from "./pages/PaginationPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import PieChartPage from "./pages/PieChartPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import ProgressPage from "./pages/ProgressPage";
import RadioPage from "./pages/RadioPage";
import RoleAccessPage from "./pages/RoleAccessPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StarRatingPage from "./pages/StarRatingPage";
import StarredPage from "./pages/StarredPage";
import SwitchPage from "./pages/SwitchPage";
import TableBasicPage from "./pages/TableBasicPage";
import TableDataPage from "./pages/TableDataPage";
import TabsPage from "./pages/TabsPage";
import TagsPage from "./pages/TagsPage";
import TermsConditionPage from "./pages/TermsConditionPage";
import TextGeneratorPage from "./pages/TextGeneratorPage";
import ThemePage from "./pages/ThemePage";
import TooltipPage from "./pages/TooltipPage";
import TypographyPage from "./pages/TypographyPage";
import UsersGridPage from "./pages/UsersGridPage";
import UsersListPage from "./pages/UsersListPage";
import ViewDetailsPage from "./pages/ViewDetailsPage";
import VideoGeneratorPage from "./pages/VideoGeneratorPage";
import VideosPage from "./pages/VideosPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import VoiceGeneratorPage from "./pages/VoiceGeneratorPage";
import WalletPage from "./pages/WalletPage";
import WidgetsPage from "./pages/WidgetsPage";
import WizardPage from "./pages/WizardPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import TextGeneratorNewPage from "./pages/TextGeneratorNewPage";
import HomePageEight from "./pages/HomePageEight";
import HomePageNine from "./pages/HomePageNine";
import HomePageTen from "./pages/HomePageTen";
import HomePageEleven from "./pages/HomePageEleven";
import GalleryGridPage from "./pages/GalleryGridPage";
import GalleryMasonryPage from "./pages/GalleryMasonryPage";
import GalleryHoverPage from "./pages/GalleryHoverPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import AddBlogPage from "./pages/AddBlogPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import MaintenancePage from "./pages/MaintenancePage";
import BlankPagePage from "./pages/BlankPagePage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route exact path='/' element={<SignInPage />} />
        <Route exact path='/dashboard' element={<HomePageOne />} />
        <Route exact path='/itsm' element={<ItsmDashboardPage />} />
        <Route exact path='/itsm/events/open' element={<ItsmEventsOpenPage />} />
        <Route exact path='/itsm/events/history' element={<ItsmEventsHistoryPage />} />
        <Route exact path='/itsm/incidents/my' element={<ItsmMyIncidentsPage />} />
        <Route exact path='/itsm/incidents/all' element={<ItsmAllIncidentsPage />} />
        <Route exact path='/itsm/incidents/create' element={<ItsmCreateIncidentPage />} />
        <Route exact path='/itsm/reports' element={<ItsmReportsPage />} />
        <Route exact path='/itsm/partners' element={<ItsmPartnersPage />} />
        <Route exact path='/itsm/partners/create' element={<ItsmCreatePartnerPage />} />
        <Route exact path='/itsm/clients' element={<ItsmClientsPage />} />
        <Route exact path='/itsm/clients/create' element={<ItsmCreateClientPage />} />
        <Route exact path='/itsm/users' element={<ItsmUsersPage />} />
        <Route exact path='/itsm/users/create' element={<ItsmCreateUserPage />} />
        <Route exact path='/itsm/incidents/:id/workbench' element={<ItsmIncidentWorkbenchPage />} />

                          <Route exact path='/procurement' element={<ProcurementDashboardPage />} />
                  <Route exact path='/procurement/suppliers/list' element={<ProcurementSuppliersListPage />} />
                  <Route exact path='/procurement/catalogue/manage' element={<ProcurementCatalogueManagePage />} />
                  <Route exact path='/procurement/catalogue/categories' element={<ProcurementCatalogueCategoriesPage />} />
                  <Route exact path='/procurement/auctions' element={<ProcurementAuctionsPage />} />
                  <Route exact path='/procurement/auctions/view' element={<ProcurementAuctionViewPage />} />
                  <Route exact path='/procurement/bids' element={<ProcurementBidsPage />} />
                  <Route exact path='/procurement/bids/view' element={<ProcurementBidViewPage />} />
                  <Route exact path='/procurement/purchase-orders' element={<ProcurementPurchaseOrdersPage />} />
                  <Route exact path='/procurement/requisitions' element={<ProcurementRequisitionsListPage />} />
                  <Route exact path='/procurement/requisitions/:id' element={<ProcurementRequisitionViewPage />} />
                  <Route exact path='/procurement/invoices' element={<ProcurementInvoicesListPage />} />
                  <Route exact path='/procurement/invoices/:id' element={<ProcurementInvoiceViewPage />} />
                  <Route exact path='/procurement/invoices/create-non-po' element={<ProcurementNonPOInvoicePage />} />
                  <Route exact path='/procurement/budgets' element={<ProcurementBudgetsListPage />} />
                  <Route exact path='/procurement/budgets/:id/preview' element={<ProcurementBudgetPreviewPage />} />


        <Route exact path='/index-2' element={<HomePageTwo />} />
        <Route exact path='/index-3' element={<HomePageThree />} />
        <Route exact path='/index-4' element={<HomePageFour />} />
        <Route exact path='/index-5' element={<HomePageFive />} />
        <Route exact path='/index-6' element={<HomePageSix />} />
        <Route exact path='/index-7' element={<HomePageSeven />} />
        <Route exact path='/index-8' element={<HomePageEight />} />
        <Route exact path='/index-9' element={<HomePageNine />} />
        <Route exact path='/index-10' element={<HomePageTen />} />
        <Route exact path='/index-11' element={<HomePageEleven />} />

        {/* SL */}
        <Route exact path='/add-user' element={<AddUserPage />} />
        <Route exact path='/alert' element={<AlertPage />} />
        <Route exact path='/assign-role' element={<AssignRolePage />} />
        <Route exact path='/avatar' element={<AvatarPage />} />
        <Route exact path='/badges' element={<BadgesPage />} />
        <Route exact path='/button' element={<ButtonPage />} />
        <Route exact path='/calendar-main' element={<CalendarMainPage />} />
        <Route exact path='/calendar' element={<CalendarMainPage />} />
        <Route exact path='/card' element={<CardPage />} />
        <Route exact path='/carousel' element={<CarouselPage />} />

        <Route exact path='/chat-message' element={<ChatMessagePage />} />
        <Route exact path='/chat-profile' element={<ChatProfilePage />} />
        <Route exact path='/code-generator' element={<CodeGeneratorPage />} />
        <Route
          exact
          path='/code-generator-new'
          element={<CodeGeneratorNewPage />}
        />
        <Route exact path='/colors' element={<ColorsPage />} />
        <Route exact path='/column-chart' element={<ColumnChartPage />} />
        <Route exact path='/company' element={<CompanyPage />} />
        <Route exact path='/currencies' element={<CurrenciesPage />} />
        <Route exact path='/dropdown' element={<DropdownPage />} />
        <Route exact path='/email' element={<EmailPage />} />
        <Route exact path='/faq' element={<FaqPage />} />
        <Route exact path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route exact path='/form-layout' element={<FormLayoutPage />} />
        <Route exact path='/form-validation' element={<FormValidationPage />} />
        <Route exact path='/form' element={<FormPage />} />

        <Route exact path='/gallery' element={<GalleryPage />} />
        <Route exact path='/gallery-grid' element={<GalleryGridPage />} />
        <Route exact path='/gallery-masonry' element={<GalleryMasonryPage />} />
        <Route exact path='/gallery-hover' element={<GalleryHoverPage />} />

        <Route exact path='/blog' element={<BlogPage />} />
        <Route exact path='/blog-details' element={<BlogDetailsPage />} />
        <Route exact path='/add-blog' element={<AddBlogPage />} />

        <Route exact path='/testimonials' element={<TestimonialsPage />} />
        <Route exact path='/coming-soon' element={<ComingSoonPage />} />
        <Route exact path='/access-denied' element={<AccessDeniedPage />} />
        <Route exact path='/maintenance' element={<MaintenancePage />} />
        <Route exact path='/blank-page' element={<BlankPagePage />} />

        <Route exact path='/image-generator' element={<ImageGeneratorPage />} />
        <Route exact path='/image-upload' element={<ImageUploadPage />} />
        <Route exact path='/invoice-add' element={<InvoiceAddPage />} />
        <Route exact path='/invoice-edit' element={<InvoiceEditPage />} />
        <Route exact path='/invoice-list' element={<InvoiceListPage />} />
        <Route exact path='/invoice-preview' element={<InvoicePreviewPage />} />
        <Route exact path='/kanban' element={<KanbanPage />} />
        <Route exact path='/language' element={<LanguagePage />} />
        <Route exact path='/line-chart' element={<LineChartPage />} />
        <Route exact path='/list' element={<ListPage />} />
        <Route
          exact
          path='/marketplace-details'
          element={<MarketplaceDetailsPage />}
        />
        <Route exact path='/marketplace' element={<MarketplacePage />} />
        <Route
          exact
          path='/notification-alert'
          element={<NotificationAlertPage />}
        />
        <Route exact path='/notification' element={<NotificationPage />} />
        <Route exact path='/pagination' element={<PaginationPage />} />
        <Route exact path='/payment-gateway' element={<PaymentGatewayPage />} />
        <Route exact path='/pie-chart' element={<PieChartPage />} />
        <Route exact path='/portfolio' element={<PortfolioPage />} />
        <Route exact path='/pricing' element={<PricingPage />} />
        <Route exact path='/progress' element={<ProgressPage />} />
        <Route exact path='/radio' element={<RadioPage />} />
        <Route exact path='/role-access' element={<RoleAccessPage />} />
        <Route exact path='/sign-in' element={<SignInPage />} />
        <Route exact path='/sign-up' element={<SignUpPage />} />
        <Route exact path='/star-rating' element={<StarRatingPage />} />
        <Route exact path='/starred' element={<StarredPage />} />
        <Route exact path='/switch' element={<SwitchPage />} />
        <Route exact path='/table-basic' element={<TableBasicPage />} />
        <Route exact path='/table-data' element={<TableDataPage />} />
        <Route exact path='/tabs' element={<TabsPage />} />
        <Route exact path='/tags' element={<TagsPage />} />
        <Route exact path='/terms-condition' element={<TermsConditionPage />} />
        <Route
          exact
          path='/text-generator-new'
          element={<TextGeneratorNewPage />}
        />
        <Route exact path='/text-generator' element={<TextGeneratorPage />} />
        <Route exact path='/theme' element={<ThemePage />} />
        <Route exact path='/tooltip' element={<TooltipPage />} />
        <Route exact path='/typography' element={<TypographyPage />} />
        <Route exact path='/users-grid' element={<UsersGridPage />} />
        <Route exact path='/users-list' element={<UsersListPage />} />
        <Route exact path='/view-details' element={<ViewDetailsPage />} />
        <Route exact path='/video-generator' element={<VideoGeneratorPage />} />
        <Route exact path='/videos' element={<VideosPage />} />
        <Route exact path='/view-profile' element={<ViewProfilePage />} />
        <Route exact path='/voice-generator' element={<VoiceGeneratorPage />} />
        <Route exact path='/wallet' element={<WalletPage />} />
        <Route exact path='/widgets' element={<WidgetsPage />} />
        <Route exact path='/wizard' element={<WizardPage />} />

        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
