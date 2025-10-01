import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementNonPOInvoiceLayer from "../components/ProcurementNonPOInvoiceLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementNonPOInvoicePage = () => {
  usePageTitle('Procurement - Create NON-PO Invoice');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Create NON-PO Invoice' />
        <ProcurementNonPOInvoiceLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementNonPOInvoicePage;


