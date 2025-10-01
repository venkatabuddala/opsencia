import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementInvoiceViewLayer from "../components/ProcurementInvoiceViewLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementInvoiceViewPage = () => {
  usePageTitle('Procurement - Invoice Preview');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Invoice Preview' />
        <ProcurementInvoiceViewLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementInvoiceViewPage;


