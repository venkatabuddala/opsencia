import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ProcurementInvoicesListLayer from "../components/ProcurementInvoicesListLayer";
import usePageTitle from "../hooks/usePageTitle";

const ProcurementInvoicesListPage = () => {
  usePageTitle('Procurement - Invoices');
  return (
    <>
      <MasterLayout>
        <Breadcrumb title='Procurement' subtitle='Invoices' />
        <ProcurementInvoicesListLayer />
      </MasterLayout>
    </>
  );
};

export default ProcurementInvoicesListPage;


